export interface SignupModel {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'jobseeker' | 'employer' | 'admin'; 
  }
  