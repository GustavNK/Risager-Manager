import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/services/ApiClient';

@Component({
  selector: 'app-register-user',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {
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
  updateUserList() {
    this.allUsers$ = this.authenticationService.getAllUsers();
    this.allUsers$.subscribe((x) => {
      this.allUsers = x;
    });
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
  deleteUser(id: string) {
    this.authenticationService
      .deleteUser(id)
      .pipe(
        switchMap(async () => {
          this.updateUserList();

          this.openSnackBar('User has been deleted', 'close');
        })
      )
      .subscribe();
  }
}
