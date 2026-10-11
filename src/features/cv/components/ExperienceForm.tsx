import { useContext } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';
import { DatePicker } from '../../../components/ui/DatePicker';
import { Button } from '../../../components/ui/Button';
import { CvContext, emptyExperience } from '../context/CvContext';
import { experienceFormSchema } from '../validation/schemas';
import type { Experience } from '../types';

interface FormValues {
  experiences: Experience[];
}

function getFieldError(errors: unknown, index: number, field: string): string | undefined {
  const arr = errors as Array<Record<string, string>> | undefined;
  return arr?.[index]?.[field];
}

function getFieldTouched(touched: unknown, index: number, field: string): boolean | undefined {
  const arr = touched as Array<Record<string, boolean>> | undefined;
  return arr?.[index]?.[field];
}

export function ExperienceForm() {
  const { cvData, setCvData } = useContext(CvContext);
  const navigate = useNavigate();

  const initial = cvData.experiences.length ? cvData.experiences : [emptyExperience];

  const updateCv = (index: number, field: keyof Experience, value: string) => {
    setCvData((prev) => {
      const updated = [...prev.experiences];
      if (!updated[index]) updated[index] = { ...emptyExperience };
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experiences: updated };
    });
  };

  return (
    <Formik<FormValues>
      initialValues={{ experiences: initial }}
      validationSchema={experienceFormSchema}
      onSubmit={(values) => {
        setCvData((prev) => ({ ...prev, experiences: values.experiences }));
        navigate('/education');
      }}
    >
      {(formik) => (
        <Form className="flex flex-col gap-6">
          <FieldArray name="experiences">
            {({ push, remove }) => (
              <div className="flex flex-col gap-8">
                {formik.values.experiences.map((_, index) => (
                  <div key={index} className="flex flex-col gap-4 border-b pb-6 last:border-0">
                    <div className="flex gap-4">
                      <Input
                        label="თანამდებობა"
                        name={`experiences.${index}.position`}
                        value={formik.values.experiences[index].position}
                        onChange={(e) => {
                          formik.handleChange(e);
                          updateCv(index, 'position', e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                        error={getFieldError(formik.errors.experiences, index, 'position')}
                        touched={getFieldTouched(formik.touched.experiences, index, 'position')}
                      />
                      <Input
                        label="დამსაქმებელი"
                        name={`experiences.${index}.employer`}
                        value={formik.values.experiences[index].employer}
                        onChange={(e) => {
                          formik.handleChange(e);
                          updateCv(index, 'employer', e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                        error={getFieldError(formik.errors.experiences, index, 'employer')}
                        touched={getFieldTouched(formik.touched.experiences, index, 'employer')}
                      />
                    </div>

                    <div className="flex gap-4">
                      <DatePicker
                        label="დაწყების რიცხვი"
                        name={`experiences.${index}.startDate`}
                        value={formik.values.experiences[index].startDate}
                        onChange={(name, value) => {
                          formik.setFieldValue(name, value);
                          updateCv(index, 'startDate', value);
                        }}
                        onBlur={() => formik.setFieldTouched(`experiences.${index}.startDate`, true)}
                        error={getFieldError(formik.errors.experiences, index, 'startDate')}
                        touched={getFieldTouched(formik.touched.experiences, index, 'startDate')}
                      />
                      <DatePicker
                        label="დამთავრების რიცხვი"
                        name={`experiences.${index}.endDate`}
                        value={formik.values.experiences[index].endDate}
                        onChange={(name, value) => {
                          formik.setFieldValue(name, value);
                          updateCv(index, 'endDate', value);
                        }}
                        onBlur={() => formik.setFieldTouched(`experiences.${index}.endDate`, true)}
                        error={getFieldError(formik.errors.experiences, index, 'endDate')}
                        touched={getFieldTouched(formik.touched.experiences, index, 'endDate')}
                      />
                    </div>

                    <TextArea
                      label="აღწერა"
                      name={`experiences.${index}.description`}
                      value={formik.values.experiences[index].description}
                      onChange={(e) => {
                        formik.handleChange(e);
                        updateCv(index, 'description', e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      error={getFieldError(formik.errors.experiences, index, 'description')}
                      touched={getFieldTouched(formik.touched.experiences, index, 'description')}
                      rows={3}
                    />

                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          remove(index);
                          setCvData((prev) => ({
                            ...prev,
                            experiences: prev.experiences.filter((_, i) => i !== index),
                          }));
                        }}
                        className="text-red-500 text-sm self-start"
                      >
                        წაშლა
                      </button>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    push(emptyExperience);
                    setCvData((prev) => ({
                      ...prev,
                      experiences: [...prev.experiences, { ...emptyExperience }],
                    }));
                  }}
                  className="self-start text-sm"
                >
                  მეტი გამოცდილების დამატება
                </Button>
              </div>
            )}
          </FieldArray>

          <div className="flex justify-between mt-4">
            <Button type="button" onClick={() => navigate('/personal-info')}>
              უკან
            </Button>
            <Button type="submit">შემდეგი</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}