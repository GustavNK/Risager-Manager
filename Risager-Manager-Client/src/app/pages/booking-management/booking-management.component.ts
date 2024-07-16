import { Component } from '@angular/core';
import { BookingService } from '../booking/services/booking.service';
import { Booking, House } from 'src/app/services/ApiClient';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { HouseService } from 'src/app/shared/services/house/house.service';

@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.scss'],
})
export class BookingManagementComponent {
  currentBookings$: Observable<Booking[]>;
  currentBookings: Booking[] = [];
  currentlyShownBookings: Booking[] = [];
  houseList$: Observable<House[]>;
  houseList: House[] = [];
  filter: FormGroup<{
    house: FormControl<House | null>;
    filterTimePeriod: FormControl<{ name: string; value: string } | null>;
  }>;
  filterTimePeriods: { name: string; value: string }[] = [
    { name: 'All', value: 'all' },
    { name: 'Past', value: 'past' },
    { name: 'Future', value: 'future' },
  ];

  constructor(
    private bookingService: BookingService,
    private houseService: HouseService,
    private snackBar: MatSnackBar
  ) {
    this.currentBookings$ = this.bookingService.getCurrentBookings();
    this.houseList$ = this.houseService.getAllHouses();
    this.filter = new FormGroup({
      house: new FormControl<House | null>(null),
      filterTimePeriod: new FormControl<{ name: string; value: string } | null>(
        this.filterTimePeriods[0]
      ),
    });
  }
  ngOnInit() {
    this.currentBookings$.subscribe((dates) => {
      this.currentBookings = dates;
      this.currentlyShownBookings = dates;
    });
    this.houseList$.subscribe((houses) => {
      this.houseList = houses;
      this.houseList.push({
        id: 999,
        name: 'All Houses',
        description: 'All Houses',
        imageSrc: 'https://via.placeholder.com/150',
        numberOfBeds: 0,
        bookings: [],
      });
      this.filter.patchValue({
        house: this.houseList[this.houseList.length - 1],
        filterTimePeriod: this.filterTimePeriods[0],
      });
    });
    this.filter.valueChanges.subscribe((x) => {
      if (x.house) {
        this.currentlyShownBookings = this.currentBookings.filter((booking) => {
          if (x.house?.id === 999) return true;
          return booking.house.id === x.house?.id;
        });
      }
      if (x.filterTimePeriod) {
        this.currentlyShownBookings = this.currentlyShownBookings.filter(
          (booking) => {
            if (!x.filterTimePeriod?.value) return true;
            if (x.filterTimePeriod.value === 'all') return true;
            if (x.filterTimePeriod.value === 'past') {
              return new Date(booking.departure) < new Date();
            }
            if (x.filterTimePeriod.value === 'future') {
              return new Date(booking.departure) > new Date();
            }
            return true;
          }
        );
      }
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
