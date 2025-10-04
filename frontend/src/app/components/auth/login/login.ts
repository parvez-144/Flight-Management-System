



import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';  // adjust path
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (res: any) => {
        console.log('Login response:', res);
        if (res.token) {
          console.log('Saving token:', res.token);
          this.authService.saveToken(res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          console.log('Token in localStorage:', localStorage.getItem('token'));
          this.router.navigate(['/home']);
        } else {
          alert('No token returned from login');
        }
      },
      error: err => {
        console.error('Login error:', err);
        alert(err.error?.message || 'Login failed');
      }
    });
  }
}
