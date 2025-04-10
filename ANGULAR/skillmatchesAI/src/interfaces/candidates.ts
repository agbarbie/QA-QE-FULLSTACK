export interface Candidate {
    name: string;
    role: string;
    experience: string;
    skills: string[];
    status: 'New' | 'Reviewed' | 'Interviewing';
    matchPercentage: number;
  }