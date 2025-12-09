// Authentication API calls
import api from './client';
import type { User, LoginCredentials, RegisterData } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export async function login(credentials: LoginCredentials): Promise<User> {
  // Django session auth uses form POST
  const formData = new URLSearchParams();
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);

  const response = await fetch(`${API_BASE}/api-auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
    credentials: 'include',
    redirect: 'manual',
  });

  if (!response.ok && response.type !== 'opaqueredirect') {
    throw new Error('Invalid credentials');
  }

  // After login, fetch user profile
  return getCurrentUser();
}

export async function register(data: RegisterData): Promise<User> {
  // For registration, we'll call a custom endpoint
  return api.post<User>('/api/auth/register/', data);
}

export async function logout(): Promise<void> {
  await fetch(`${API_BASE}/api-auth/logout/`, {
    method: 'POST',
    credentials: 'include',
  });
}

export async function getCurrentUser(): Promise<User> {
  const profiles = await api.get<{ user: User }[]>('/api/profiles/');
  if (profiles.length === 0) {
    throw new Error('Not authenticated');
  }
  return profiles[0].user;
}
