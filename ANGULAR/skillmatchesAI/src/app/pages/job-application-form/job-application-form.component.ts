// job-application-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormBuilder, 
  FormGroup, 
  FormArray, 
  FormControl,
  Validators, 
  ReactiveFormsModule 
} from '@angular/forms';

@Component({
  selector: 'app-job-application-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-application-form.component.html',
  styleUrls: ['./job-application-form.component.css']
})
export class JobApplicationForm implements OnInit {
  applicationForm!: FormGroup;
  selectedCVFile: File | null = null;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.applicationForm = this.fb.group({
      personalInfo: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
      }),
      educationInfo: this.fb.group({
        highSchool: [''],
        degree: [''],
        college: ['']
      }),
      skills: this.fb.array([]),
      workExperience: [''],
      portfolioUrl: ['']
    });
  }
  
  get skills(): FormArray {
    return this.applicationForm.get('skills') as FormArray;
  }
  
  addSkill() {
    this.skills.push(new FormControl('', Validators.required));
  }
  
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedCVFile = file;
    }
  }
  
  submitApplication() {
    if (this.applicationForm.valid) {
      const formData = {
        ...this.applicationForm.value,
        cv: this.selectedCVFile
      };
      console.log('Submitting application:', formData);
      // Here you would typically send the data to your backend
    } else {
      // Mark all fields as touched to trigger validation messages
      this.markFormGroupTouched(this.applicationForm);
    }
  }
  
  // Helper method to mark all controls in a form group as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}