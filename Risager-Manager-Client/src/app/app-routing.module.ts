import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './pages/booking/booking.component';
import { LoginComponent } from './pages/login/login.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'book', component: BookingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
