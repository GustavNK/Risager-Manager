import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BookingService } from './services/booking.service';
import { Booking, User } from 'src/app/services/ApiClient';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  range: FormGroup<{
    start: FormControl<Date | null>;
    end: FormControl<Date | null>;
  }>;
  currentBookings: Booking[] = [];
  currentBookings$: Observable<Booking[]>;
  currentUser$: Observable<User>;
  currentUser: User | undefined;

  public constructor(
    private bookingService: BookingService,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    const dayInMilliseconds = 1000 * 60 * 60 * 24;
    this.range = new FormGroup({
      start: new FormControl<Date | null>(new Date(Date())),
      end: new FormControl<Date | null>(
        new Date(Date.now() + dayInMilliseconds * 7)
      ),
    });

    this.currentBookings$ = this.bookingService.getCurrentBookings();
    this.currentUser$ = this.authenticationService.currentUser();
  }
  ngOnInit() {
    this.currentBookings$.subscribe((dates) => {
      console.log(dates);
      this.currentBookings = dates;
    });
    this.currentUser$.subscribe((x) => {
      this.currentUser = x;
    });
  }

  dateIsInBookedRangeFilter = (date: Date | null) => {
    if (date === null) return true;

    return !this.currentBookings.some(
      (booking) =>
        new Date(booking.arrival) < date && new Date(booking.departure) > date
    );
  };

  submitBooking(): void {
    if (!this.range.value.start || !this.range.value.end) return;
    this.bookingService
      .createNewBooking(this.range.value.start, this.range.value.end, 1)
      .subscribe({
        next: () => {
          console.log(
            'Booking successful',
            this.range.value.start,
            this.range.value.end
          );
          this.openSnackBar('Booking was succesfull!', 'close');

          this.currentBookings$ = this.bookingService.getCurrentBookings();
          this.currentBookings$.subscribe(
            (dates) => (this.currentBookings = dates)
          );
        },
        error: () => {
          this.openSnackBar('Booking failed', 'close');
        },
        complete: () => {},
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
