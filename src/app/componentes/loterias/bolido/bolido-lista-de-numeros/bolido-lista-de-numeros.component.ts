import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NumerosBolidoService } from 'src/app/servicios/numeros-bolido.service';
import { NumeroBolido } from 'src/app/clases/numero-bolido';

@Component({
  selector: 'app-bolido-lista-de-numeros',
  templateUrl: './bolido-lista-de-numeros.component.html',
  styleUrls: ['./bolido-lista-de-numeros.component.css']
})
export class BolidoListaDeNumerosComponent implements OnInit {

  constructor(
    private servicioNumeroBolido: NumerosBolidoService
  ) { }

  ngOnInit() {
    this.obtenerNumerosBolido();
    // this.servicioNumeroBolido.generarNumeros();
  }

  numerosBolido: NumeroBolido[];

  numerosBuscados: NumeroBolido[];

  busqueda = new FormControl('');

  onKeyUpBuscarNumero() {
    if (this.busqueda.value == null) {
      this.numerosBuscados = this.numerosBolido;
      return;
    }
    this.numerosBuscados = this.numerosBolido.filter(s => s.numero.includes(this.busqueda.value));
  }

  async obtenerNumerosBolido(){
   let suscripcion = await this.servicioNumeroBolido.obtenerNumeros().subscribe(data => {
      // console.log(data);
      this.numerosBolido = [];
        data.forEach(element => {
          let x = element.payload.doc.data();
          x["uid"] = element.payload.doc.id;
          this.numerosBolido.push(x as NumeroBolido);
        });
      // console.log(this.numerosBolido);
      this.numerosBuscados = this.numerosBolido;
      //se utiliza unsubscribe para que no se actualicen los datos automaticamente
      suscripcion.unsubscribe();
    });

    

  }


}
