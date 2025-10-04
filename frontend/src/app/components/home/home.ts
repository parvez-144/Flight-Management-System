// // app/home/home.ts

// import { Component } from '@angular/core';
// import { Router, RouterLink } from '@angular/router';
// import { AuthService } from '../../services/auth';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CommonModule,RouterLink],
//   templateUrl: './home.html',
//   styleUrls: ['./home.css']
// })
// export class Home {
//   constructor(private authService: AuthService, private router: Router) {}

//   logout() {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }
// }


import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']   // include CSS file
})
export class Home {
  constructor(
    public authService: AuthService,  // make public so template can use it
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
