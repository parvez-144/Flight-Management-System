// // app/app.config.ts

// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// import { appRoutes } from './app.routes';

// import { AuthService } from './services/auth';
// import { FlightService } from './services/flight';
// import { BookingService } from './services/booking';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     // HTTP setup, enabling interceptors from DI
//     provideHttpClient(withInterceptorsFromDi()),

//     // Routing
//     provideRouter(appRoutes),

//     // Services
//     AuthService,
//     FlightService,
//     BookingService
//   ]
// };



// app/app.config.ts

// app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { appRoutes } from './app.routes';

import { AuthService } from './services/auth';
import { FlightService } from './services/flight';
import { BookingService } from './services/booking';

export const appConfig: ApplicationConfig = {
  providers: [
    // Setup HTTP client with DI interceptors
    provideHttpClient(withInterceptorsFromDi()),

    // Also register the class‐based interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true
    },

    // Router
    provideRouter(appRoutes),

    // Services
    AuthService,
    FlightService,
    BookingService
  ]
};
