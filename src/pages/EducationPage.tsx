import { FormLayout } from '../components/layout/FormLayout';
import { EducationForm } from '../features/cv/components/EducationForm';

export function EducationPage(){
  return(
    <FormLayout title="განათლება" step={3} totalSteps={3}>
      <EducationForm/>
    </FormLayout>
  );
}