import { Component, OnInit } from '@angular/core';
import { NumerosDiariaService } from 'src/app/servicios/numeros-diaria.service';
import { CarritoDeComprasService } from 'src/app/servicios/carrito-de-compras.service';
import { NumeroDiaria } from 'src/app/clases/numero-diaria';
import { FormControl } from '@angular/forms';
import { ItemCarrito } from 'src/app/clases/item-carrito';

declare var $: any;

@Component({
  selector: 'app-diaria-lista-de-numeros',
  templateUrl: './diaria-lista-de-numeros.component.html',
  styleUrls: ['./diaria-lista-de-numeros.component.css']
})
export class DiariaListaDeNumerosComponent implements OnInit {

  constructor(
    private servicioNumeroDiaria: NumerosDiariaService,
    public servicioCarritoDeCompras: CarritoDeComprasService
  ) { }

  ngOnInit() {
    this.obtenerNumerosDiaria();
    // this.servicioNumeroDiaria.generarNumeros();
    
  }


  numeroDiaria: NumeroDiaria[];

  numerosBuscados: NumeroDiaria[];

  datosListos: boolean = false;

  busqueda = new FormControl('');
  txtCantidadAComprar = new FormControl('1');
  txtCantidadAGanar = new FormControl('80');

  //datos al azar para evitar un error mientras descarga los datos
  numeroSeleccionado: NumeroDiaria = {
    habilitado: true,
    numero: '01',
    uid: ''
  };

  onKeyUpBuscarNumero() {
    if (this.busqueda.value == null) {
      this.numerosBuscados = this.numeroDiaria;
      return;
    }
    this.numerosBuscados = this.numeroDiaria.filter(s => s.numero.includes(this.busqueda.value));
  }

  onKeyUpCalcularPremio(){

    let cantidadAComprar = this.txtCantidadAComprar.value;

    if(cantidadAComprar > 100){
      this.txtCantidadAComprar.setValue(100);
    }

    var premio = this.txtCantidadAComprar.value * 80;
    this.txtCantidadAGanar.setValue(premio);
  }


  async obtenerNumerosDiaria(){
   let suscripcion = await this.servicioNumeroDiaria.obtenerNumeros().subscribe(data => {
      // console.log(data);
      this.numeroDiaria = [];
        data.forEach(element => {
          let x = element.payload.doc.data();
          x["uid"] = element.payload.doc.id;
          this.numeroDiaria.push(x as NumeroDiaria);
        });
      // console.log(this.numeroDiaria);
      this.numerosBuscados = this.numeroDiaria;
      this.datosListos = true;
      //se utiliza unsubscribe para que no se actualicen los datos automaticamente
      suscripcion.unsubscribe();
    });

  }

  detalleVentaDelNumero(numero: NumeroDiaria){
    $('#btnAgregarAlCarrito').prop('disabled', false);
    // console.log(numero);
    this.numeroSeleccionado = numero;
    $('#modalDetalleNumero').modal('show');
  }

  agregarAlCarrito(){
    $('#btnAgregarAlCarrito').prop('disabled', true);
    let itemCarrito: ItemCarrito = {
      uid: '',
      loteria: 'Diaria',
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
