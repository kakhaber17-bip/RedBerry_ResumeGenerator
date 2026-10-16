import { useAppSelector } from '../../../app/hooks';
import { ExperienceIcon } from '../../../assets/icons/ExperienceIcon';
import { EducationIcon } from '../../../assets/icons/EducationIcon';

export function CvPreview(){
  const cvData = useAppSelector((state)=> state.cv.cvData);
  const { personalInfo, experiences, educations } = cvData;

  const hasExperiences = experiences.some((e)=> e.position);
  const hasEducations = educations.some((e)=> e.institute);

  return (
    <div className="text-gray-800">
      {/* personal info */}
      <div className="flex justify-between items-start gap-6 mb-8">
        <div className="flex-1">

          {(personalInfo.name || personalInfo.lastName) && (
            <h2 className="text-3xl font-bold text-red-500 mb-4">
              {personalInfo.name} {personalInfo.lastName}
            </h2>
          )}

          {personalInfo.email && (
            <p className="text-sm mb-1 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://w3.org" role="img" aria-label="Email icon">
  <rect width="20" height="16" x="2" y="4" rx="2"/>
  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            {personalInfo.email}
            </p>
          )}
          {personalInfo.phone && (
            <p className="text-sm flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://w3.org" role="img" aria-label="Phone icon">
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
               </svg>
             {personalInfo.phone}
            </p>
          )}

          {personalInfo.aboutMe && (
            <div className="mt-6">
              <h3 className="text-red-500 font-bold mb-1">ჩემ შესახებ</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {personalInfo.aboutMe}
              </p>
            </div>
          )}
        </div>

        {personalInfo.image && (
          <img src={personalInfo.image} alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 shrink-0"/>
        )}
      </div>

      {/* experience */}
      {hasExperiences && (
     <div className="mb-6">
      <h3 className="text-red-500 font-bold mb-2 flex items-center gap-2">
      <ExperienceIcon className="w-5 h-5" />
      გამოცდილება
     </h3>
    {experiences.map(
      (exp, i) =>
        exp.position && (
          <div key={i} className="mb-4">
            <p className="font-bold text-md">
              {exp.position}
              {exp.employer && `, ${exp.employer}`}
            </p>
            {(exp.startDate || exp.endDate) && (
              <p className="text-xs text-gray-500 italic">
                {exp.startDate} - {exp.endDate}
              </p>
            )}
            {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
          </div>
        )
    )}
     </div>
      )}

      {/* education */}
      {hasEducations && (
       <div>
    <h3 className="text-red-500 font-bold mb-2 flex items-center gap-2">
      <EducationIcon className="w-5 h-5" />
      განათლება
    </h3>
    {educations.map(
      (edu, i) =>
        edu.institute && (
          <div key={i} className="mb-4">
            <p className="font-bold text-md">
              {edu.institute}
              {edu.degree && `, ${edu.degree}`}
            </p>
            {edu.dueDate && (
              <p className="text-xs text-gray-500 italic">{edu.dueDate}</p>
            )}
            {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
          </div>
        )
    )}
      </div>
       )}
    </div>
  );
}