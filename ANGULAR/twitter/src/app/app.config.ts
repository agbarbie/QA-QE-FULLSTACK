import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

// You'll need to create this routes file if it doesn't exist
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    // Enable zone-less change detection with event coalescing
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Set up routing
    provideRouter(routes),
    
    // Enable HTTP client
    provideHttpClient(),
    
    // Enable client-side hydration with event replay
    provideClientHydration(withEventReplay())
  ]
};