import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminReportService {
  private apiUrl = 'http://3.88.211.167:3000/api/reports';

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
