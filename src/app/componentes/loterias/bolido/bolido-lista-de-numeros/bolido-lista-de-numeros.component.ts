import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NumerosBolidoService } from 'src/app/servicios/numeros-bolido.service';
import { NumeroBolido } from 'src/app/clases/numero-bolido';
import { CarritoDeComprasService } from 'src/app/servicios/carrito-de-compras.service';
import { ItemCarrito } from 'src/app/clases/item-carrito';

declare var $: any;

@Component({
  selector: 'app-bolido-lista-de-numeros',
  templateUrl: './bolido-lista-de-numeros.component.html',
  styleUrls: ['./bolido-lista-de-numeros.component.css']
})
export class BolidoListaDeNumerosComponent implements OnInit {

  constructor(
    private servicioNumeroBolido: NumerosBolidoService,
    private servicioCarritoDeCompras: CarritoDeComprasService
  ) { }

  ngOnInit() {
    this.obtenerNumerosBolido();
    // this.servicioNumeroBolido.generarNumeros();
    
  }


  numerosBolido: NumeroBolido[];

  numerosBuscados: NumeroBolido[];

  datosListos: boolean = false;

  busqueda = new FormControl('');
  txtCantidadAComprar = new FormControl('1');
  txtCantidadAGanar = new FormControl('80');

  //datos al azar para evitar un error mientras descarga los datos
  numeroSeleccionado: NumeroBolido = {
    habilitado: true,
    numero: '01',
    uid: 's5632665635'
  };

  onKeyUpBuscarNumero() {
    if (this.busqueda.value == null) {
      this.numerosBuscados = this.numerosBolido;
      return;
    }
    this.numerosBuscados = this.numerosBolido.filter(s => s.numero.includes(this.busqueda.value));
  }

  onKeyUpCalcularPremio(){

    let cantidadAComprar = this.txtCantidadAComprar.value;

    if(cantidadAComprar > 100){
      this.txtCantidadAComprar.setValue(100);
    }

    var premio = this.txtCantidadAComprar.value * 80;
    this.txtCantidadAGanar.setValue(premio);
  }


  async obtenerNumerosBolido(){
   let suscripcion = await this.servicioNumeroBolido.obtenerNumeros().subscribe(data => {
      // console.log(data);
      this.numerosBolido = [];
        data.forEach(element => {
          let x = element.payload.doc.data();
          x["uid"] = element.payload.doc.id;
          this.numerosBolido.push(x as NumeroBolido);
        });
      // console.log(this.numerosBolido);
      this.numerosBuscados = this.numerosBolido;
      this.datosListos = true;
      //se utiliza unsubscribe para que no se actualicen los datos automaticamente
      suscripcion.unsubscribe();
    });

  }

  detalleVentaDelNumero(numero: NumeroBolido){
    $('#btnAgregarAlCarrito').prop('disabled', false);
    // console.log(numero);
    this.numeroSeleccionado = numero;
    $('#modalDetalleNumero').modal('show');
  }

  agregarAlCarrito(){
    $('#btnAgregarAlCarrito').prop('disabled', true);
    let itemCarrito: ItemCarrito = {
      uid: '',
      loteria: 'Bolido',
      numero: this.numeroSeleccionado.numero,
      cantidadComprado: this.txtCantidadAComprar.value,
      premio: this.txtCantidadAGanar.value
    }

    this.servicioCarritoDeCompras.agregarAlCarrito(itemCarrito);
    $('#modalDetalleNumero').modal('hide');

    this.txtCantidadAComprar.setValue('1');
    this.txtCantidadAGanar.setValue('80');
    

  }


}
