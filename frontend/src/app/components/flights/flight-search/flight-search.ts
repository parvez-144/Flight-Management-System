// flight-search.ts

import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../../services/flight';
import { BookingService } from '../../../services/booking';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.html'
})
export class FlightSearch implements OnInit {
  flights: any[] = [];
  search = { source: '', destination: '', date: '' };

  constructor(
    private flightService: FlightService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.flightService.getSchedules().subscribe({
      next: res => this.flights = res,
      error: err => console.error(err)
    });
  }

  searchFlights() {
    this.flightService.searchFlights(this.search).subscribe({
      next: res => this.flights = res,
      error: err => console.error(err)
    });
  }

  book(scheduleId: number) {
    this.bookingService.bookTicket({ scheduleId, seats_booked: 1 }).subscribe({
      next: () => alert('Booked successfully!'),
      error: err => alert(err.error.message || 'Booking failed')
    });
  }
}
