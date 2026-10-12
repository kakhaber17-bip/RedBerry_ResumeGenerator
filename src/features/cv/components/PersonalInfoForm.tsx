import { useContext, useRef, type ChangeEvent } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';
import { Button } from '../../../components/ui/Button';
import { CvContext } from '../context/CvContext';
import { personalInfoSchema, formatPhone } from '../validation/schemas';
import type { PersonalInfo } from '../types';

export function PersonalInfoForm() {
  const { cvData, setCvData } = useContext(CvContext);
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: unknown) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFieldValue('image', reader.result);
      setCvData((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, image: reader.result as string },
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Formik<PersonalInfo> initialValues={cvData.personalInfo} validationSchema={personalInfoSchema}
      onSubmit={(values) => {
        setCvData((prev) => ({ ...prev, personalInfo: values }));
        navigate('/experience');
      }}
    >
      {(formik) =>(
        <Form className="flex flex-col gap-6">
          <div className="flex gap-4">
            <Input label="სახელი" name="name" value={formik.values.name}
              onChange={(e)=>{
                formik.handleChange(e);
                setCvData((prev)=>({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, name: e.target.value },
                }));
              }}
              onBlur={formik.handleBlur}
              error={formik.errors.name}
              touched={formik.touched.name}
              hint="მინიმუმ 2 ასო, ქართული ასოები"
            />

            <Input label="გვარი" name="lastName"value={formik.values.lastName}
              onChange={(e)=>{
                formik.handleChange(e);
                setCvData((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, lastName: e.target.value },
                }));
              }}
              onBlur={formik.handleBlur}
              error={formik.errors.lastName}
              touched={formik.touched.lastName}
              hint="მინიმუმ 2 ასო, ქართული ასოები"
            />
          </div>

      
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-gray-700">პირადი ფოტოს ატვირთვა</span>
            <button type="button" onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-900 text-white font-medium px-7 py-2 rounded-md transition-colors cursor-pointer">
              ფოტოს ატვირთვა
            </button>
            <input ref={fileInputRef} type="file" accept="image/*"
             onChange={(e) => handleImageUpload(e, formik.setFieldValue)} 
              className="hidden"
            />
          </div>

          {/* ფოტოს error */}
          {formik.touched.image && formik.errors.image && (
            <span className="text-xs text-red-500">{formik.errors.image}</span>
          )}

          <TextArea label="ჩემ შესახებ" name="aboutMe" placeholder="ზოგადი ინფორმაცია ჩემს შესახებ..." value={formik.values.aboutMe}
            onChange={(e) => {
              formik.handleChange(e);
              setCvData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, aboutMe: e.target.value },
              }));
            }}
            onBlur={formik.handleBlur}
            error={formik.errors.aboutMe}
            touched={formik.touched.aboutMe}
            rows={8}
            hint="მინიმუმ 2 სიმბოლო" />

          <div className="flex gap-4">
            <Input label="ელ.ფოსტა" name="email" type="email" placeholder="kakhaber@redberry.ge"
              value={formik.values.email}
               onChange={(e)=>{
                formik.handleChange(e);
                setCvData((prev) =>({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, email: e.target.value },
                }));
              }}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
              touched={formik.touched.email}
              hint="უნდა მთავრდებოდეს @redberry.ge-ით"
            />

            <Input label="მობილურის ნომერი"name="phone" placeholder="+995 5XX XX XX XX"
              value={formik.values.phone}
              onChange={(e) => {
                const formatted = formatPhone(e.target.value);
                formik.setFieldValue('phone', formatted);
                setCvData((prev)=>({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, phone: formatted },
                }));
              }}
              onBlur={formik.handleBlur}
              error={formik.errors.phone}
              touched={formik.touched.phone}
              hint="უნდა აკმაყოფილებდეს ქართული ნომრის ფორმატს"
            />
          </div>

          <div className="flex justify-end mt-4">
            <Button type="submit">შემდეგი</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}