import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-bookings.html',
  styleUrls: ['./admin-bookings.css']
})
export class AdminBookingsComponent {
  userId = '';
  bookings: any[] = [];
  loading = false;
  errorMsg = '';
  filterMode: 'ALL' | 'USER' = 'ALL';

  constructor(private bookingService: BookingService) {}

  loadBookings() {
    this.loading = true;
    this.errorMsg = '';
    this.bookings = [];

    const request =
      this.filterMode === 'USER' && this.userId.trim()
        ? this.bookingService.getBookingsByUser(this.userId)
        : this.bookingService.getAllBookings();

    request.subscribe({
      next: (res) => {
        this.bookings = res.bookings || res || [];
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Error fetching bookings';
        this.loading = false;
      }
    });
  }

  switchMode(mode: 'ALL' | 'USER') {
    this.filterMode = mode;
    if (mode === 'ALL') {
      this.userId = '';
      this.loadBookings();
    }
  }
}
