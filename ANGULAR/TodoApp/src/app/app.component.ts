import { Component } from '@angular/core';
import { TodoAppComponent } from './todo-app/todo-app.component';

@Component({
  selector: 'app-root',
  imports: [TodoAppComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TodoApp';
}
