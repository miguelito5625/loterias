import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  constructor(
    private servicioAutenticacion: AutenticacionService
  ) { }

  ngOnInit() {
    this.servicioAutenticacion.obtenerUsuarios().subscribe(data => {
      // console.log(data);
      this.usuarios = [];
        data.forEach(element => {
          let x = element.payload.doc.data();
          x["uid"] = element.payload.doc.id;
          this.usuarios.push(x as Usuario);
        });

      // console.log(this.usuarios);
      
    });
  }

  usuarios: Usuario[];

  itemsDelMenu = [
    {
      titulo: 'Bolido',
      urlImagen: '/assets/imagenes/logos/bolido-logo.png',
      urlRedireccion: '/loterias/bolido/lista-de-numeros',
      habilitado: true
    },
    {
      titulo: 'Diaria',
      urlImagen: '/assets/imagenes/logos/diaria-logo.png',
      urlRedireccion: '/loterias/diaria/lista-de-numeros',
      habilitado: true
    }
  ]

}
