import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BookingService } from './services/booking.service';
import { Booking } from 'src/app/services/ApiClient';
import { Observable } from 'rxjs';

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

  public constructor(private bookingService: BookingService) {
    const dayInMilliseconds = 1000 * 60 * 60 * 24;
    this.range = new FormGroup({
      start: new FormControl<Date | null>(new Date(Date())),
      end: new FormControl<Date | null>(
        new Date(Date.now() + dayInMilliseconds * 7)
      ),
    });

    this.currentBookings$ = this.bookingService.getCurrentBookings();
  }
  ngOnInit() {
    this.currentBookings$.subscribe((dates) => {
      this.currentBookings = dates;
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
      .subscribe((result) => {
        if (!result) {
          console.error('Booking failed');
        }
        console.log(
          'Booking successful',
          this.range.value.start,
          this.range.value.end
        );
        this.currentBookings$ = this.bookingService.getCurrentBookings();
        this.currentBookings$.subscribe(
          (dates) => (this.currentBookings = dates)
        );
      });
  }
}
