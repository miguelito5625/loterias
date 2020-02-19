import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { NodeSnackbarService } from 'src/app/servicios/node-snackbar.service';

declare var $: any;

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  constructor(
    private authService: AutenticacionService,
    private servicioSnackbar: NodeSnackbarService
  ) { }

  ngOnInit() {
    // $('#').addClass('is-valid').removeClass(validClass);
    // $('#exampleInputEmail1').addClass('is-valid');
  }

  formularioInicioSesion = new FormGroup({
    correo: new FormControl('test1@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('123456')
  });


  iniciarSesion(formulario){
    // console.log(formulario);

    if(!this.formularioInicioSesion.controls.correo.valid){
      $('#idTxtCorreo').addClass('is-invalid');
      this.servicioSnackbar.mostrarSnackBarArriba('correo no valido');
      return;
    }

    console.log('inicio de sesion');
    
    this.authService.loginConCorreo(this.formularioInicioSesion.controls.correo.value, this.formularioInicioSesion.controls.password.value);
    
  }

}
