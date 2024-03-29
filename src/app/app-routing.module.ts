import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { CarritoComprasComponent } from './componentes/carrito-compras/carrito-compras.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { MenuPrincipalComponent } from './componentes/menus/menu-principal/menu-principal.component';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { BolidoListaDeNumerosComponent } from './componentes/loterias/bolido/bolido-lista-de-numeros/bolido-lista-de-numeros.component';
import { DiariaListaDeNumerosComponent } from './componentes/loterias/diaria/diaria-lista-de-numeros/diaria-lista-de-numeros.component';
import { PruebaComponent } from './componentes/prueba/prueba.component';
import { MenuLoteriaDiariaComponent } from './componentes/menus/menu-loteria-diaria/menu-loteria-diaria.component';


const routes: Routes = [
  {
    path: '',
    component: MenuPrincipalComponent
  },
  {
    path: 'registro-usuario',
    component: RegistrarUsuarioComponent
  },
  {
    path: 'iniciar-sesion',
    component: InicioSesionComponent
  },
  {
    path: 'carrito-compras',
    component: CarritoComprasComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'perfil-usuario',
    component: PerfilUsuarioComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'menu-principal',
    component: MenuPrincipalComponent
  },
  {
    path: 'loterias/bolido/lista-de-numeros',
    component: BolidoListaDeNumerosComponent
  },
  {
    path: 'loterias/diaria',
    component: MenuLoteriaDiariaComponent
  },
  {
    path: 'loterias/diaria/lista-de-numeros',
    component: DiariaListaDeNumerosComponent
  },
  {
    path: 'test',
    component: PruebaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
