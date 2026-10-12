import { FormLayout } from '../components/layout/FormLayout';
import { ExperienceForm } from '../features/cv/components/ExperienceForm';

export function ExperiencePage(){
  return (
    <FormLayout title="გამოცდილება" step={2} totalSteps={3}>
      <ExperienceForm />
    </FormLayout>
  );
}