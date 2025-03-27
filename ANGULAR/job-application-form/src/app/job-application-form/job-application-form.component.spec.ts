import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationFormComponent } from './job-application-form.component';

describe('JobApplicationFormComponent', () => {
  let component: JobApplicationFormComponent;
  let fixture: ComponentFixture<JobApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplicationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
