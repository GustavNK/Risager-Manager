import { Component } from '@angular/core';
import { BookingService } from '../booking/services/booking.service';
import { Booking } from 'src/app/services/ApiClient';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.scss'],
})
export class BookingManagementComponent {
  currentBookings$: Observable<Booking[]>;
  currentBookings: Booking[] = [];
  constructor(
    private bookingService: BookingService,
    private snackBar: MatSnackBar
  ) {
    this.currentBookings$ = this.bookingService.getCurrentBookings();
  }
  ngOnInit() {
    this.currentBookings$.subscribe((dates) => {
      console.log(dates);
      this.currentBookings = dates;
    });
  }

  delteBooking(bookingId: string | undefined): void {
    if (!bookingId) {
      this.openSnackBar('Booking deletion failed', 'close');
      return;
    }
    this.bookingService.deleteBooking(bookingId).subscribe({
      next: () => {
        console.log('Booking deleted', bookingId);
        this.openSnackBar('Booking was deleted!', 'close');
        this.currentBookings$ = this.bookingService.getCurrentBookings();
        this.currentBookings$.subscribe(
          (dates) => (this.currentBookings = dates)
        );
      },
      error: () => {
        this.openSnackBar('Booking deletion failed', 'close');
      },
      complete: () => {},
    });
  }
  test() {
    console.log('sd');
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
