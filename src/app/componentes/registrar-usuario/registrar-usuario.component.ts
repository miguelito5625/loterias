import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  constructor(
    private servicioAutenticacion: AutenticacionService
  ) { }

  ngOnInit() {
  }

  formularioRegistro = new FormGroup({
    nombreUsuario: new FormControl(''),
    correo: new FormControl(''),
    password: new FormControl('')
  });

  registrarUsuario(){

    let correo = this.formularioRegistro.controls.correo.value;
    let password = this.formularioRegistro.controls.password.value;
    let nombreUsuario = this.formularioRegistro.controls.nombreUsuario.value;

    this.servicioAutenticacion.registroUsuario(correo, password);
  }

}
