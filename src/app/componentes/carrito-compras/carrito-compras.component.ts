import { Component, OnInit, NgZone } from '@angular/core';
import { CarritoDeComprasService } from 'src/app/servicios/carrito-de-compras.service';
import { ItemCarrito } from 'src/app/clases/item-carrito';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { JqueryConfirmService } from 'src/app/servicios/jquery-confirm.service';


declare var $: any;

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {


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
    public servicioCarritoDeCompras: CarritoDeComprasService,
    private fb: FormBuilder,
    private _ngZone: NgZone,
    private jqueryConfirm: JqueryConfirmService
  ) { }

  ngOnInit() {
    
    this.formatoTarjeta();

  }

  convertirACentavos(value) {
    value = (value + '').replace(/[^\d.-]/g, '');
    if (value && value.includes('.')) {
      value = value.substring(0, value.indexOf('.') + 3);
    }

    return value ? Math.round(parseFloat(value) * 100) : 0;
  }

  realizandoPago: boolean = false;

  cardNameClient = new FormControl('Miguel Archila');
  cardNumber = new FormControl('4242 4242 4242 4242');
  expiryMonth = new FormControl('02');
  expiryYear = new FormControl('22');
  cvc = new FormControl('569');

  abrirModalPago() {
    // console.log(this.servicioCarritoDeCompras.totalAPagar);

    if (Number(this.servicioCarritoDeCompras.totalAPagar) < Number(10.00)) {
      console.log('menor');

      this.jqueryConfirm.mensajeDeError('Debe gastar un minimo de Q10');
      return;
    }
    $('#modalRealizarPago').modal({
      show: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  getToken() {
    // this.message = 'Loading...';

    this.realizandoPago = true;
    $('#btnPagar').attr("disabled", true);
    $('#btnCancelarPago').attr("disabled", true);

    // return;
    (<any>window).Stripe.card.createToken({
      number: this.cardNumber.value,
      exp_month: this.expiryMonth.value,
      exp_year: this.expiryYear.value,
      cvc: this.cvc.value,
      name: this.cardNameClient.value
    }, (status: number, response: any) => {
      if (status === 200) {

        // this.message = `Success! Card token ${response.card.id}.`;
        console.log('exito');

        // console.log(response.card);
        console.log(response);

        this.servicioCarritoDeCompras.pagoConStripe({
          stripeName: this.cardNameClient.value,
          stripeToken: response.id,
          monto: this.convertirACentavos(this.servicioCarritoDeCompras.totalAPagar),
          moneda: 'GTQ',
          descripcion: 'compra de numeros'
        }).subscribe(
          res => {
            console.log(res);
            $('#btnPagar').attr("disabled", false);
            $('#btnCancelarPago').attr("disabled", false);
            $('#modalRealizarPago').modal('hide');
            this.jqueryConfirm.mensajeDeExito('Pago realizado Correctamente');
            //Metodo para cambiar valor de variable cuando no funciona el metodo convencional
            this._ngZone.run(() => {
              this.realizandoPago = false;
            });
          },
          err => {
            console.log('Error al realizar el pago');
            this._ngZone.run(() => {
              this.realizandoPago = false;
            });
            $('#btnPagar').attr("disabled", false);
            $('#btnCancelarPago').attr("disabled", false);
            $('#modalRealizarPago').modal('hide');
            this.jqueryConfirm.mensajeDeError('Error al realizar e pago');
          }
        );

      } else {
        // this.message = response.error.message;

        //Metodo para cambiar valor de variable cuando no funciona el metodo convencional
        this._ngZone.run(() => {
          this.realizandoPago = false;
        });
        $('#btnPagar').attr("disabled", false);
        $('#btnCancelarPago').attr("disabled", false);
        console.log('error al obtener el token de pago');
        console.log(response.error.message);
        $('#modalRealizarPago').modal('hide');
        this.jqueryConfirm.mensajeDeError('Error al realizar e pago');

      }
    });
  }


  //Metodo para para formatear numeros de la tarjeta
  formatoTarjeta() {
    $("#idTxtNumeroTarjeta").on("keydown", function (e) {
      var cursor = this.selectionStart;
      if (this.selectionEnd != cursor) return;
      if (e.which == 46) {
        if (this.value[cursor] == " ") this.selectionStart++;
      } else if (e.which == 8) {
        if (cursor && this.value[cursor - 1] == " ") this.selectionEnd--;
      }
    }).on("input", function () {
      var value = this.value;
      var cursor = this.selectionStart;
      var matches = value.substring(0, cursor).match(/[^0-9]/g);
      if (matches) cursor -= matches.length;
      value = value.replace(/[^0-9]/g, "").substring(0, 16);
      var formatted = "";
      for (var i = 0, n = value.length; i < n; i++) {
        if (i && i % 4 == 0) {
          if (formatted.length <= cursor) cursor++;
          formatted += " ";
        }
        formatted += value[i];
      }
      if (formatted == this.value) return;
      this.value = formatted;
      this.selectionEnd = cursor;
    });
  }


  detalleItemDelCarrito(item: ItemCarrito) {
    console.log(item);
    this.numeroSeleccionado = item;
    this.txtCantidadAComprar.setValue(item.cantidadComprado);
    this.txtCantidadAGanar.setValue(item.premio);
    this.txtLoteria.setValue(item.loteria);
    $('#modalDetalleNumero').modal('show');
  }

  onKeyUpCalcularPremio() {
    let cantidadAComprar = this.txtCantidadAComprar.value;
    if (cantidadAComprar > 100) {
      this.txtCantidadAComprar.setValue(100);
    }
    var premio = this.txtCantidadAComprar.value * 80;
    this.txtCantidadAGanar.setValue(premio);
  }

  actualizarCarrito() {
    let pos = this.servicioCarritoDeCompras.itemsEnElCarrito.map(function (e) { return e; }).indexOf(this.numeroSeleccionado);
    this.servicioCarritoDeCompras.actualizarItemCarrito(pos, this.txtCantidadAComprar.value, this.txtCantidadAGanar.value);
    $('#modalDetalleNumero').modal('hide');
  }


  eliminarItemCarrito(item: ItemCarrito) {
    let pos = this.servicioCarritoDeCompras.itemsEnElCarrito.map(function (e) { return e; }).indexOf(item);
    this.servicioCarritoDeCompras.eliminarItemCarrito(pos);
  }

}
