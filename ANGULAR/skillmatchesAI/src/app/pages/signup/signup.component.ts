import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupModel } from '../../../interfaces/signup';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupModel: SignupModel = { name: '', email: '', password: '', confirmPassword: '', role: 'jobseeker' };

  constructor(private router: Router) {}

  onSubmit() {
    if (this.signupModel.password === this.signupModel.confirmPassword) {
      console.log('User signed up:', this.signupModel);
      this.router.navigate(['/login']);
    } else {
      alert('Passwords do not match!');
    }
  }
}
