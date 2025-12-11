// Study Materials API calls
import api from './client';
import type { StudyMaterial, StudyRoute } from '../types';

export async function getMaterials(): Promise<StudyMaterial[]> {
  return api.get<StudyMaterial[]>('/api/materials/');
}

export async function getMaterial(id: number): Promise<StudyMaterial> {
  return api.get<StudyMaterial>(`/api/materials/${id}/`);
}

export async function uploadMaterial(
  title: string,
  description: string,
  file?: File
): Promise<StudyMaterial> {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  if (file) {
    formData.append('file', file);
  }
  return api.post<StudyMaterial>('/api/materials/', formData);
}

export async function generateRoute(
  materialId: number,
  technique: string = 'concept_map'
): Promise<StudyRoute> {
  return api.post<StudyRoute>(`/api/materials/${materialId}/generate_route/`, {
    technique,
  });
}

export async function getRoutes(): Promise<StudyRoute[]> {
  return api.get<StudyRoute[]>('/api/routes/');
}

export async function getRoute(id: number): Promise<StudyRoute> {
  return api.get<StudyRoute>(`/api/routes/${id}/`);
}
