import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Candidate } from '../../../interfaces/candidates';

@Component({
  selector: 'app-candidates-overview',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent {
  candidates: Candidate[] = [
    {
      name: 'Sarah Johnson',
      role: 'Frontend Developer',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'UI/UX'],
      status: 'New',
      matchPercentage: 95
    },
    {
      name: 'Michael Chen',
      role: 'Full Stack Engineer',
      experience: '3 years',
      skills: ['Node.js', 'React', 'Python', 'SQL'],
      status: 'Reviewed',
      matchPercentage: 88
    },
    {
      name: 'Emily Rodriguez',
      role: 'Software Engineer',
      experience: '4 years',
      skills: ['Java', 'Spring', 'SQL'],
      status: 'Interviewing',
      matchPercentage: 82
    }
  ];

  statusFilter: string = 'All';
  searchQuery: string = '';

  constructor(private router: Router) {}

  get filteredCandidates(): Candidate[] {
    return this.candidates.filter(candidate => {
      const matchesStatus = this.statusFilter === 'All' || candidate.status === this.statusFilter;
      const matchesSearch = candidate.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           candidate.role.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           candidate.skills.some(skill => skill.toLowerCase().includes(this.searchQuery.toLowerCase()));
      return matchesStatus && matchesSearch;
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  exportData(): void {
    // Implement export functionality
    console.log('Exporting candidate data...');
  }
  
  getMatchColor(matchPercentage: number): string {
    if (matchPercentage >= 80) {
      return 'green';
    } else if (matchPercentage >= 50) {
      return 'orange';
    } else {
      return 'red';
    }
  }
}