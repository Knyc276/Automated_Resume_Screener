import { StoredScreeningResult } from '../types';

const STORAGE_KEY = 'ats_screening_results';

export const saveScreeningResult = (result: StoredScreeningResult): void => {
  try {
    const existingResults = getStoredResults();
    const updatedResults = [result, ...existingResults.filter(r => r.id !== result.id)];
    
    // Keep only the last 50 results to prevent storage overflow
    const limitedResults = updatedResults.slice(0, 50);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedResults));
  } catch (error) {
    console.error('Failed to save screening result:', error);
  }
};

export const getStoredResults = (): StoredScreeningResult[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const results = JSON.parse(stored);
    // Convert date strings back to Date objects
    return results.map((result: any) => ({
      ...result,
      createdAt: new Date(result.createdAt),
      scoredResumes: result.scoredResumes.map((resume: any) => ({
        ...resume,
        uploadedAt: new Date(resume.uploadedAt)
      }))
    }));
  } catch (error) {
    console.error('Failed to load stored results:', error);
    return [];
  }
};

export const deleteStoredResult = (id: string): void => {
  try {
    const existingResults = getStoredResults();
    const filteredResults = existingResults.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredResults));
  } catch (error) {
    console.error('Failed to delete screening result:', error);
  }
};

export const clearAllResults = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear all results:', error);
  }
};

export const getStorageUsage = (): { used: number; percentage: number } => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const usedBytes = stored ? new Blob([stored]).size : 0;
    const maxBytes = 5 * 1024 * 1024; // 5MB typical localStorage limit
    
    return {
      used: usedBytes,
      percentage: Math.round((usedBytes / maxBytes) * 100)
    };
  } catch (error) {
    return { used: 0, percentage: 0 };
  }
};