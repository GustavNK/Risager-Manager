import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, ReplaySubject, switchMap } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';

const authState = new ReplaySubject<boolean>();
setTimeout(() => {
  authState.next(true);
}, 2000);

@Injectable({
  providedIn: 'root',
})
export class UserIsLoggedInGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private autheticationService: AuthenticationService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    console.log('Authorized');
    this.autheticationService
      .isAuthenticated()
      .subscribe((res) => authState.next(res));
    return authState;
  }
}
