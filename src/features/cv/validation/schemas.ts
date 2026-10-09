import * as Yup from 'yup';

export const personalInfoSchema = Yup.object({
  name: Yup.string().min(2, 'მინიმუმ 2 სიმბოლო').required('სავალდებულო'),
  lastName: Yup.string().min(2, 'მინიმუმ 2 სიმბოლო').required('სავალდებულო'),
  email: Yup.string().email('არასწორი ემაილი').required('სავალდებულო'),
  phone: Yup.string()
    .matches(/^\+995 \d{3} \d{2} \d{2} \d{2}$/, 'ფორმატი: +995 5XX XX XX XX')
    .required('სავალდებულო'),
  aboutMe: Yup.string().min(2, 'მინიმუმ 2 სიმბოლო').required('სავალდებულო'),
  image: Yup.string().required('ფოტო სავალდებულოა'),
});

export const experienceItemSchema = Yup.object({
  position: Yup.string().required('სავალდებულო'),
  employer: Yup.string().required('სავალდებულო'),
  startDate: Yup.string().required('სავალდებულო'),
  endDate: Yup.string().required('სავალდებულო'),
  description: Yup.string().required('სავალდებულო'),
});

export const experienceFormSchema = Yup.object({
  experiences: Yup.array().of(experienceItemSchema).min(1),
});

export const educationItemSchema = Yup.object({
  institute: Yup.string().required('სავალდებულო'),
  degree: Yup.string().required('სავალდებულო'),
  dueDate: Yup.string().required('სავალდებულო'),
  description: Yup.string().required('სავალდებულო'),
});

export const educationFormSchema = Yup.object({
  educations: Yup.array().of(educationItemSchema).min(1),
});