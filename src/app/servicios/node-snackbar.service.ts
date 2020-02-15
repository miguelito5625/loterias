import { Injectable } from '@angular/core';

declare var Snackbar: any;

@Injectable({
  providedIn: 'root'
})
export class NodeSnackbarService {

  constructor() { }

  usuarioRegistrado(){
    Snackbar.show({
      text: 'Usuario registrado, intenta iniciar sesion',
      showAction: false,
      duration: 2000,
      pos: 'top-center'
      // textColor: '#74FF33',
      // backgroundColor
    });
  }

  sesionIniciada(){
    Snackbar.show({
      text: 'Sesion iniciada',
      showAction: false,
      duration: 2000,
      pos: 'top-center'
      // textColor: '#74FF33',
      // backgroundColor
    });
  }

  sesionCerrada(){
    Snackbar.show({
      text: 'Sesion cerrada',
      showAction: false,
      duration: 2000,
      pos: 'top-center'
      // textColor: '#74FF33',
      // backgroundColor
    });
  }

}
