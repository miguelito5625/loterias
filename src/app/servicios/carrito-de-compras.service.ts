import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ItemCarrito } from '../clases/item-carrito';
import { BehaviorSubject } from 'rxjs';
import { NodeSnackbarService } from './node-snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoDeComprasService {

  constructor(
    public afs: AngularFirestore,
    private servicioSnackBar: NodeSnackbarService
  ) { }

  itemsEnElCarrito: ItemCarrito[] = [
    {
      uid: '',
      loteria: 'Bolido',
      numero: '21',
      cantidadComprado: '1',
      premio: '80'
    }
  ];

  totalAPagar: number = 1.00;

  async agregarAlCarrito(item: ItemCarrito) {

    var estaEnElCarrito = false;
    var posicion = 0;

    //Encontrar si el item ya esta en el carrito
    await this.itemsEnElCarrito.forEach((numero, index) => {
      if (numero.numero == item.numero && numero.loteria == item.loteria) {
        console.log('encontrado un item igual en la posicion', index);
        estaEnElCarrito = true;
        posicion = index;
      }
    });

    if (estaEnElCarrito == false) {
      this.itemsEnElCarrito.push(item);
      this.totalAPagar = this.totalAPagar + Number(item.cantidadComprado);
      console.log('guardado');
      this.servicioSnackBar.mostrarSnackBarArriba('Numero agregado Correctamente');
    } else {
      this.totalAPagar = this.totalAPagar - Number(this.itemsEnElCarrito[posicion].cantidadComprado);
      this.totalAPagar = this.totalAPagar + Number(item.cantidadComprado);

      this.itemsEnElCarrito[posicion].numero = item.numero;
      this.itemsEnElCarrito[posicion].cantidadComprado = item.cantidadComprado;
      this.itemsEnElCarrito[posicion].premio = item.premio;
      this.servicioSnackBar.mostrarSnackBarArriba('Ya esta en el carrito, datos actualizados');
    }

  }

  obtenerItemsDelCarrito() {
    return this.itemsEnElCarrito;
  }

  actualizarItemCarrito(posicion: number, cantidadComprado: string, premio: string) {
    this.totalAPagar = this.totalAPagar - Number(this.itemsEnElCarrito[posicion].cantidadComprado);
    this.totalAPagar = this.totalAPagar + Number(cantidadComprado);
    this.itemsEnElCarrito[posicion].cantidadComprado = cantidadComprado;
    this.itemsEnElCarrito[posicion].premio = premio;
    this.servicioSnackBar.mostrarSnackBarArriba('Datos actualizados');
  }

  eliminarItemCarrito(posicion: number) {
    this.totalAPagar = this.totalAPagar - Number(this.itemsEnElCarrito[posicion].cantidadComprado);
    this.itemsEnElCarrito.splice(posicion, 1);
    this.servicioSnackBar.mostrarSnackBarArriba('Numero eliminado');
  }



}
