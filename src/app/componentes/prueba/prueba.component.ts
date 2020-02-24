import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CarritoDeComprasService } from 'src/app/servicios/carrito-de-compras.service';

declare var $: any;

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  constructor(
    public servicioCarritoDeCompras: CarritoDeComprasService,
    private _ngZone: NgZone
  ) { }

  ngOnInit() {
    $('#modalRealizarPago').modal({
      show: true,
      keyboard: false,
      backdrop: 'static'
    });
    // $('#idTxtNombreTarjeta').addClass('is-invalid');
    this.formatoTarjeta();
  }

  realizandoPago: boolean = false;

  cardNumber = new FormControl('4242 4242 4242 4242');
  expiryMonth = new FormControl('02');
  expiryYear = new FormControl('22');
  cvc = new FormControl('569');

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
      name: 'MikeTest'
    }, (status: number, response: any) => {
      if (status === 200) {
        
        // this.message = `Success! Card token ${response.card.id}.`;
        console.log('exito');

        // console.log(response.card);
        console.log(response);

        this.servicioCarritoDeCompras.pagoConStripe({
          stripeName: 'name',
          stripeToken: response.id,
          monto: '4000',
          moneda: 'GTQ',
          descripcion: 'compra de numeros'
        }).subscribe(res => {
          console.log(res);
          $('#btnPagar').attr("disabled", false);
          $('#btnCancelarPago').attr("disabled", false);

          //Metodo para cambiar valor de variable cuando no funciona el metodo convencional
          this._ngZone.run(() => { 
            this.realizandoPago = false;
          });
        });

      } else {
        // this.message = response.error.message;
        console.log('error');

        console.log(response.error.message);

      }
    });
  }

  formatoTarjeta() {
    // let numeros = $('#idTxtNumeroTarjeta').val();
    // console.log(numeros.length);
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

  // metodoPrueba(){
  //   console.log('prueba');

  // }

}
