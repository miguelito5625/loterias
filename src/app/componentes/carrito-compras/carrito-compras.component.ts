import { Component, OnInit } from '@angular/core';

// declare var $: any;

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(localStorage.getItem('correo'));

  }

}
