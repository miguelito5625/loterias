import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { JqueryConfirmService } from 'src/app/servicios/jquery-confirm.service';
import { NodeSnackbarService } from 'src/app/servicios/node-snackbar.service';
import { CarritoDeComprasService } from 'src/app/servicios/carrito-de-compras.service';

// import * as Snackbar from 'node-snackbar';

declare var Snackbar: any;


@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})


export class BarraNavegacionComponent implements OnInit {

  itemsEnElCarrito:number= 0;

  constructor(
    private servicioAutenticacion: AutenticacionService,
    private servicioAlertas: JqueryConfirmService,
    private nodeSnackbar: NodeSnackbarService,
    public servicioCarritoDeCompras: CarritoDeComprasService
  ) { }

  ngOnInit() {

    // this.servicioCarritoDeCompras.obtenerTotalItems.subscribe(message=> this.itemsEnElCarrito = message);

  }

  

  public sesionActiva(): boolean {
    
    if (localStorage.getItem('sesionActiva') == "true") {
      return true;
    }
    else {
      return false;
    }
 }

  cerrarSesion(){
    this.servicioAutenticacion.cerrarSesion();
  }

}
