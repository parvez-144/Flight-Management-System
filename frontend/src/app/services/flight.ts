import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FlightSearchParams {
  source: string;
  destination: string;
  date: string;
  airline?: string;
}

@Injectable({ providedIn: 'root' })
export class FlightService {
  private apiUrl = 'https://flight-management-system-xirn.onrender.com/api/schedules';

  constructor(private http: HttpClient) {}

  getSchedules(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  searchFlights(params: FlightSearchParams): Observable<any[]> {
    let httpParams = new HttpParams()
      .set('source', params.source)
      .set('destination', params.destination)
      .set('date', params.date);

    if (params.airline && params.airline.trim() !== '') {
      httpParams = httpParams.set('airline', params.airline);
    }

    return this.http.get<any[]>(`${this.apiUrl}/search`, { params: httpParams });
  }
}
