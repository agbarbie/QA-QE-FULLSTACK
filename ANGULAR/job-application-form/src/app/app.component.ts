import { Component } from '@angular/core';
import { JobApplicationComponent } from "./job-application-form/job-application-form.component";

@Component({
  selector: 'app-root',
  imports: [ JobApplicationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'job-application-form';
}
