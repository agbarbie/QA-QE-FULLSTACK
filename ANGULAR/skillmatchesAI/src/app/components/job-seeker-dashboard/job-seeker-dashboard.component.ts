import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobListing } from '../../../interfaces/job';
import { Skill } from '../../../interfaces/skills';
import { RecommendedSkill } from '../../../interfaces/recommendedskills';
import { CareerPathItem } from '../../../interfaces/careerpathitem';

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
  activeTab: string = 'job-matches';
  pathCompletion = 65;

  // Job Listings Data
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
    },
    {
      title: 'Angular Specialist',
      matchPercentage: 82,
      company: 'Web Solutions Ltd',
      location: 'Boston, MA',
      posted: '3 days ago'
    },
    {
      title: 'Full Stack Developer',
      matchPercentage: 78,
      company: 'InnovateTech',
      location: 'San Francisco, CA',
      posted: '1 day ago'
    }
  ];

  // Skills Analytics Data
  topSkills: Skill[] = [
    { name: 'Angular', level: 88, category: 'Frontend' },
    { name: 'TypeScript', level: 85, category: 'Programming' },
    { name: 'HTML/CSS', level: 92, category: 'Frontend' },
    { name: 'UI/UX Design', level: 76, category: 'Design' },
    { name: 'JavaScript', level: 90, category: 'Programming' },
    { name: 'RxJS', level: 68, category: 'Frontend' }
  ];

  recommendedSkills: RecommendedSkill[] = [
    { skill: 'React', demand: 72, jobMatches: 45, reason: 'Complementary to Angular for full-stack roles' },
    { skill: 'Node.js', demand: 65, jobMatches: 38, reason: 'Expands your backend capabilities' },
    { skill: 'GraphQL', demand: 58, jobMatches: 22, reason: 'Growing demand in API development' },
    { skill: 'AWS', demand: 61, jobMatches: 29, reason: 'Cloud skills increase job opportunities' }
  ];

  // Career Path Data
  careerPath: CareerPathItem[] = [
    {
      stage: 'current',
      title: 'Frontend Developer',
      timeline: '2 years experience',
      skills: ['Angular', 'TypeScript', 'UI/UX'],
      description: 'Your current position with strong frontend skills'
    },
    {
      stage: 'next',
      title: 'Senior Frontend Developer',
      timeline: 'Next 1-2 years',
      skills: ['Advanced Angular', 'State Management', 'Leadership'],
      matchPercentage: 75,
      description: 'Natural progression with your skill set'
    },
    {
      stage: 'future',
      title: 'Frontend Architect or Engineering Manager',
      timeline: '3-5 years',
      skills: ['System Design', 'Team Leadership', 'Technical Strategy'],
      description: 'Potential paths based on your development'
    }
  ];

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getMatchBadgeClass(percentage: number): string {
    if (percentage >= 90) return 'high-match';
    if (percentage >= 75) return 'medium-match';
    return 'low-match';
  }
  
  saveJob(job: JobListing): void {
    // Implement save job functionality
    console.log('Job saved:', job.title);
    // In a real app, you would call a service here
  }

  applyForJob(job: JobListing): void {
    // Implement apply job functionality
    console.log('Applied for:', job.title);
    // In a real app, you would call a service here
    this.router.navigate(['/job-application-form']);
  }

  navigateToJobs(): void {
    this.router.navigate(['/jobs']);
  }

  // Helper function to group skills by category
  getSkillsByCategory(category: string): Skill[] {
    return this.topSkills.filter(skill => skill.category === category);
  }

  // Calculate the average skill level
  getAverageSkillLevel(): number {
    const sum = this.topSkills.reduce((acc, skill) => acc + skill.level, 0);
    return Math.round(sum / this.topSkills.length);
  }
}