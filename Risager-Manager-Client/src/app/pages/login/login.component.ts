import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import {
  AccessTokenResponse,
  ApiClient,
  User,
} from 'src/app/services/ApiClient';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public user: User | undefined = undefined;
  constructor(private authenticationService: AuthenticationService) {}
  loginFormGroup = new FormGroup({
    email: new FormControl('test@test.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('Abc123!', [Validators.required]),
  });

  login() {
    console.log(this.loginFormGroup.value);
    this.authenticationService.login(
      this.loginFormGroup.value.email ?? undefined,
      this.loginFormGroup.value.password ?? undefined
    );
  }
}
