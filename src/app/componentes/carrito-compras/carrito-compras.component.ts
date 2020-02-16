import { Component, OnInit } from '@angular/core';
import { CarritoDeComprasService } from 'src/app/servicios/carrito-de-compras.service';
import { ItemCarrito } from 'src/app/clases/item-carrito';

// declare var $: any;

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  itemsDelCarrito: ItemCarrito[];

  constructor(
    private servicioCarritoDeCompras: CarritoDeComprasService
  ) { }

  ngOnInit() {
    // console.log(localStorage.getItem('correo'));
    this.itemsDelCarrito = this.servicioCarritoDeCompras.obtenerItemsDelCarrito();
    console.log(this.itemsDelCarrito);
    
  }

}
