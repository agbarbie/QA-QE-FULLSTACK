export interface MatchQuality {
    position: string;
    excellent: number;
    good: number;
    average: number;
  }
  
  export interface HiringActivity {
    month: string;
    applications: number;
    interviews: number;
    hires: number;
  }
  
  export interface SkillGap {
    skill: string;
    demand: string;
    talentPool: number;
    demandLevel?: number; // For sorting/visualization
  }
  