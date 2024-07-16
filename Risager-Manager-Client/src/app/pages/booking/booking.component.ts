import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BookingService } from './services/booking.service';
import { Booking, House, User } from 'src/app/services/ApiClient';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HouseService } from 'src/app/shared/services/house/house.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  bookingTableColumns = ['start', 'end', 'user', 'house', 'delete'];
  range: FormGroup<{
    start: FormControl<Date | null>;
    end: FormControl<Date | null>;
    house: FormControl<House | null>;
  }>;
  currentBookings$: Observable<Booking[]>;
  currentBookings: Booking[] = [];
  currentlyShownBookings: Booking[] = [];
  currentUser$: Observable<User>;
  currentUser: User | undefined;
  houseList$: Observable<House[]>;
  houseList: House[] = [];
  housePicture: string | undefined = undefined;
  currentlySelectedHouse: House | undefined = undefined;
  public constructor(
    private bookingService: BookingService,
    private authenticationService: AuthenticationService,
    private houseService: HouseService,
    private snackBar: MatSnackBar
  ) {
    const dayInMilliseconds = 1000 * 60 * 60 * 24;
    this.range = new FormGroup({
      start: new FormControl<Date | null>(new Date(Date())),
      end: new FormControl<Date | null>(
        new Date(Date.now() + dayInMilliseconds * 7)
      ),
      house: new FormControl<House | null>(null),
    });

    this.currentBookings$ = this.bookingService.getCurrentBookings();
    this.currentUser$ = this.authenticationService.currentUser();
    this.houseList$ = this.houseService.getAllHouses();

    this.range.valueChanges.subscribe((x) => {
      if (x.house) {
        console.log(x.house);
        this.housePicture = x.house.imageSrc;
      }
      this.currentlyShownBookings = this.currentBookings.filter(
        (x) => x.house.id === this.range.value.house?.id
      );
    });
  }

  ngOnInit() {
    this.currentBookings$.subscribe((dates) => {
      console.log(dates);
      this.currentBookings = dates;
      this.currentlyShownBookings = this.currentBookings.filter((x) => {
        if (!this.range.value.house) return true;
        return x.house.id === this.range.value.house?.id;
      });
    });
    this.currentUser$.subscribe((x) => {
      this.currentUser = x;
    });
    this.houseList$.subscribe((x) => {
      this.houseList = x;
      this.range.controls.house.setValue(x[0]);
      this.currentlyShownBookings = this.currentBookings.filter(
        (x) => x.house.id === this.range.value.house?.id
      );
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
      .createNewBooking(
        this.range.value.start,
        this.range.value.end,
        this.range.value.house?.id ?? 0
      )
      .subscribe({
        next: () => {
          console.log(
            'Booking successful',
            this.range.value.start,
            this.range.value.end
          );
          this.openSnackBar('Booking was succesfull!', 'close');

          this.currentBookings$ = this.bookingService.getCurrentBookings();
          this.currentBookings$.subscribe((dates) => {
            this.currentBookings = dates;
            this.currentlyShownBookings = this.currentBookings.filter(
              (x) => x.house.id === this.range.value.house?.id
            );
          });
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
        this.currentBookings$.subscribe((dates) => {
          this.currentBookings = dates;
          this.currentlyShownBookings = this.currentBookings.filter(
            (x) => x.house.id === this.range.value.house?.id
          );
        });
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
