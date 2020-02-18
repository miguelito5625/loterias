import { Component, OnInit } from '@angular/core';
import { CarritoDeComprasService } from 'src/app/servicios/carrito-de-compras.service';
import { ItemCarrito } from 'src/app/clases/item-carrito';
import { FormControl } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  // itemsDelCarrito: ItemCarrito[];

  //datos al azar para evitar un error mientras descarga los datos
  numeroSeleccionado: ItemCarrito = {
    numero: '01',
    uid: 's5632665635',
    cantidadComprado: '1',
    loteria: 'Bolido',
    premio: '80'
  };

  txtCantidadAComprar = new FormControl('1');
  txtCantidadAGanar = new FormControl('80');
  txtLoteria = new FormControl('');

  constructor(
    private servicioCarritoDeCompras: CarritoDeComprasService
  ) { }

  ngOnInit() {
    // console.log(localStorage.getItem('correo'));
    // this.itemsDelCarrito = this.servicioCarritoDeCompras.obtenerItemsDelCarrito();
    // console.log(this.itemsDelCarrito);
    
  }

  detalleItemDelCarrito(item: ItemCarrito){
    console.log(item);
    this.numeroSeleccionado = item;
    this.txtCantidadAComprar.setValue(item.cantidadComprado);
    this.txtCantidadAGanar.setValue(item.premio);
    this.txtLoteria.setValue(item.loteria);
    $('#modalDetalleNumero').modal('show');
  }

  onKeyUpCalcularPremio(){
    let cantidadAComprar = this.txtCantidadAComprar.value;
    if(cantidadAComprar > 100){
      this.txtCantidadAComprar.setValue(100);
    }
    var premio = this.txtCantidadAComprar.value * 80;
    this.txtCantidadAGanar.setValue(premio);
  }

  actualizarCarrito(){

    let pos = this.servicioCarritoDeCompras.itemsEnElCarrito.map(function(e) { return e; }).indexOf(this.numeroSeleccionado);
    // console.log(pos);

    this.servicioCarritoDeCompras.actualizarItemCarrito(pos, this.txtCantidadAComprar.value, this.txtCantidadAGanar.value);
    
    $('#modalDetalleNumero').modal('hide');
  }


  eliminarItemCarrito(item: ItemCarrito){
    let pos = this.servicioCarritoDeCompras.itemsEnElCarrito.map(function(e) { return e; }).indexOf(item);
    this.servicioCarritoDeCompras.eliminarItemCarrito(pos);
  }


}
