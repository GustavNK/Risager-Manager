import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { LOCALE_ID } from '@angular/core';
import { BookingComponent } from './pages/booking/booking.component';
import { UserComponent } from './pages/user/user.component';
import { API_BASE_URL, ApiClient } from './services/ApiClient';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    UserComponent,
    RegisterUserComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'da-DK' },
    {
      provide: ApiClient,
      useClass: ApiClient,
    },
    { provide: API_BASE_URL, useValue: 'https://localhost:7185' },
    CookieService,
    MatSnackBar,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
