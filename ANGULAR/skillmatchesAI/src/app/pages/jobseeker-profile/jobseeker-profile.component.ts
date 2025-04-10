import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jobseeker-profile',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './jobseeker-profile.component.html',
  styleUrls: ['./jobseeker-profile.component.css']
})
export class JobSeekerProfileComponent {
  showContactInfo = false;
  
  candidate = {
    name: 'Sarah Johnson',
    title: 'Senior Software Developer',
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@example.com',
      linkedin: 'linkedin.com/in/sarahjohnson'
    },
    skills: [
      { name: 'JavaScript', proficiency: 90 },
      { name: 'Python', proficiency: 85 },
      { name: 'React', proficiency: 95 },
      { name: 'Node.js', proficiency: 88 },
      { name: 'UI/UX Design', proficiency: 75 },
      { name: 'Project Management', proficiency: 80 }
    ],
    experience: [
      {
        role: 'Senior Developer',
        company: 'Tech Innovations Inc.',
        duration: '2020 - Present',
        description: 'Lead a team of 5 developers building enterprise SaaS solutions.'
      },
      {
        role: 'Software Engineer',
        company: 'Digital Creations',
        duration: '2018 - 2020',
        description: 'Developed full-stack web applications using React and Node.js.'
      }
    ],
    education: [
      {
        degree: 'M.Sc. Computer Science',
        institution: 'Stanford University',
        year: '2018'
      },
      {
        degree: 'B.Sc. Software Engineering',
        institution: 'MIT',
        year: '2016'
      }
    ],
    summary: `Experienced software developer with 5+ years of expertise in full-stack development. 
    Passionate about creating efficient, scalable solutions and leading development teams. 
    Strong focus on modern web technologies and best practices in software development. 
    Proven track record of delivering high-impact projects on time and within budget.`
  };

  constructor(private router: Router) {}

  toggleContactInfo() {
    this.showContactInfo = !this.showContactInfo;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}