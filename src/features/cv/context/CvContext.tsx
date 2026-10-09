import { createContext, useState, type ReactNode } from 'react';
import type { CvData, PersonalInfo, Experience, Education } from '../types';

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
  setCvData: React.Dispatch<React.SetStateAction<CvData>>;
}

export const CvContext = createContext<CvContextValue>({
  cvData: initialData,
  setCvData: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export function CvProvider({ children }: ProviderProps) {
  const [cvData, setCvData] = useState<CvData>(initialData);

  return <CvContext.Provider value={{ cvData, setCvData }}>{children}</CvContext.Provider>;
}