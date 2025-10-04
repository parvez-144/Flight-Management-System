// app/auth/login.ts

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/home']);
      },
      error: err => alert(err.error?.message || 'Login failed')
    });
  }
}
