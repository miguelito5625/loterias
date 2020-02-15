import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  itemsDelMenu = [
    {
      titulo: 'La Diaria',
      urlImagen: '/assets/imagenes/logos/diaria-logo.png',
      urlRedireccion: '/loterias/la-diaria'
    }
    // {
    //   titulo: 'La Diaria',
    //   urlImagen: '/assets/imagenes/logos/la-diaria.png',
    //   urlRedireccion: '/loterias/la-diaria'
    // }
  ]

  constructor() { }

  ngOnInit() {
  }

}
