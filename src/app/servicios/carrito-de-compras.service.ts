import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ItemCarrito } from '../clases/item-carrito';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { NodeSnackbarService } from './node-snackbar.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PagoStripe } from '../clases/pago-stripe';
import { catchError, retry } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CarritoDeComprasService {

  constructor(
    public afs: AngularFirestore,
    private servicioSnackBar: NodeSnackbarService,
    private http: HttpClient
  ) { }

  itemsEnElCarrito: ItemCarrito[] = [
    {
      uid: '',
      loteria: 'Bolido',
      numero: '21',
      cantidadComprado: '10',
      premio: '80'
    },
    {
      uid: '',
      loteria: 'Bolido',
      numero: '05',
      cantidadComprado: '10',
      premio: '80'
    }
  ];

  totalAPagar: number = 20.00;

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
  
  // baseUrl = 'http://localhost:3000';
  baseUrl = 'https://us-central1-plasma-climber-239922.cloudfunctions.net/app';


  pagoConStripe(pagoStripe): Observable<PagoStripe>{
    return this.http.post<PagoStripe>(this.baseUrl + '/realizarpago', pagoStripe)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

 // Error handling
 errorHandl(error) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}


}
