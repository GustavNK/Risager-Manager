import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './pages/booking/booking.component';
import { LoginComponent } from './pages/login/login.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { HomeComponent } from './pages/home/home.component';
import { BookingManagementComponent } from './pages/booking-management/booking-management.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'book', component: BookingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserManagementComponent },
  { path: 'booking-management', component: BookingManagementComponent },
  { path: 'booking-management/{id}', component: BookingManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
