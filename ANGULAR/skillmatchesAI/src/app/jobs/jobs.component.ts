import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobsService } from '../services/services/job.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  // Default jobs that are always shown
  private defaultJobs = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salaryRange: '$140,000 - $180,000',
      description: 'Looking for an experienced frontend developer with strong React skills',
      skills: ['5+ years React', 'TypeScript', 'UI/UX experience'],
      starred: false
    },
    {
      title: 'Full Stack Engineer',
      company: 'InnovateSoft',
      location: 'New York, NY',
      salaryRange: '$130,000 - $160,000',
      description: 'Join our dynamic team building next-gen web applications',
      skills: ['Node.js', 'Python', 'AWS'],
      starred: false
    },
    {
      title: 'Software Engineer',
      company: 'DataFlow',
      location: 'Remote',
      salaryRange: '$120,000 - $150,000',
      description: 'Help build scalable backend services and APIs',
      skills: ['Java', 'Spring', 'SQL'],
      starred: false
    }
  ];

  filteredJobs: any[] = [];
  showAllJobs = true;
  filterLocation = '';

  constructor(
    private router: Router,
    private jobsService: JobsService
  ) {}

  ngOnInit(): void {
    this.loadJobs();
    
    // Subscribe to jobs service updates
    this.jobsService.jobs$.subscribe(() => {
      this.loadJobs();
    });
  }

  // Load both default and posted jobs
  private loadJobs(): void {
    const postedJobs = this.jobsService.getJobs();
    this.filteredJobs = [...this.defaultJobs, ...postedJobs];
    
    // Apply current filter if active
    if (!this.showAllJobs && this.filterLocation) {
      this.applyFilter();
    }
  }

  // Toggle star on a job
  toggleStar(job: any): void {
    job.starred = !job.starred;
  }

  // Toggle between showing all jobs and filtered jobs
  toggleFilter(): void {
    this.showAllJobs = !this.showAllJobs;
    if (!this.showAllJobs) {
      this.filterLocation = 'San Francisco, CA';
      this.applyFilter();
    } else {
      this.loadJobs();
    }
  }

  // Apply location filter
  private applyFilter(): void {
    this.filteredJobs = [...this.defaultJobs, ...this.jobsService.getJobs()]
      .filter(job => job.location === this.filterLocation);
  }

  // Export job data (currently logs to console)
  exportData(): void {
    console.log('Exporting job data:', this.filteredJobs);
    // In a real app, implement CSV/JSON export here
  }

  // Navigate to different pages
  navigateTo(page: string): void {
    this.router.navigate([page]);
  }
}