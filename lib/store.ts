import { Job, JobApplication } from './types';

// Initialize localStorage with mock data on client-side
export const initializeStore = () => {
  if (typeof window === 'undefined') return;

  // Check if jobs already exist in localStorage
  if (!localStorage.getItem('jobs')) {
    const mockJobs: Job[] = [
      {
        id: '1',
        title: 'Frontend Developer',
        description: 'We are looking for a skilled Frontend Developer to join our team. The ideal candidate should have experience with React, TypeScript, and responsive web design.',
        location: 'San Francisco, CA',
        type: 'Full-time',
        postedDate: new Date('2025-02-15').toISOString(),
        company: 'TechCorp Inc.'
      },
      {
        id: '2',
        title: 'UX Designer',
        description: 'Join our design team to create beautiful and intuitive user experiences. You should have a portfolio demonstrating your design skills and experience with Figma.',
        location: 'Remote',
        type: 'Full-time',
        postedDate: new Date('2025-02-20').toISOString(),
        company: 'DesignHub'
      },
      {
        id: '3',
        title: 'Backend Engineer',
        description: 'We need a talented Backend Engineer with experience in Node.js, Express, and database design. Knowledge of cloud platforms is a plus.',
        location: 'New York, NY',
        type: 'Full-time',
        postedDate: new Date('2025-02-25').toISOString(),
        company: 'ServerStack'
      },
      {
        id: '4',
        title: 'Content Writer',
        description: 'Looking for a creative Content Writer to produce engaging content for our marketing campaigns. Experience in technology writing is preferred.',
        location: 'Chicago, IL',
        type: 'Part-time',
        postedDate: new Date('2025-03-01').toISOString(),
        company: 'ContentKing'
      },
      {
        id: '5',
        title: 'Mobile Developer',
        description: 'Develop mobile applications for iOS and Android platforms. Experience with React Native or Flutter is required.',
        location: 'Austin, TX',
        type: 'Contract',
        postedDate: new Date('2025-03-05').toISOString(),
        company: 'AppWorks'
      }
    ];

    localStorage.setItem('jobs', JSON.stringify(mockJobs));
  }

  // Check if applications already exist in localStorage
  if (!localStorage.getItem('applications')) {
    localStorage.setItem('applications', JSON.stringify([]));
  }

  // Set admin credentials
  if (!localStorage.getItem('admin')) {
    const adminCredentials = {
      username: 'admin',
      password: 'password123'
    };
    localStorage.setItem('admin', JSON.stringify(adminCredentials));
  }
};

// Job CRUD operations
export const getJobs = (): Job[] => {
  if (typeof window === 'undefined') return [];
  const jobs = localStorage.getItem('jobs');
  return jobs ? JSON.parse(jobs) : [];
};

export const getJob = (id: string): Job | undefined => {
  const jobs = getJobs();
  return jobs.find(job => job.id === id);
};

export const createJob = (job: Omit<Job, 'id'>): Job => {
  const jobs = getJobs();
  const newJob: Job = {
    ...job,
    id: Date.now().toString(),
  };
  localStorage.setItem('jobs', JSON.stringify([...jobs, newJob]));
  return newJob;
};

export const updateJob = (job: Job): Job => {
  const jobs = getJobs();
  const updatedJobs = jobs.map(j => j.id === job.id ? job : j);
  localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  return job;
};

export const deleteJob = (id: string): void => {
  const jobs = getJobs();
  const filteredJobs = jobs.filter(job => job.id !== id);
  localStorage.setItem('jobs', JSON.stringify(filteredJobs));
};

// Application operations
export const getApplications = (): JobApplication[] => {
  if (typeof window === 'undefined') return [];
  const applications = localStorage.getItem('applications');
  return applications ? JSON.parse(applications) : [];
};

export const getApplicationsForJob = (jobId: string): JobApplication[] => {
  const applications = getApplications();
  return applications.filter(app => app.jobId === jobId);
};

export const createApplication = (application: Omit<JobApplication, 'id' | 'submittedAt'>): JobApplication => {
  const applications = getApplications();
  const newApplication: JobApplication = {
    ...application,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString()
  };
  localStorage.setItem('applications', JSON.stringify([...applications, newApplication]));
  return newApplication;
};

// Admin authentication
export const validateAdmin = (username: string, password: string): boolean => {
  if (typeof window === 'undefined') return false;
  const admin = localStorage.getItem('admin');
  if (!admin) return false;
  
  const adminCredentials = JSON.parse(admin);
  return adminCredentials.username === username && adminCredentials.password === password;
};