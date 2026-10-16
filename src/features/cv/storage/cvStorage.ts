import type { CvData, SavedCv } from '../types';

const SAVED_LIST_KEY = 'redberry_saved_cvs';
const DRAFT_KEY = 'redberry_draft_cv';

export function loadDraft(fallback: CvData): CvData {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if(!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<CvData>;
    return {
      personalInfo: { ...fallback.personalInfo, ...(parsed.personalInfo ?? {}) },
      experiences: parsed.experiences ?? [],
      educations: parsed.educations ?? [],
    };
  } catch {
    return fallback;
  }
}

export function saveDraft(data: CvData): void {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}


export function loadSavedList(): SavedCv[] {
  try {
    const raw = localStorage.getItem(SAVED_LIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedCv[]) : [];
  } catch {
    return [];
  }
}

export function saveCvToList(data: CvData): SavedCv {
  const list = loadSavedList();
  const newCv: SavedCv = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    data,
  };
  const updated = [newCv, ...list];
  try {
    localStorage.setItem(SAVED_LIST_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  return newCv;
}

export function deleteCvFromList(id: string): SavedCv[] {
  const list = loadSavedList();
  const updated = list.filter((cv) => cv.id !== id);
  try {
    localStorage.setItem(SAVED_LIST_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  return updated;
}

export function getCvById(id: string): SavedCv | undefined {
  return loadSavedList().find((cv) => cv.id === id);
}