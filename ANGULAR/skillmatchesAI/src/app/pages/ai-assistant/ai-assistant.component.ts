import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.css']
})
export class AiAssistantComponent implements AfterViewChecked {
  @ViewChild('employerMessagesContainer') employerMessagesEl!: ElementRef;
  @ViewChild('employeeMessagesContainer') employeeMessagesEl!: ElementRef;

  employerMessage = '';
  employeeMessage = '';
  
  employerMessages: any[] = [
    { text: 'Hello! How can I assist with your hiring needs today?', isUser: false, time: new Date() }
  ];
  
  employeeMessages: any[] = [
    { text: 'Hi there! How can I help with your job search or career questions?', isUser: false, time: new Date() }
  ];

  constructor(private router: Router) {}

  ngAfterViewChecked() {
    this.scrollToBottom(this.employerMessagesEl);
    this.scrollToBottom(this.employeeMessagesEl);
  }

  scrollToBottom(element: ElementRef) {
    try {
      element.nativeElement.scrollTop = element.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendEmployerMessage() {
    if (this.employerMessage.trim()) {
      this.employerMessages.push({
        text: this.employerMessage,
        isUser: true,
        time: new Date()
      });

      setTimeout(() => {
        this.employerMessages.push({
          text: 'Thanks for your message! Here are some resources that might help...',
          isUser: false,
          time: new Date()
        });
      }, 1000);

      this.employerMessage = '';
    }
  }

  sendEmployeeMessage() {
    if (this.employeeMessage.trim()) {
      this.employeeMessages.push({
        text: this.employeeMessage,
        isUser: true,
        time: new Date()
      });

      setTimeout(() => {
        this.employeeMessages.push({
          text: 'I can help with that! Here are some job opportunities that match your skills...',
          isUser: false,
          time: new Date()
        });
      }, 1000);

      this.employeeMessage = '';
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
