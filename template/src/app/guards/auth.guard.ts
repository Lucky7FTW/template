import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';  // <-- Adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.user$.pipe(
      map(user => {
        if (user) {
          console.log('AuthGuard: user is logged in, allowing access.');
          return true;
        } else {
          console.warn('AuthGuard: no user, redirecting to root.');
          window.alert('You are not logged in!');
          this.router.navigate(['/']); // or createUrlTree(['/'])
          return false;
        }
      })
    );
  }
}
