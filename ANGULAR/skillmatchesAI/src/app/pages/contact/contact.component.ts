import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  imports: [CommonModule, RouterModule, FormsModule,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  candidate = {
    name: 'Alex Johnson',
    phone: '+254 12345678',
    email: 'alex.johnson@email.com',
    avatar: 'assets/images/alex-johnson-avatar.jpg' // Add your image asset
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.contactForm = this.fb.group({
      yourName: ['', [Validators.required]],
      yourEmail: ['', [Validators.required, Validators.email]],
      yourPhone: [''],
      preferredDate: [''],
      preferredTime: [''],
      message: ['']
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // Add your form submission logic here
      this.router.navigate(['/home']);
    }
  }
}