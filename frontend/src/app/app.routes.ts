// app/app.routes.ts

import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LoginComponent } from './components/auth/login/login';
import { RegisterComponent } from './components/auth/register/register';
import { FlightSearch } from './components/flights/flight-search/flight-search';
import { BookingHistoryComponent } from './components/bookings/booking-history/booking-history';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'flights', component: FlightSearch },
  { path: 'bookings/history', component: BookingHistoryComponent },
  { path: '**', redirectTo: 'home' }
];
