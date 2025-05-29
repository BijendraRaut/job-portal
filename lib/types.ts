// Type definitions for the job board application

export type JobType = 'Full-time' | 'Part-time' | 'Contract';

export type Location = string;

export interface Job {
  id: string;
  title: string;
  description: string;
  location: Location;
  type: JobType;
  postedDate: string;
  company?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
  submittedAt: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}