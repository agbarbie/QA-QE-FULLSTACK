import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  // BehaviorSubject to hold and manage the jobs data
  private jobsSubject = new BehaviorSubject<any[]>([]);
  // Observable that components can subscribe to
  jobs$ = this.jobsSubject.asObservable();

  constructor() {}

  // Add a new job to the list
  addJob(job: any): void {
    const currentJobs = this.jobsSubject.value;
    this.jobsSubject.next([...currentJobs, job]);
  }

  // Get current jobs array
  getJobs(): any[] {
    return this.jobsSubject.value;
  }
}