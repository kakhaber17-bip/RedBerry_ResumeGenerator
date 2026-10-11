export interface PersonalInfo {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  aboutMe: string;
  image: string;
}

export interface Experience {
  position: string;
  employer: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  institute: string;
  degree: string;
  dueDate: string;
  description: string;
}

export interface CvData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
}

// 🆕 შენახული CV
export interface SavedCv {
  id: string;
  createdAt: number;
  data: CvData;
}