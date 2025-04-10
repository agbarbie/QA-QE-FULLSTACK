import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  isLoggedIn(): boolean {
    return this.isAuthenticated;
    // In a real app, check for valid token
  }

  login(): void {
    this.isAuthenticated = true;
  }

  logout(): void {
    this.isAuthenticated = false;
  }
}