import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { CarritoComprasComponent } from './componentes/carrito-compras/carrito-compras.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { MenuPrincipalComponent } from './componentes/menus/menu-principal/menu-principal.component';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
