

// import { Injectable } from '@angular/core';
// import {
//   HttpClient,
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthService implements HttpInterceptor {
//   private apiUrl = 'http://localhost:3000/api/auth';

//   constructor(private http: HttpClient) {}

//  register(user: { 
//   username: string; 
//   email: string; 
//   password: string; 
//   phone: string; 
//   role: string; 
// }): Observable<any> {
//   return this.http.post(`${this.apiUrl}/register`, user);
// }


//  login(credentials: { username: string; password: string }): Observable<any> {
//   return this.http.post(`${this.apiUrl}/login`, credentials);
// }

//   saveToken(token: string) {
//     localStorage.setItem('token', token);
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   logout() {
//     localStorage.removeItem('token');
//   }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.getToken();
//     if (token) {
//       const cloned = req.clone({
//         headers: req.headers.set('Authorization', `Bearer ${token}`)
//       });
//       return next.handle(cloned);
//     }
//     return next.handle(req);
//   }
// }


import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService implements HttpInterceptor {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  register(user: {
    username: string;
    email: string;
    password: string;
    phone: string;
    role: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getToken();
    console.log('AuthInterceptor: token =', token, 'for request URL =', req.url);
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
