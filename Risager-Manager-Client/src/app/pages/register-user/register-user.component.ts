import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/services/ApiClient';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent {
  allUsers$: Observable<User[]>;
  allUsers: User[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    this.allUsers$ = this.authenticationService.getAllUsers();
  }

  ngOnInit() {
    this.allUsers$.subscribe((x) => {
      this.allUsers = x;
    });
  }
  registerFormGroup = new FormGroup({
    username: new FormControl('Gustav', [Validators.required]),
    email: new FormControl('test@test.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('Abc123!', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  submit() {
    console.log(this.registerFormGroup.value);
    if (!this.registerFormGroup.valid) {
      return;
    }
    this.authenticationService
      .register(
        this.registerFormGroup.value.email ?? '',
        this.registerFormGroup.value.password ?? '',
        this.registerFormGroup.value.username ?? ''
      )
      .pipe(
        switchMap(async () =>
          this.openSnackBar('User has been created', 'close')
        )
      )
      .subscribe();
  }
}
