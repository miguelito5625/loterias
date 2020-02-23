import { Component, OnInit, NgZone } from '@angular/core';
import { CarritoDeComprasService } from 'src/app/servicios/carrito-de-compras.service';
import { ItemCarrito } from 'src/app/clases/item-carrito';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PagoStripe } from 'src/app/clases/pago-stripe';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { JqueryConfirmService } from 'src/app/servicios/jquery-confirm.service';


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

  //Elementos stripe
  elements: Elements;
  // card: StripeElement;

  // // optional parameters
  // elementsOptions: ElementsOptions = {
  //   locale: 'es'
  // };

  // stripeTest: FormGroup;

  constructor(
    private servicioCarritoDeCompras: CarritoDeComprasService,
    private fb: FormBuilder,
    private stripeService: StripeService,
    private _ngZone: NgZone,
    private jqueryConfirm: JqueryConfirmService
  ) { }

  ngOnInit() {
    // console.log(localStorage.getItem('correo'));
    // this.itemsDelCarrito = this.servicioCarritoDeCompras.obtenerItemsDelCarrito();
    // console.log(this.itemsDelCarrito);

    //Stripe
    // this.stripeTest = this.fb.group({
    //   name: ['', [Validators.required]]
    // });
    // this.stripeService.elements(this.elementsOptions)
    //   .subscribe(elements => {
    //     this.elements = elements;
    //     // Only mount the element the first time
    //     if (!this.card) {
    //       this.card = this.elements.create('card', {
    //         style: {
    //           base: {
    //             iconColor: '#666EE8',
    //             color: '#31325F',
    //             lineHeight: '40px',
    //             fontWeight: 300,
    //             fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    //             fontSize: '18px',
    //             '::placeholder': {
    //               color: '#CFD7E0'
    //             }
    //           }
    //         }
    //       });
    //       this.card.mount('#card-element');
    //     }
    //   });

    // $('#modalRealizarPago').modal('show');

    // $('#modalRealizarPago').modal({
    //   show: true,
    //   keyboard: false,
    //   backdrop: 'static'
    // });
    // $('#idTxtNombreTarjeta').addClass('is-invalid');
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

  abrirModalPago(){
    console.log(this.servicioCarritoDeCompras.totalAPagar);
    
    if(Number(this.servicioCarritoDeCompras.totalAPagar) < Number(10.00)){
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


  // buy() {
  //   const name = this.stripeTest.get('name').value;
  //   this.stripeService
  //     .createToken(this.card, { name })
  //     .subscribe(result => {
  //       if (result.token) {
  //         // Use the token to create a charge or a customer
  //         // https://stripe.com/docs/charges
  //         console.log(result.token);

  //         this.servicioCarritoDeCompras.pagoConStripe({
  //           stripeName: name,
  //           stripeToken: result.token.id,
  //           monto: '4000',
  //           moneda: 'GTQ',
  //           descripcion: 'compra de numeros'
  //         }).subscribe(res =>{
  //           console.log(res);
  //         });

  //       } else if (result.error) {
  //         // Error creating the token
  //         console.log(result.error.message);
  //       }
  //     });
  // }

  pagarConStripe() {
    // let pagoStripe: PagoStripe = {
    //   descripcion: 'pago numeros',
    //   moneda: 'GTQ',
    //   montoDePago: String(this.servicioCarritoDeCompras.totalAPagar),
    //   stripeEmail: this.email,
    //   stripeToken: this.tokenid
    // };
    console.log('pagoStripe');

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
    // console.log(pos);

    this.servicioCarritoDeCompras.actualizarItemCarrito(pos, this.txtCantidadAComprar.value, this.txtCantidadAGanar.value);

    $('#modalDetalleNumero').modal('hide');
  }


  eliminarItemCarrito(item: ItemCarrito) {
    let pos = this.servicioCarritoDeCompras.itemsEnElCarrito.map(function (e) { return e; }).indexOf(item);
    this.servicioCarritoDeCompras.eliminarItemCarrito(pos);
  }

  realizarElPago() {
    alert('Funcion no disponible');
  }


}
