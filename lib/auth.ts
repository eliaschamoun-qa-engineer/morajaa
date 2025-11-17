// Simple authentication helper using localStorage
// In production, this would use proper authentication (JWT, sessions, etc.)

export interface User {
  id: string;
  name: string;
  email?: string;
}

const USER_STORAGE_KEY = 'morajaa_user';

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const userStr = localStorage.getItem(USER_STORAGE_KEY);
    if (userStr) {
      return JSON.parse(userStr);
    }
  } catch (error) {
    console.error('Error reading user from storage:', error);
  }
  return null;
}

export function setCurrentUser(user: User): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user to storage:', error);
  }
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_STORAGE_KEY);
}

export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}

// Simple login function (in production, this would verify credentials)
export function login(name: string, email?: string): User {
  const user: User = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    name,
    email,
  };
  setCurrentUser(user);
  return user;
}

