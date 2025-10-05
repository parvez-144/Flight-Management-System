import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminFlightService {
  private apiUrl = 'https://flight-management-system-xirn.onrender.com/api/flights';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addFlight(flight: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, flight);
  }


  updateFlight(id: string, flight: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, flight);
  }

  deleteFlight(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
