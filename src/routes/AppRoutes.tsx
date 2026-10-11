import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { PersonalInfoPage } from '../pages/PersonalInfoPage';
import { ExperiencePage } from '../pages/ExperiencePage';
import { EducationPage } from '../pages/EducationPage';
import { MyCvsPage } from '../pages/MyCvsPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/my-cvs" element={<MyCvsPage />} />
      <Route path="/personal-info" element={<PersonalInfoPage />} />
      <Route path="/experience" element={<ExperiencePage />} />
      <Route path="/education" element={<EducationPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}