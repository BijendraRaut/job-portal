import { AdminCredentials } from './types';

// Check if user is authenticated (has valid token in localStorage)
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('adminToken') !== null;
};

// Login function - store auth token in localStorage
export const login = (credentials: AdminCredentials): boolean => {
  if (typeof window === 'undefined') return false;
  
  // In a real app, this would validate against a backend
  // For this mock version, we check against hardcoded credentials
  const storedAdmin = localStorage.getItem('admin');
  
  if (!storedAdmin) return false;
  
  const adminCredentials = JSON.parse(storedAdmin);
  
  if (
    credentials.username === adminCredentials.username && 
    credentials.password === adminCredentials.password
  ) {
    // Store a simple token (in a real app, this would be a JWT)
    localStorage.setItem('adminToken', 'mock-auth-token');
    return true;
  }
  
  return false;
};

// Logout function - remove auth token from localStorage
export const logout = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('adminToken');
};