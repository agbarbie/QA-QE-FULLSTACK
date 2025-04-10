import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobListing } from '../../../interfaces/job';

@Component({
  selector: 'app-job-seeker-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './job-seeker-dashboard.component.html',
  styleUrls: ['./job-seeker-dashboard.component.css']
})
export class JobseekerDashboardComponent {
  profileCompletion = 75;
  jobMatches = 24;
  interviewRequests = 3;
  activeTab: string = 'portfolio';
  activeSubTab: string = 'skills-analysis';

  jobListings: JobListing[] = [
    {
      title: 'Senior Frontend Developer',
      matchPercentage: 95,
      company: 'TechCorp Inc.',
      location: 'Remote',
      posted: '2 days ago'
    },
    {
      title: 'UI/UX Designer',
      matchPercentage: 89,
      company: 'Design Studio',
      location: 'New York, NY',
      posted: '1 week ago'
    }
  ];

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  setActiveSubTab(subTab: string): void {
    this.activeSubTab = subTab;
  }

  getMatchBadgeClass(percentage: number): string {
    if (percentage >= 90) return 'high-match';
    if (percentage >= 75) return 'medium-match';
    return 'low-match';
  }
  
  saveJob(job: JobListing): void {
    // Implement save job functionality
    console.log('Job saved:', job.title);
  }

  applyForJob(job: JobListing): void {
    // Implement apply job functionality
    console.log('Applied for:', job.title);
  }
  navigateToJobs() {
    // Navigate to the jobs page
    this.router.navigate(['/jobs']);
  }
}