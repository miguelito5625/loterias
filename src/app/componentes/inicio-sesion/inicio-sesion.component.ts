import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  constructor(
    private authService: AutenticacionService
  ) { }

  ngOnInit() {
  }

  formularioInicioSesion = new FormGroup({
    correo: new FormControl(''),
    password: new FormControl('')
  });


  iniciarSesion(formulario){
    // console.log(formulario);

    console.log('inicio de sesion');
    
    this.authService.loginConCorreo(this.formularioInicioSesion.controls.correo.value, this.formularioInicioSesion.controls.password.value);
    
  }

}
