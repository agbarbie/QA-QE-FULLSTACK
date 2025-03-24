import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.css']
})
export class TodoAppComponent {
  addMe: string = '';
  products: string[] = ["Milk", "Bread", "Cheese"];
  errorText: string = '';
  editIndex: number = -1; // -1 means no item is being edited
  editText: string = '';

  addItem(): void {
    this.errorText = '';
    if (!this.addMe.trim()) {
      return;
    }
    if (!this.products.includes(this.addMe)) {
      this.products.push(this.addMe);
    } else {
      this.errorText = 'The item is already in your shopping list.';
    }
    this.addMe = '';
  }

  removeItem(index: number): void {
    this.errorText = '';
    this.products.splice(index, 1);
  }

  editItem(index: number): void {
    this.editIndex = index;
    this.editText = this.products[index];
  }

  saveEdit(): void {
    if (this.editText.trim() !== '') {
      this.products[this.editIndex] = this.editText;
      this.editIndex = -1; // Exit edit mode
      this.editText = '';
    } else {
      this.errorText = 'The item cannot be empty';
    }
  }
}