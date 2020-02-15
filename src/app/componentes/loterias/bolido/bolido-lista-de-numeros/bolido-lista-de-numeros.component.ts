import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-bolido-lista-de-numeros',
  templateUrl: './bolido-lista-de-numeros.component.html',
  styleUrls: ['./bolido-lista-de-numeros.component.css']
})
export class BolidoListaDeNumerosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.numerosBuscados = this.numerosBolido;
    console.log(this.busqueda.value);
    
  }

  numerosBolido = [
    {
      numero: '01'
    },
    {
      numero: '02'
    },
    {
      numero: '03'
    },
    {
      numero: '04'
    },
    {
      numero: '05'
    },
    {
      numero: '06'
    },
    {
      numero: '07'
    },
    {
      numero: '08'
    },
    {
      numero: '09'
    },
    {
      numero: '10'
    },

  ];

  numerosBuscados = [];

  busqueda = new FormControl('');

  onKeyUp() {
    if(this.busqueda.value == null){
      this.numerosBuscados = this.numerosBolido;
      return;
    }    

    this.numerosBuscados = this.numerosBolido.filter(s => s.numero.includes(this.busqueda.value));
  }


}
