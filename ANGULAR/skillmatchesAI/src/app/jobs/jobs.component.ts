import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  imports: [CommonModule, FormsModule],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {
  jobs = [
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

  filteredJobs = [...this.jobs]; // Initially display all jobs

  constructor(private router: Router) {}

  toggleStar(job: any) {
    job.starred = !job.starred;
  }

  // Filter functionality (e.g., filter by location or skills)
  toggleFilter() {
    // Example of filtering jobs by location. You can expand this to include other filters like skills or salary range.
    this.filteredJobs = this.jobs.filter(job => job.location === 'San Francisco, CA');
  }

  // Export job data functionality (for now it just logs to the console)
  exportData() {
    console.log('Exporting job data...');
    // You could implement actual export functionality (e.g., CSV export, JSON download, etc.)
  }

  // Navigation function to different routes
  navigateTo(page: string) {
    this.router.navigate([`${page}`]);
  }
}
