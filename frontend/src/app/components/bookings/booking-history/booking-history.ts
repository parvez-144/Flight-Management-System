

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../services/booking';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-history.html'
})
export class BookingHistoryComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.getHistory().subscribe({
      next: data => this.bookings = data,
      error: err => {
        console.error('Error fetching booking history', err);
        alert(err.error?.message || 'Could not fetch booking history');
      }
    });
  }

  cancel(id: string) {
    this.bookingService.cancelBooking(id).subscribe({
      next: res => {
        alert('Booking canceled');
        this.ngOnInit();  // refresh
      },
      error: err => {
        console.error('Cancel error', err);
        alert(err.error?.message || 'Cancel failed');
      }
    });
  }
}
