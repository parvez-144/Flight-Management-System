

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private apiUrl = 'http://3.88.211.167:3000/api/bookings';

  constructor(private http: HttpClient) { }

  bookTicket(bookingData: { scheduleId: string; seats: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/book`, bookingData);
  }

  cancelBooking(bookingId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/cancel/${bookingId}`, {});
  }

  getHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/history`);
  }
  getBookingsByUser(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }
  getAllBookings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

}
