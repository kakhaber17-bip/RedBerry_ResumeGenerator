import { FormLayout } from '../components/layout/FormLayout';
import { PersonalInfoForm } from '../features/cv/components/PersonalInfoForm';

export function PersonalInfoPage() {
  return (
    <FormLayout title="პირადი ინფო" step={1} totalSteps={3}>
      <PersonalInfoForm />
    </FormLayout>
  );
}