import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-application',
  standalone: true, // Standalone component
  imports: [CommonModule, ReactiveFormsModule], // Import required modules directly
  templateUrl: './job-application-form.component.html',
  styleUrls: ['./job-application-form.component.css']
})
export class JobApplicationComponent implements OnInit {
  jobForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.jobForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      skills: this.fb.array([])
    });
  }

  // Getter for easy access to skills form array
  get skills() {
    return this.jobForm.get('skills') as FormArray;
  }

  // Method to add a new skill input
  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  // Method to remove a skill at a specific index
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // Method to handle form submission
  submitForm() {
    if (this.jobForm.valid) {
      console.log(this.jobForm.value);
      // Here you would typically send the form data to a server
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.jobForm);
    }
  }

  // Helper method to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}