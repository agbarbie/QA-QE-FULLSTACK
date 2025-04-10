import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { Router ,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchQuality } from '../../../interfaces/analytics';
import { HiringActivity } from '../../../interfaces/analytics';
import { SkillGap } from '../../../interfaces/analytics';

// Register all Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements AfterViewInit {
  @ViewChild('hiringActivityChart') private chartRef!: ElementRef;
  private hiringChart: Chart | undefined;

  // Analytics data
  matchQualityData: MatchQuality[] = [
    { position: 'Senior Frontend', excellent: 15, good: 20, average: 10 },
    { position: 'Full Stack', excellent: 10, good: 25, average: 15 },
    { position: 'Backend', excellent: 8, good: 18, average: 12 }
  ];

  hiringActivityData: HiringActivity[] = [
    { month: 'Jan', applications: 120, interviews: 40, hires: 8 },
    { month: 'Feb', applications: 150, interviews: 45, hires: 10 },
    { month: 'Mar', applications: 180, interviews: 60, hires: 15 },
    { month: 'Apr', applications: 200, interviews: 70, hires: 20 }
  ];

  skillGapData: SkillGap[] = [
    { skill: 'React Native', demand: 'High', talentPool: 35, demandLevel: 3 },
    { skill: 'DevOps', demand: 'Very High', talentPool: 25, demandLevel: 4 },
    { skill: 'Machine Learning', demand: 'Medium', talentPool: 15, demandLevel: 2 }
  ];

  constructor(private router: Router) {}

  // Sort skills by demand level (descending)
  get sortedSkillGapData(): SkillGap[] {
    return [...this.skillGapData].sort((a, b) => (b.demandLevel || 0) - (a.demandLevel || 0));
  }

  ngAfterViewInit(): void {
    this.initHiringActivityChart();
  }

  private initHiringActivityChart(): void {
    if (!this.chartRef) return;

    const config: ChartConfiguration = {
      type: 'line' as ChartType,
      data: {
        labels: this.hiringActivityData.map(d => d.month),
        datasets: [
          {
            label: 'Applications',
            data: this.hiringActivityData.map(d => d.applications),
            borderColor: '#3F51B5',
            backgroundColor: 'rgba(63, 81, 181, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
          },
          {
            label: 'Interviews',
            data: this.hiringActivityData.map(d => d.interviews),
            borderColor: '#9C27B0',
            backgroundColor: 'rgba(156, 39, 176, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
          },
          {
            label: 'Hires',
            data: this.hiringActivityData.map(d => d.hires),
            borderColor: '#009688',
            backgroundColor: 'rgba(0, 150, 136, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (context) => {
                return `${context.dataset.label}: ${context.raw}`;
              }
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              precision: 0
            }
          }
        }
      }
    };

    this.hiringChart = new Chart(this.chartRef.nativeElement, config);
  }

  // Navigation to candidates page
  navigateToCandidates(): void {
    this.router.navigate(['/candidates'], {
      queryParams: {
        filter: 'high-quality',
        minMatch: 75
      }
    });
  }

  // Calculate total excellent matches
  get totalExcellentMatches(): number {
    return this.matchQualityData.reduce((sum, item) => sum + item.excellent, 0);
  }

  // Calculate total good matches
  get totalGoodMatches(): number {
    return this.matchQualityData.reduce((sum, item) => sum + item.good, 0);
  }

  // Calculate total average matches
  get totalAverageMatches(): number {
    return this.matchQualityData.reduce((sum, item) => sum + item.average, 0);
  }

  ngOnDestroy(): void {
    if (this.hiringChart) {
      this.hiringChart.destroy();
    }
  }
 
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}