import { useContext } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';
import { Button } from '../../../components/ui/Button';
import { CvContext, emptyExperience } from '../context/CvContext';
import { experienceFormSchema } from '../validation/schemas';
import type { Experience } from '../types';

interface FormValues {
  experiences: Experience[];
}

export function ExperienceForm() {
  const { cvData, setCvData } = useContext(CvContext);
  const navigate = useNavigate();

  const initialExperiences = cvData.experiences.length ? cvData.experiences : [emptyExperience];

  return (
    <Formik<FormValues>
      initialValues={{ experiences: initialExperiences }}
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={(formik.errors.experiences?.[index] as any)?.position}
                        touched={(formik.touched.experiences?.[index] as any)?.position}
                      />
                      <Input
                        label="დამსაქმებელი"
                        name={`experiences.${index}.employer`}
                        value={formik.values.experiences[index].employer}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={(formik.errors.experiences?.[index] as any)?.employer}
                        touched={(formik.touched.experiences?.[index] as any)?.employer}
                      />
                    </div>

                    <div className="flex gap-4">
                      <Input
                        label="დაწყების რიცხვი"
                        name={`experiences.${index}.startDate`}
                        type="date"
                        value={formik.values.experiences[index].startDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={(formik.errors.experiences?.[index] as any)?.startDate}
                        touched={(formik.touched.experiences?.[index] as any)?.startDate}
                      />
                      <Input
                        label="დამთავრების რიცხვი"
                        name={`experiences.${index}.endDate`}
                        type="date"
                        value={formik.values.experiences[index].endDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={(formik.errors.experiences?.[index] as any)?.endDate}
                        touched={(formik.touched.experiences?.[index] as any)?.endDate}
                      />
                    </div>

                    <TextArea
                      label="აღწერა"
                      name={`experiences.${index}.description`}
                      value={formik.values.experiences[index].description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={(formik.errors.experiences?.[index] as any)?.description}
                      touched={(formik.touched.experiences?.[index] as any)?.description}
                      rows={3}
                    />

                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
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
                  onClick={() => push(emptyExperience)}
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