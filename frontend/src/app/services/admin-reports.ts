import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminReportService {
  private apiUrl = 'https://flight-management-system-xirn.onrender.com/api/reports';

  constructor(private http: HttpClient) {}

  getFlightOccupancy(scheduleId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/occupancy/${scheduleId}`);
  }

  getCancellations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cancellations`);
  }

  getRevenue(): Observable<any> {
    return this.http.get(`${this.apiUrl}/revenue`);
  }
}
