import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const user = firebase.auth().currentUser;
    if (user) {
      console.log('AuthGuard: user is logged in, allowing access.');
      return true;
    } else {
      window.alert('You are not logged in! Please log in to continue.');
      return this.router.createUrlTree(['/'], { queryParams: { needsLogin: true } });
    }
  }
}
