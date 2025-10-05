// app/app.routes.ts

import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LoginComponent } from './components/auth/login/login';
import { RegisterComponent } from './components/auth/register/register';
import { FlightSearch } from './components/flights/flight-search/flight-search';
import { BookingHistoryComponent } from './components/bookings/booking-history/booking-history';
import { ManageFlightsComponent } from './components/manage-flights/manage-flights';
import { AdminBookingsComponent } from './components/admin-bookings/admin-bookings';
import { ManageSchedulesComponent } from './components/manage-schedules/manage-schedules';
import { AdminReportsComponent } from './components/reports/reports';


export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'admin/flights', component: ManageFlightsComponent },
  { path: 'admin/schedules', component: ManageSchedulesComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/bookings', component: AdminBookingsComponent },
  { path: 'admin/reports', component: AdminReportsComponent },
  { path: 'flights', component: FlightSearch },
  { path: 'bookings/history', component: BookingHistoryComponent },
  { path: '**', redirectTo: 'home' }
];
