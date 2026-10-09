import { useContext } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { TextArea } from '../../../components/ui/TextArea';
import { Button } from '../../../components/ui/Button';
import { CvContext, emptyEducation } from '../context/CvContext';
import { educationFormSchema } from '../validation/schemas';
import type { Education } from '../types';

interface FormValues {
  educations: Education[];
}

const degreeOptions = [
  { value: 'სტუდენტი', label: 'სტუდენტი' },
  { value: 'ბაკალავრი', label: 'ბაკალავრი' },
  { value: 'მაგისტრი', label: 'მაგისტრი' },
  { value: 'დოქტორი', label: 'დოქტორი' },
];

export function EducationForm() {
  const { cvData, setCvData } = useContext(CvContext);
  const navigate = useNavigate();

  const initialEducations = cvData.educations.length ? cvData.educations : [emptyEducation];

  return (
    <Formik<FormValues>
      initialValues={{ educations: initialEducations }}
      validationSchema={educationFormSchema}
      onSubmit={(values) => {
        setCvData((prev) => ({ ...prev, educations: values.educations }));
        navigate('/complete');
      }}
    >
      {(formik) => (
        <Form className="flex flex-col gap-6">
          <FieldArray name="educations">
            {({ push, remove }) => (
              <div className="flex flex-col gap-8">
                {formik.values.educations.map((_, index) => (
                  <div key={index} className="flex flex-col gap-4 border-b pb-6 last:border-0">
                    <div className="flex gap-4">
                      <Input
                        label="სასწავლებელი"
                        name={`educations.${index}.institute`}
                        value={formik.values.educations[index].institute}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={(formik.errors.educations?.[index] as any)?.institute}
                        touched={(formik.touched.educations?.[index] as any)?.institute}
                      />
                      <Select
                        label="ხარისხი"
                        name={`educations.${index}.degree`}
                        value={formik.values.educations[index].degree}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={(formik.errors.educations?.[index] as any)?.degree}
                        touched={(formik.touched.educations?.[index] as any)?.degree}
                        options={degreeOptions}
                      />
                    </div>

                    <Input
                      label="დამთავრების რიცხვი"
                      name={`educations.${index}.dueDate`}
                      type="date"
                      value={formik.values.educations[index].dueDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={(formik.errors.educations?.[index] as any)?.dueDate}
                      touched={(formik.touched.educations?.[index] as any)?.dueDate}
                    />

                    <TextArea
                      label="აღწერა"
                      name={`educations.${index}.description`}
                      value={formik.values.educations[index].description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={(formik.errors.educations?.[index] as any)?.description}
                      touched={(formik.touched.educations?.[index] as any)?.description}
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
                  onClick={() => push(emptyEducation)}
                  className="self-start text-sm"
                >
                  მეტი განათლების დამატება
                </Button>
              </div>
            )}
          </FieldArray>

          <div className="flex justify-between mt-4">
            <Button type="button" onClick={() => navigate('/experience')}>
              უკან
            </Button>
            <Button type="submit">დასრულება</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}