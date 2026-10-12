import * as Yup from 'yup';

const GEORGIAN_REGEX = /^[\u10A0-\u10FF]+(\s[\u10A0-\u10FF]+)*$/;

//@redberry.ge-ით
const REDBERRY_EMAIL_REGEX = /^[^\s@]+@redberry\.ge$/;

// პირადი ინფოს ვალიდაცია :
export const personalInfoSchema = Yup.object({
  name: Yup.string()
    .trim() // space-ები თავში/ბოლოში იშლება ვალიდაციამდე
    .min(2, 'მინიმუმ 2 სიმბოლო')
    .matches(GEORGIAN_REGEX, 'მხოლოდ ქართული ასოები')
    .required('სავალდებულო'),

  lastName: Yup.string()
    .trim()
    .min(2, 'მინიმუმ 2 სიმბოლო')
    .matches(GEORGIAN_REGEX, 'მხოლოდ ქართული ასოები')
    .required('სავალდებულო'),

  email: Yup.string()
    .trim()
    .matches(REDBERRY_EMAIL_REGEX, 'უნდა მთავრდებოდეს @redberry.ge-ით')
    .required('სავალდებულო'),

  phone: Yup.string()
    .trim()
    .matches(/^\+995 \d{3} \d{2} \d{2} \d{2}$/, 'არასწორი ფორმატი')
    .required('სავალდებულო'),

  aboutMe: Yup.string()
    .trim()
    .min(2, 'მინიმუმ 2 სიმბოლო')
    .required('სავალდებულო'),

  image: Yup.string().required('ფოტო სავალდებულოა'),
});

// ===== გამოცდილების ერთი ჩანაწერის ვალიდაცია =====
export const experienceItemSchema = Yup.object({
  position: Yup.string().trim().required('სავალდებულო'),
  employer: Yup.string().trim().required('სავალდებულო'),
  startDate: Yup.string().required('სავალდებულო'),
  endDate: Yup.string().required('სავალდებულო'),
  description: Yup.string().trim().required('სავალდებულო'),
});

// გამოცდილების მთლიანი ფორმა — მინიმუმ 1 ჩანაწერი
export const experienceFormSchema = Yup.object({
  experiences: Yup.array().of(experienceItemSchema).min(1),
});

// ===== განათლების ერთი ჩანაწერის ვალიდაცია =====
export const educationItemSchema = Yup.object({
  institute: Yup.string().trim().required('სავალდებულო'),
  degree: Yup.string().trim().required('სავალდებულო'),
  dueDate: Yup.string().required('სავალდებულო'),
  description: Yup.string().trim().required('სავალდებულო'),
});

// განათლების მთლიანი ფორმა — მინიმუმ 1 ჩანაწერი
export const educationFormSchema = Yup.object({
  educations: Yup.array().of(educationItemSchema).min(1),
});

// ===== ტელეფონის ავტო-ფორმატირება =====
// მომხმარებელი აკრეფს ციფრებს, ჩვენ ვაწყობთ ფორმატში: "+995 XXX XX XX XX"
// მაგ: "574219008" → "+995 574 21 90 08"
export function formatPhone(raw: string): string {
  // 1. ვტოვებთ მხოლოდ ციფრებს (ვშლით space-ებს, +, ტირეებს, ასოებს)
  let digits = raw.replace(/\D/g, '');

  // 2. თუ იწყება 995-ით (ქვეყნის კოდი), მოვაშოროთ რომ არ გაორმაგდეს
  if (digits.startsWith('995')) {
    digits = digits.slice(3);
  }

  // 3. მაქსიმუმ 9 ციფრი (5XX XX XX XX)
  digits = digits.slice(0, 9);

  // 4. ნაწილებად დავყოთ: 3 + 2 + 2 + 2 ციფრი
  const p1 = digits.slice(0, 3);
  const p2 = digits.slice(3, 5);
  const p3 = digits.slice(5, 7);
  const p4 = digits.slice(7, 9);

  // 5. ავაწყოთ საბოლოო სტრიქონი — ყოველთვის "+995"-ით იწყება
  let result = '+995';
  if (p1) result += ` ${p1}`;
  if (p2) result += ` ${p2}`;
  if (p3) result += ` ${p3}`;
  if (p4) result += ` ${p4}`;

  return result;
}