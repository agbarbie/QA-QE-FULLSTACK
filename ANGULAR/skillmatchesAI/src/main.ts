import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { FormsModule } from '@angular/forms'; // ✅ Add this

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(FormsModule), // ✅ Add this line
    provideRouter(routes),
  ],
});
