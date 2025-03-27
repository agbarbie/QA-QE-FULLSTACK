import { bootstrapApplication } from '@angular/platform-browser';
import { JobApplicationComponent } from './app/job-application-form/job-application-form.component';

bootstrapApplication(JobApplicationComponent)
  .catch(err => console.error(err));
