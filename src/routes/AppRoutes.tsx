import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { PersonalInfoPage } from '../pages/PersonalInfoPage';
import { ExperiencePage } from '../pages/ExperiencePage';
import { EducationPage } from '../pages/EducationPage';
import { MyCvsPage } from '../pages/MyCvsPage';
import { useAppSelector } from '../app/hooks';

function RequirePersonalInfo({ children }: { children: React.ReactNode }) {
  const cvData = useAppSelector((state) => state.cv.cvData);
  const { name, lastName, email, phone, aboutMe, image } = cvData.personalInfo;

  const isComplete =
    name.trim().length >= 2 &&
    lastName.trim().length >= 2 &&
    email.trim().length > 0 &&
    phone.trim().length > 0 &&
    aboutMe.trim().length >= 2 &&
    image.length > 0;

  if (!isComplete) {
    return <Navigate to="/personal-info" replace />;
  }

  return <>{children}</>;
}

function RequireExperience({ children }: { children: React.ReactNode }) {
  const cvData = useAppSelector((state) => state.cv.cvData);
  const { experiences } = cvData;

  const hasExperience =
    experiences.length > 0 &&
    experiences.some((e) => e.position.trim() && e.employer.trim());

  if (!hasExperience) {
    return <Navigate to="/experience" replace />;
  }

  return <>{children}</>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/my-cvs" element={<MyCvsPage />} />
      <Route path="/personal-info" element={<PersonalInfoPage />} />
      <Route
        path="/experience"
        element={
          <RequirePersonalInfo>
            <ExperiencePage />
          </RequirePersonalInfo>
        }
      />
      <Route
        path="/education"
        element={
          <RequireExperience>
            <EducationPage />
          </RequireExperience>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}