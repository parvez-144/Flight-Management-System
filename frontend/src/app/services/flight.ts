// app/services/flight.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FlightService {
  private apiUrl = 'http://localhost:3000/api/schedules';

  constructor(private http: HttpClient) {}

  getSchedules(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  searchFlights(params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/search`, { params });
  }
}
