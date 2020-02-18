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

  async agregarAlCarrito(item: ItemCarrito) {

    var estaEnElCarrito = false;
    var posicion = 0;

    await this.itemsEnElCarrito.forEach((numero, index) => {
      if (numero.numero == item.numero) {
        console.log('igual', index);
        estaEnElCarrito = true;
        posicion = index;
      }
    });

    if (estaEnElCarrito == false) {
      this.itemsEnElCarrito.push(item);
      console.log('guardado');
      this.servicioSnackBar.mostrarSnackBarArriba('Numero agregado Correctamente');
    }else{
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
    this.itemsEnElCarrito[posicion].cantidadComprado = cantidadComprado;
    this.itemsEnElCarrito[posicion].premio = premio;
    this.servicioSnackBar.mostrarSnackBarArriba('Datos actualizados');
  }

  eliminarItemCarrito(posicion: number) {
    this.itemsEnElCarrito.splice(posicion, 1);
    this.servicioSnackBar.mostrarSnackBarArriba('Numero eliminado');
  }



}
