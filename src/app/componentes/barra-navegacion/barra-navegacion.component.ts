import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { JqueryConfirmService } from 'src/app/servicios/jquery-confirm.service';
import { NodeSnackbarService } from 'src/app/servicios/node-snackbar.service';

// import * as Snackbar from 'node-snackbar';

declare var Snackbar: any;


@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})


export class BarraNavegacionComponent implements OnInit {

  constructor(
    private servicioAutenticacion: AutenticacionService,
    private servicioAlertas: JqueryConfirmService,
    private nodeSnackbar: NodeSnackbarService
  ) { }

  ngOnInit() {

    // if (window.screen.width <= 768) { // 768px portrait
    //   this.mobile = true;
    // }
    
  }

  // mobile: boolean;

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
