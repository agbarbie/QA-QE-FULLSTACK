import { TestBed } from '@angular/core/testing';
import { TodoAppComponent } from './todo-app/todo-app.component'; // ✅ Update the import path
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule

describe('TodoAppComponent', () => { // ✅ Update the description to match the component
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, TodoAppComponent], // ✅ Add FormsModule and TodoAppComponent
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TodoAppComponent); // ✅ Use TodoAppComponent
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have an initial list of products', () => {
    const fixture = TestBed.createComponent(TodoAppComponent); // ✅ Use TodoAppComponent
    const app = fixture.componentInstance;
    expect(app.products).toEqual(['Milk', 'Bread', 'Cheese']); // ✅ Check the initial products
  });

  it('should render the title correctly', () => {
    const fixture = TestBed.createComponent(TodoAppComponent); // ✅ Use TodoAppComponent
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Todo List App'); // ✅ Check the correct title
  });
});