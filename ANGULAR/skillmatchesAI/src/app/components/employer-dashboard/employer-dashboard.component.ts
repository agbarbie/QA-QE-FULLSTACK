import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Candidate } from '../../../interfaces/view-candidates';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css']
})
export class EmployerDashboardComponent {
  activeJobPostings = 8;
  newCandidates = 3;
  candidateMatches = 42;
  newMatchesThisWeek = 12;
  interviewsScheduled = 5;
  nextInterviewIn = '2 days';
  activeTab: string = 'dashboard';
  activeSubTab: string = 'ai-matched';

  candidates: Candidate[] = [
    {
      name: 'Alex Johnson',
      position: 'Senior Frontend Developer',
      experience: '6 years experience',
      skills: ['React', 'TypeScript', 'UI/UX'],
      matchPercentage: 92
    },
    {
      name: 'Jamie Smith',
      position: 'Full Stack Engineer',
      experience: '4 years experience',
      skills: ['Node.js', 'React', 'MongoDB'],
      matchPercentage: 88
    }
  ];

  
  constructor(
    private router: Router,
    public authService: AuthService
  ) {}

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

  viewCandidateProfile(candidate: Candidate): void {
    console.log('Viewing profile:', candidate.name);
    // Implement navigation to profile page
  }

  contactCandidate(candidate: Candidate): void {
    console.log('Contacting:', candidate.name);
    // Implement contact functionality
  }

  logout(): void {
    this.authService.logout();
  }
}