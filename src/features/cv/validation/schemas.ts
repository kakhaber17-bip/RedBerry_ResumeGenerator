import * as Yup from 'yup';

const GEORGIAN_REGEX = /^[\u10A0-\u10FF\s]+$/;
const REDBERRY_EMAIL_REGEX = /^[^\s@]+@redberry\.ge$/;

export const personalInfoSchema = Yup.object({
  name: Yup.string()
    .min(2, 'მინიმუმ 2 სიმბოლო')
    .matches(GEORGIAN_REGEX, 'მხოლოდ ქართული ასოები')
    .required('სავალდებულო'),
  lastName: Yup.string()
    .min(2, 'მინიმუმ 2 სიმბოლო')
    .matches(GEORGIAN_REGEX, 'მხოლოდ ქართული ასოები')
    .required('სავალდებულო'),
  email: Yup.string()
    .matches(REDBERRY_EMAIL_REGEX, 'უნდა მთავრდებოდეს @redberry.ge-ით')
    .required('სავალდებულო'),
  phone: Yup.string()
    .matches(/^\+995 \d{3} \d{2} \d{2} \d{2}$/, 'არასწორი ფორმატი')
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

export function formatPhone(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('995')) {
    digits = digits.slice(3);
  }
  digits = digits.slice(0, 9);

  const p1 = digits.slice(0, 3);
  const p2 = digits.slice(3, 5);
  const p3 = digits.slice(5, 7);
  const p4 = digits.slice(7, 9);

  let result = '+995';
  if (p1) result += ` ${p1}`;
  if (p2) result += ` ${p2}`;
  if (p3) result += ` ${p3}`;
  if (p4) result += ` ${p4}`;

  return result;
}