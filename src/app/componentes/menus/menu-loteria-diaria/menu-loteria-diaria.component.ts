import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-loteria-diaria',
  templateUrl: './menu-loteria-diaria.component.html',
  styleUrls: ['./menu-loteria-diaria.component.css']
})
export class MenuLoteriaDiariaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  itemsDelMenu = [
    {
      titulo: 'Diaria 9:30',
      urlImagen: '/assets/imagenes/logos/diaria930.png',
      urlRedireccion: '/loterias/diaria930/lista-de-numeros',
      habilitado: true
    },
    {
      titulo: 'Diaria 13:30',
      urlImagen: '/assets/imagenes/logos/diaria1330.png',
      urlRedireccion: '/loterias/diaria1330/lista-de-numeros',
      habilitado: true
    },
    {
      titulo: 'Diaria 20:30',
      urlImagen: '/assets/imagenes/logos/diaria2030.png',
      urlRedireccion: '/loterias/diaria2030/lista-de-numeros',
      habilitado: true
    }
  ]

}
