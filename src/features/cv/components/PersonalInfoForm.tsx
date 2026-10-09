import { useContext, type ChangeEvent } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';
import { Button } from '../../../components/ui/Button';
import { CvContext } from '../context/CvContext';
import { personalInfoSchema } from '../validation/schemas';
import type { PersonalInfo } from '../types';

export function PersonalInfoForm() {
  const { cvData, setCvData } = useContext(CvContext);
  const navigate = useNavigate();

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: unknown) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setFieldValue('image', reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <Formik<PersonalInfo>
      initialValues={cvData.personalInfo}
      validationSchema={personalInfoSchema}
      onSubmit={(values) => {
        setCvData((prev) => ({ ...prev, personalInfo: values }));
        navigate('/experience');
      }}
    >
      {(formik) => (
        <Form className="flex flex-col gap-6">
          <div className="flex gap-4">
            <Input
              label="სახელი"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.name}
              touched={formik.touched.name}
              hint="მინიმუმ 2 სიმბოლო"
            />
            <Input
              label="გვარი"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.lastName}
              touched={formik.touched.lastName}
              hint="მინიმუმ 2 სიმბოლო"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">პირადი ფოტოს ატვირთვა</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, formik.setFieldValue)}
              className="border p-2 rounded"
            />
            {formik.touched.image && formik.errors.image && (
              <span className="text-xs text-red-500">{formik.errors.image}</span>
            )}
          </div>

          <TextArea
            label="ჩემ შესახებ"
            name="aboutMe"
            value={formik.values.aboutMe}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.aboutMe}
            touched={formik.touched.aboutMe}
            rows={4}
            hint="მინიმუმ 2 სიმბოლო"
          />

          <div className="flex gap-4">
            <Input
              label="ემაილი"
              name="email"
              type="email"
              placeholder="example@mail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
              touched={formik.touched.email}
            />
            <Input
              label="მობილურის ნომერი"
              name="phone"
              placeholder="+995 555 12 34 56"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.phone}
              touched={formik.touched.phone}
              hint="ფორმატი: +995 5XX XX XX XX"
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