// booking-history.ts

import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.html'
})
export class BookingHistoryComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.getHistory().subscribe({
      next: res => this.bookings = res,
      error: err => console.error(err)
    });
  }

  cancel(id: number) {
    this.bookingService.cancelBooking(id).subscribe({
      next: () => {
        alert('Cancelled successfully!');
        this.ngOnInit();  // refresh list
      },
      error: err => alert(err.error.message || 'Cancel failed')
    });
  }
}
