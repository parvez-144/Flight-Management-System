// app/services/booking.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private apiUrl = 'http://localhost:3000/api/bookings';

  constructor(private http: HttpClient) {}

  bookTicket(booking: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/book`, booking);
  }

  cancelBooking(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cancel/${id}`, {});
  }

  getHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/history`);
  }
}
