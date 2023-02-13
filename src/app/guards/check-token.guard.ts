import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginTokenGuard implements CanActivate {
  constructor(private alert: AlertService, private Router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('user_token') == null) {
      return true;
    }
    else {
      this.alert.presentToast('You must be logged in to view this page', 2000, 'top', 'danger');
      this.Router.navigate(['/profile'])
      return false;
    }
  }

}
