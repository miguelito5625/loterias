import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class JqueryConfirmService {

  alerta: any;

  constructor() { }

  pruebaAlerta() {
    return this.alerta = $.confirm({
      // title: '',
      // content: '',
      onOpenBefore: function () {
        var self = this;
        this.setContentPrepend('Cargando');
        self.showLoading();
      },
      columnClass: 'medium',
    });

    // setTimeout(()=>{
    //   console.log('dos segundos');
    //   this.alerta.close();

    // }, 2000);

  }

  modalCargando() {
    return this.alerta = $.confirm({
      // title: '',
      // content: '',
      onOpenBefore: function () {
        var self = this;
        this.setContentPrepend('Cargando');
        self.showLoading();
      },
      columnClass: 'medium',
    });
  }

  mensajeDeError(txtError:string) {
    $.confirm({
      title: 'Ha ocurrido un error!',
      content: txtError,
      type: 'red',
      typeAnimated: true,
      buttons: {
        close: {
          text: 'Ok',
          btnClass: 'btn-red',
          action: function () {
            
          }
        }
      }
    });
  }

}
