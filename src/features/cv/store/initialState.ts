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

export const initialCvData: CvData = {
  personalInfo: emptyPersonalInfo,
  experiences: [],
  educations: [],
};