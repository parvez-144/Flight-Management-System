

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html'
})
export class RegisterComponent {
  user = {
  username: '',
  password: '',
  email: '',
  phone: '',
  role: ''    // e.g. “ADMIN” or “PASSENGER”
};


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

 register() {
  this.authService.register(this.user).subscribe({
    next: res => {
      alert('Registration successful!');
      this.router.navigate(['/login']);
    },
    error: err => {
      console.error('Registration error:', err);
      alert(err.error?.message || 'Registration failed');
    }
  });
}

}
