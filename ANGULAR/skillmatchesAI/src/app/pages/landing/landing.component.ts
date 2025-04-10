import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  constructor(public router: Router) {}

  // Navigation methods
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  // Specific navigation methods for buttons that might need additional logic
  navigateToLogin(): void {
    this.navigateTo('/login');
  }

  navigateToSignup(): void {
    this.navigateTo('/signup');
  }

  navigateToJobSeekers(): void {
    this.navigateTo('/jobseeker-dashboard');
  }

  navigateToEmployers(): void {
    this.navigateTo('/employer-dashboard');
  }
}