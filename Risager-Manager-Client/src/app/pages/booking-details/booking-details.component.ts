import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BookingService } from '../booking/services/booking.service';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/services/ApiClient';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss'],
})
export class BookingDetailsComponent implements OnInit {
  id: string;
  booking$: Observable<Booking>;
  booking: Booking | undefined;
  bookingDetails: FormGroup<{
    comment: FormControl<string | null>;
    electricityMeterStart: FormControl<number | null>;
    electricityMeterEnd: FormControl<number | null>;
  }>;
  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.booking$ = this.bookingService.getBookingById(this.id);
    this.bookingDetails = new FormGroup({
      comment: new FormControl(''),
      electricityMeterStart: new FormControl(0),
      electricityMeterEnd: new FormControl(0),
    });
  }
  ngOnInit(): void {
    this.booking$.subscribe((booking) => (this.booking = booking));
  }
}
