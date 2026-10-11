import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { CvData, PersonalInfo, Experience, Education, SavedCv } from '../types';
import {
  loadDraft,
  saveDraft,
  clearDraft,
  loadSavedList,
  saveCvToList,
  deleteCvFromList,
  getCvById,
} from '../storage/cvStorage';

export const emptyPersonalInfo: PersonalInfo = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  aboutMe: '',
  image: '',
};

export const emptyExperience: Experience = {
  position: '',
  employer: '',
  startDate: '',
  endDate: '',
  description: '',
};

export const emptyEducation: Education = {
  institute: '',
  degree: '',
  dueDate: '',
  description: '',
};

const initialData: CvData = {
  personalInfo: emptyPersonalInfo,
  experiences: [],
  educations: [],
};

interface CvContextValue {
  cvData: CvData;
  setCvData: Dispatch<SetStateAction<CvData>>;
  savedList: SavedCv[];
  saveCurrentCv: () => void;
  deleteSavedCv: (id: string) => void;
  loadCvById: (id: string) => void;
  resetDraft: () => void;
}

export const CvContext = createContext<CvContextValue>({
  cvData: initialData,
  setCvData: () => {},
  savedList: [],
  saveCurrentCv: () => {},
  deleteSavedCv: () => {},
  loadCvById: () => {},
  resetDraft: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export function CvProvider({ children }: ProviderProps) {
  const [cvData, setCvData] = useState<CvData>(() => loadDraft(initialData));
  const [savedList, setSavedList] = useState<SavedCv[]>(() => loadSavedList());

  // Draft-ის ავტო-შენახვა
  useEffect(() => {
    saveDraft(cvData);
  }, [cvData]);

  const saveCurrentCv = () => {
    const saved = saveCvToList(cvData);
    setSavedList((prev) => [saved, ...prev]);
  };

  const deleteSavedCv = (id: string) => {
    const updated = deleteCvFromList(id);
    setSavedList(updated);
  };

  const loadCvById = (id: string) => {
    const found = getCvById(id);
    if (found) setCvData(found.data);
  };

  const resetDraft = () => {
    clearDraft();
    setCvData({
      personalInfo: { ...emptyPersonalInfo },
      experiences: [],
      educations: [],
    });
  };

  return (
    <CvContext.Provider
      value={{
        cvData,
        setCvData,
        savedList,
        saveCurrentCv,
        deleteSavedCv,
        loadCvById,
        resetDraft,
      }}
    >
      {children}
    </CvContext.Provider>
  );
}