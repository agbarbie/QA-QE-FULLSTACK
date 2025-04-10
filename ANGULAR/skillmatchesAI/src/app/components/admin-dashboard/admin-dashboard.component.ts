import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true, // Add this line
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  users: User[] = [
    {
      id: 1,
      name: 'Barbara Wangui',
      email: 'barbarawangul2002@gmail.com',
      role: 'Admin',
      status: 'Active'
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'User',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'User',
      status: 'Suspended'
    }
  ];

  aiPrompt: string = '';
  searchQuery: string = '';

  constructor(
    public router: Router, // Changed to public
    public authService: AuthService // Changed to public
  ) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login after logout
  }

  editUser(user: User): void {
    console.log('Editing user:', user.name);
  }

  toggleUserStatus(user: User): void {
    user.status = user.status === 'Active' ? 'Suspended' : 'Active';
    console.log(`User ${user.name} status changed to ${user.status}`);
  }

  addUser(): void {
    console.log('Adding new user');
  }

  searchUsers(): void {
    console.log('Searching for:', this.searchQuery);
  }

  sendAIPrompt(): void {
    console.log('AI Prompt:', this.aiPrompt);
    this.aiPrompt = ''; // Clear the input after sending
  }
}