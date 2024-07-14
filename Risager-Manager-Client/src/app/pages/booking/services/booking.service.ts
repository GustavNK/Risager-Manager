import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient, Booking } from 'src/app/services/ApiClient';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private client: ApiClient) {
    this.client = client;
  }

  getCurrentBookings(): Observable<Booking[]> {
    return this.client.bookingAll();
  }

  createNewBooking(
    start: Date,
    end: Date,
    userId: number
  ): Observable<boolean> {
    console.log(start, end, userId);
    return this.client.bookingPOST(
      start.toISOString(),
      end.toISOString(),
      userId
    );
  }

  deleteBooking(bookingId: string): Observable<any> {
    return this.client.bookingDELETE(bookingId);
  }
}
