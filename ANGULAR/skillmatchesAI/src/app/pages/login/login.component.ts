import { Component } from '@angular/core';
import { Router } from '@angular/router';
import{LoginModel} from '../../../interfaces/login'
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginModel: LoginModel = { email: '', password: '' };

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Logging in with', this.loginModel);
    // Simulate successful login and navigate to dashboard
    this.router.navigate(['/landing']);
  }
}
