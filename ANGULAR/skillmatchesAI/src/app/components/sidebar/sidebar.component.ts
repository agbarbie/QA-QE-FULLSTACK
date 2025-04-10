import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isAdmin: boolean = false;

  constructor(private router: Router) {
    // Simulate checking if the user is an admin
    this.isAdmin = localStorage.getItem('role') === 'admin';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
