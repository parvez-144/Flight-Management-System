import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminScheduleService {
  private apiUrl = 'http://3.88.211.167:3000/api/schedules';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addSchedule(schedule: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, schedule);
  }

  updateSchedule(id: string, schedule: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, schedule);
  }

  deleteSchedule(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
