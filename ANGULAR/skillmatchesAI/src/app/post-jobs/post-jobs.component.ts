import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { JobsService } from '../services/services/job.service';

@Component({
  selector: 'app-post-jobs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './post-jobs.component.html',
  styleUrls: ['./post-jobs.component.css']
})
export class PostJobsComponent {
  jobForm!: FormGroup;
  jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  commonSkills = ['JavaScript', 'Angular', 'TypeScript', 'HTML', 'CSS', 'Node.js'];

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private jobsService: JobsService
  ) {
    this.initializeForm();
  }

  // Initialize the form with validation
  private initializeForm(): void {
    this.jobForm = this.fb.group({
      jobTitle: ['', [Validators.required, Validators.minLength(5)]],
      jobDescription: ['', [Validators.required, Validators.minLength(20)]],
      requirements: ['', [Validators.required, Validators.minLength(20)]],
      salaryRange: ['', Validators.required],
      location: ['', Validators.required],
      jobType: ['Full-time', Validators.required]
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.jobForm.valid) {
      const newJob = this.createJobObject();
      this.jobsService.addJob(newJob);
      this.resetAndNavigate();
    } else {
      this.jobForm.markAllAsTouched();
    }
  }

  // Create job object from form data
  private createJobObject(): any {
    return {
      title: this.jobForm.value.jobTitle,
      description: this.jobForm.value.jobDescription,
      requirements: this.jobForm.value.requirements,
      salaryRange: this.jobForm.value.salaryRange,
      location: this.jobForm.value.location,
      jobType: this.jobForm.value.jobType,
      company: 'Your Company',
      skills: this.extractSkills(this.jobForm.value.requirements),
      starred: false
    };
  }

  // Extract skills from requirements text
  private extractSkills(requirements: string): string[] {
    return this.commonSkills.filter(skill => 
      requirements.toLowerCase().includes(skill.toLowerCase())
    );
  }

  // Reset form and navigate to jobs page
  private resetAndNavigate(): void {
    this.jobForm.reset({
      jobType: 'Full-time'
    });
    this.router.navigate(['/jobs']);
  }

  // Cancel and navigate back
  onCancel(): void {
    this.resetAndNavigate();
  }

  // General navigation method
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}