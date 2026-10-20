import { Formik, Form, FieldArray } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { TextArea } from '../../../components/ui/TextArea';
import { DatePicker } from '../../../components/ui/DatePicker';
import { Button } from '../../../components/ui/Button';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  setCvData,
  updateEducation,
  addEducation,
  removeEducation,
  saveCurrentCv,
  resetDraft,
} from '../store/cvSlice';
import { emptyEducation } from '../store/initialState';
import { educationFormSchema } from '../validation/schemas';
import type { Education } from '../types';

interface FormValues {
  educations: Education[];
}

function getFieldError(errors: unknown, index: number, field: string): string | undefined {
  const arr = errors as Array<Record<string, string>> | undefined;
  return arr?.[index]?.[field];
}

function getFieldTouched(touched: unknown, index: number, field: string): boolean | undefined {
  const arr = touched as Array<Record<string, boolean>> | undefined;
  return arr?.[index]?.[field];
}

const degreeOptions = [
  { value: 'სტუდენტი', label: 'სტუდენტი' },
  { value: 'ბაკალავრი', label: 'ბაკალავრი' },
  { value: 'მაგისტრი', label: 'მაგისტრი' },
  { value: 'დოქტორი', label: 'დოქტორი' },
];

export function EducationForm() {
  const dispatch = useAppDispatch();
  const cvData = useAppSelector((state)=>state.cv.cvData);
  const navigate = useNavigate();

  const initial = cvData.educations.length ? cvData.educations : [emptyEducation];

  return (
    <Formik<FormValues>
      initialValues={{ educations: initial }}
      validationSchema={educationFormSchema}
      onSubmit={(values, { resetForm }) => {
        const finalData = { ...cvData, educations: values.educations };

        dispatch(setCvData(finalData));

        dispatch(saveCurrentCv());

        dispatch(resetDraft());

        resetForm({ values: { educations: [{ ...emptyEducation }] } });

        alert('CV შეიქმნა');
        navigate('/');
      }}>

      {(formik)=>(
        <Form className="flex flex-col gap-6">
          <FieldArray name="educations">
            {({ push, remove }) => (
            <div className="flex flex-col gap-8">
              {formik.values.educations.map((_, index) => (
                <div key={index} className="flex flex-col gap-4 border-b pb-6 last:border-0">
                  <div className="flex gap-4">
                    <Input label="სასწავლებელი" name={`educations.${index}.institute`}
                        value={formik.values.educations[index].institute}
                        onChange={(e) => {
                          formik.handleChange(e);
                          dispatch(
                            updateEducation({ index, field: 'institute', value: e.target.value })
                          );
                        }}
                        onBlur={formik.handleBlur}
                        error={getFieldError(formik.errors.educations, index, 'institute')}
                        touched={getFieldTouched(formik.touched.educations, index, 'institute')}/>
                      <Select
                        label="ხარისხი"
                        name={`educations.${index}.degree`}
                        value={formik.values.educations[index].degree}
                        onChange={(e) => {
                          formik.handleChange(e);
                          dispatch(
                            updateEducation({ index, field: 'degree', value: e.target.value })
                          );
                        }}
                        onBlur={formik.handleBlur}
                        error={getFieldError(formik.errors.educations, index, 'degree')}  touched={getFieldTouched(formik.touched.educations, index, 'degree')}
                      options={degreeOptions}/>
                   </div>

                    <DatePicker label="დამთავრების რიცხვი"
                      name={`educations.${index}.dueDate`}
                      value={formik.values.educations[index].dueDate}
                      onChange={(name, value) => {
                        formik.setFieldValue(name, value);
                        dispatch(updateEducation({ index, field: 'dueDate', value }));
                      }}
                      onBlur={() => formik.setFieldTouched(`educations.${index}.dueDate`, true)}
                      error={getFieldError(formik.errors.educations, index, 'dueDate')}
                      touched={getFieldTouched(formik.touched.educations, index, 'dueDate')}/>

                    <TextArea label="აღწერა"
                      name={`educations.${index}.description`}
                      value={formik.values.educations[index].description}
                      onChange={(e) => {
                        formik.handleChange(e);
                        dispatch(
                          updateEducation({ index, field: 'description', value: e.target.value })
                        );
                      }}
                      onBlur={formik.handleBlur}
                      error={getFieldError(formik.errors.educations, index, 'description')}
                      touched={getFieldTouched(formik.touched.educations, index, 'description')}
                      rows={3}/>

                    {index > 0 && (
                      <button type="button"
                        onClick={() => {
                          remove(index);
                          dispatch(removeEducation(index));
                        }}
                        className="text-red-500 text-sm self-start">
                        წაშლა
                      </button>
                    )}
                  </div>
                ))}

                <Button type="button"variant="secondary"
                  onClick={() => {
                    push(emptyEducation);
                    dispatch(addEducation());
                  }}
                  className="self-start text-sm">
                  მეტი განათლების დამატება
                </Button>
              </div>
            )}
          </FieldArray>

          <div className="flex justify-between mt-4">
            <Button type="button" onClick={()=> navigate('/experience')}>
              უკან
            </Button>
            <Button type="submit">დასრულება</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}