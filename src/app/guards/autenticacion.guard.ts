import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {

  constructor(
    private router: Router
    ) { }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.sesionActiva()) {
       return true;
    }
    // navigate to login page as user is not authenticated   
    this.router.navigate(['/iniciar-sesion']);
    return false;
 }
 
 public sesionActiva(): boolean {
    let status = false;
    if (localStorage.getItem('sesionActiva') == "true") {
       status = true;
    }
    else {
       status = false;
    }
    return status;
 }
  
}
