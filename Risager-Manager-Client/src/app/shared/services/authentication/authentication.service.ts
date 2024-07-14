import { Injectable } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { Observable, switchMap } from 'rxjs';
import { ApiClient } from 'src/app/services/ApiClient';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private client: ApiClient,
    private cookieService: CookieService
  ) {}

  login(email: string | undefined, password: string | undefined) {
    return this.client
      .login(true, undefined, {
        email: email,
        password: password,
        twoFactorCode: undefined,
        twoFactorRecoveryCode: undefined,
      })
      .pipe(switchMap(async () => window.location.reload()))
      .subscribe();
  }

  register(email: string, password: string, username: string): Observable<any> {
    return this.client
      .register({
        email: email,
        password: password,
      })
      .pipe(switchMap(() => this.client.setUsername(email, username)));
  }

  currentUser() {
    return this.client.getCurrentUser();
  }

  logout() {
    this.client
      .logout()
      .pipe(switchMap(async () => window.location.reload()))
      .subscribe((x) => console.log(x));
  }

  getAllUsers() {
    return this.client.getAllUser();
  }
}
