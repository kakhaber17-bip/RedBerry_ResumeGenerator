import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '../../assets/icons/ArrowLeftIcon';
import { CvPreview } from '../../features/cv/components/CvPreview';

interface FormLayoutProps {
  title: string;
  step: number;
  totalSteps: number;
  children: ReactNode;
}

export function FormLayout({ title, step, totalSteps, children }: FormLayoutProps) {
  const navigate = useNavigate();

  return(
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col">
          <button type="button"onClick={() => navigate('/')}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors mb-4" aria-label="უკან მთავარ გვერდზე">
            <ArrowLeftIcon />
          </button>
          <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <span className="font-bold text-xl text-gray-700">
              {step}/{totalSteps}
            </span>
          </div>
          {children}
        </div>

        <div className="lg:border-l lg:border-gray-200 lg:pl-10">
          <CvPreview />
        </div>
      </div>
    </div>
  );
}