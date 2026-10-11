import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CvContext } from '../features/cv/context/CvContext';
import { ArrowLeftIcon } from '../assets/icons/ArrowLeftIcon';
import { Button } from '../components/ui/Button';

export function MyCvsPage() {
  const navigate = useNavigate();
  const { savedList, loadCvById, deleteSavedCv } = useContext(CvContext);

  const handleLoad = (id: string) => {
    loadCvById(id);
    navigate('/personal-info');
  };

  const handleDelete = (id: string) => {
    deleteSavedCv(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors mb-6"
          aria-label="უკან"
        >
          <ArrowLeftIcon />
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">ჩემი რეზიუმეები</h1>

        {savedList.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
            <p className="text-gray-500 mb-4">ჯერ არ გაქვს შენახული რეზიუმე.</p>
            <Button onClick={() => navigate('/personal-info')}>ახალი რეზიუმე</Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {savedList.map((cv) => (
              <div
                key={cv.id}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex flex-col">
                  <span className="font-bold text-gray-800">
                    {cv.data.personalInfo.name} {cv.data.personalInfo.lastName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(cv.createdAt).toLocaleString('ka-GE')}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleLoad(cv.id)}
                    className="px-4 py-1.5 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
                  >
                    გახსნა
                  </button>
                  <button
                    onClick={() => handleDelete(cv.id)}
                    className="px-4 py-1.5 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                  >
                    წაშლა
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}