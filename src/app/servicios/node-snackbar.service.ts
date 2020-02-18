import { Injectable } from '@angular/core';

declare var Snackbar: any;

@Injectable({
  providedIn: 'root'
})
export class NodeSnackbarService {

  constructor() { }


  mostrarSnackBarArriba(mensaje: string){
    Snackbar.show({
      text: mensaje,
      showAction: false,
      duration: 2000,
      pos: 'top-center'
      // textColor: '#74FF33',
      // backgroundColor
    });
  }


}
