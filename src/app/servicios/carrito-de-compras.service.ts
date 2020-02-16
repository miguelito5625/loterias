import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ItemCarrito } from '../clases/item-carrito';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoDeComprasService {

  constructor(
    public afs: AngularFirestore
  ) { }

  private origenTotal = new BehaviorSubject<number>(0);
  obtenerTotalItems = this.origenTotal.asObservable();


  actualizarTotalItems() {
    this.origenTotal.next(this.itemsEnElCarrito.length)
  }

  itemsEnElCarrito: ItemCarrito[] = [];


  agregarAlCarrito(item: ItemCarrito) {
    this.itemsEnElCarrito.push(item);
    this.actualizarTotalItems();
  }

  obtenerItemsDelCarrito(){
    return this.itemsEnElCarrito;
  }



}
