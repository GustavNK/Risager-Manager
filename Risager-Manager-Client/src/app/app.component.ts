import { Component } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication/authentication.service';
import { Observable } from 'rxjs';
import { User } from './services/ApiClient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Risager-Manager-Client';
  user$: Observable<User>;
  user: User | undefined = undefined;
  constructor(private authenticationService: AuthenticationService) {
    this.user$ = this.authenticationService.currentUser();
  }
  ngOnInit() {
    this.user$.subscribe((x) => (this.user = x));
  }
  logout() {
    this.authenticationService.logout();
  }
}
