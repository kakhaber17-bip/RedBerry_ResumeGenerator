import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import redberryLogo from '../assets/redberryICON.png';

export function LandingPage() {
  const navigate = useNavigate();

  return(
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-white to-blue-700 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center flex flex-col items-center gap-8">
        <img src={redberryLogo} alt="Redberry"  className="w-48 h-auto object-contain" />
        <Button onClick={() => navigate('/personal-info')} className="text-lg px-8 py-3">
          რეზიუმეს დამატება
        </Button>
      </div>
    </div>
  );
}