import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationForm } from './job-application-form.component';

describe('JobApplicationFormComponent', () => {
  let component: JobApplicationForm;
  let fixture: ComponentFixture<JobApplicationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplicationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplicationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
