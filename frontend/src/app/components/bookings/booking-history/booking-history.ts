import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BookingService } from '../../../services/booking';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './booking-history.html',
  styleUrls: ['./booking-history.css']
})
export class BookingHistoryComponent implements OnInit {
  bookings: any[] = [];
  loading = true;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.fetchHistory();
  }

  fetchHistory() {
    this.loading = true;
    this.bookingService.getHistory().subscribe({
      next: data => {
        this.bookings = data.bookings || [];
        this.loading = false;
      },
      error: err => {
        console.error('Error fetching booking history', err);
        alert(err.error?.message || 'Could not fetch booking history');
        this.loading = false;
      }
    });
  }

  cancel(id: string) {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    this.bookingService.cancelBooking(id).subscribe({
      next: () => {
        alert('Booking canceled successfully');
        this.fetchHistory(); // refresh list
      },
      error: err => {
        console.error('Cancel error', err);
        alert(err.error?.message || 'Cancel failed');
      }
    });
  }
}
