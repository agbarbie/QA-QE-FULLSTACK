import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // Corrected this from 'styleUrl' to 'styleUrls'
})
export class HomeComponent implements OnInit {
  data: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    fetch('http://localhost:5000/1')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          throw new Error('Expected JSON, but received: ' + contentType);
        }
      })
      .then(data => {
        console.log('Fetched data:', data);  // Log the data
        this.data = Array.isArray(data) ? data : [];  // Ensure it's an array
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  
}
 