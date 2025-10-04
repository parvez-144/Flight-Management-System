import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService, FlightSearchParams } from '../../../services/flight';
import { BookingService } from '../../../services/booking';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flight-search.html'
})
export class FlightSearch implements OnInit {
  flights: any[] = [];
  search: FlightSearchParams = { source: '', destination: '', date: '', airline: '' };
  hasSearched = false;

  // For booking confirmation display
  bookingResult: any = null;

  // Number of seats user wants to book
  seatsToBook: number = 1;

  constructor(
    private flightService: FlightService,
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    // Do not load all schedules by default
  }

  searchFlights() {
    console.log('Searching with params:', this.search);
    this.flightService.searchFlights(this.search).subscribe({
      next: (data) => {
        console.log('Search result:', data);
        // Extract array if wrapped in object
        if ((data as any).schedules && Array.isArray((data as any).schedules)) {
          this.flights = (data as any).schedules;
        } else if (Array.isArray(data)) {
          this.flights = data;
        } else {
          this.flights = [];
        }
        this.hasSearched = true;
        this.bookingResult = null;  // reset any previous booking result
      },
      error: err => {
        console.error('Error searching flights:', err);
        alert(err.error?.message || 'Search failed');
        this.hasSearched = true;
      }
    });
  }

  book(scheduleId: string) {
    console.log('Booking schedule:', scheduleId, 'with seats:', this.seatsToBook);
    this.bookingService.bookTicket({ scheduleId, seats: this.seatsToBook }).subscribe({
      next: res => {
        console.log('Booking success result:', res);
        // store booking for display
        this.bookingResult = res.booking; 
      },
      error: err => {
        console.error('Booking error:', err);
        alert(err.error?.message || 'Booking failed');
      }
    });
  }
}
