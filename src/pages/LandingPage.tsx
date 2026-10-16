import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ListIcon } from '../assets/icons/ListIcon';
import redberryLogo from '../assets/redberryICON.png';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { resetDraft } from '../features/cv/store/cvSlice';

export function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const savedList = useAppSelector((state) => state.cv.savedList);

  const handleNew = () => {
    dispatch(resetDraft());
    navigate('/personal-info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 flex flex-col items-center p-6 relative">
      <button type="button"onClick={() => navigate('/my-cvs')}
        className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
        aria-label="ჩემი რეზიუმეები">
        <ListIcon className="w-5 h-5 text-gray-700" />
        <span className="text-sm font-medium text-gray-700 cursor-pointer">სივები</span>
        {savedList.length > 0 && (
          <span className="ml-1 bg-purple-600 text-white text-xs rounded-full px-2 py-0.5">
            {savedList.length}
          </span>
        )}
      </button>

      <div className="max-w-2xl w-full text-center flex flex-col items-center gap-6 py-10 mt-16">
        <img src={redberryLogo} alt="Redberry" className="w-48 h-auto object-contain" />

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
          <span className="text-red-500">CV</span> Generator
        </h1>

        <Button onClick={handleNew} className="text-lg px-8 py-3">
          ახალი რეზიუმე
        </Button>
      </div>
    </div>
  );
}