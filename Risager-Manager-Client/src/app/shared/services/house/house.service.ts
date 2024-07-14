import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient, House } from 'src/app/services/ApiClient';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  constructor(private client: ApiClient) {}
  getAllHouses(): Observable<House[]> {
    return this.client.houseAll();
  }
}
