import { Component, OnInit } from '@angular/core';
import { CarritoDeComprasService } from 'src/app/servicios/carrito-de-compras.service';
import { ItemCarrito } from 'src/app/clases/item-carrito';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PagoStripe } from 'src/app/clases/pago-stripe';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";


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
  card: StripeElement;
 
  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: 'es'
  };
 
  stripeTest: FormGroup;

  constructor(
    private servicioCarritoDeCompras: CarritoDeComprasService,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) { }

  ngOnInit() {
    // console.log(localStorage.getItem('correo'));
    // this.itemsDelCarrito = this.servicioCarritoDeCompras.obtenerItemsDelCarrito();
    // console.log(this.itemsDelCarrito);
  
    //Stripe
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element');
        }
      });

      $('#modalRealizarPago').modal('show');

  }


  buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token);

          this.servicioCarritoDeCompras.pagoConStripe({
            stripeName: name,
            stripeToken: result.token.id,
            monto: '4000',
            moneda: 'GTQ',
            descripcion: 'compra de numeros'
          }).subscribe(res =>{
            console.log(res);
          });

        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
 
  pagarConStripe(){
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
