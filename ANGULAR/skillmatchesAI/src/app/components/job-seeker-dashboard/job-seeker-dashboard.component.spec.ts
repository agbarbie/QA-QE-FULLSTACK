import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobseekerDashboardComponent } from './job-seeker-dashboard.component';

describe('JobSeekerDashboardComponent', () => {
  let component: JobseekerDashboardComponent;
  let fixture: ComponentFixture<JobseekerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobseekerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobseekerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
