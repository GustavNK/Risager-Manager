import { Component } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ApiClient, User } from 'src/app/services/ApiClient';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  public user: User | undefined = undefined;
  constructor(private client: ApiClient) {
    this.client = client;
    this.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  getUser(): Observable<User> {
    return this.client.getUser('1');
  }
}
