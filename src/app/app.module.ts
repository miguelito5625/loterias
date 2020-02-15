import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacionComponent } from './componentes/barra-navegacion/barra-navegacion.component';
import { CarritoComprasComponent } from './componentes/carrito-compras/carrito-compras.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { MenuPrincipalComponent } from './componentes/menus/menu-principal/menu-principal.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';


import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { BolidoListaDeNumerosComponent } from './componentes/loterias/bolido/bolido-lista-de-numeros/bolido-lista-de-numeros.component';


@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacionComponent,
    CarritoComprasComponent,
    InicioSesionComponent,
    PerfilUsuarioComponent,
    MenuPrincipalComponent,
    RegistrarUsuarioComponent,
    BolidoListaDeNumerosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
