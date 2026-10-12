import { useContext } from 'react';
import { CvContext } from '../context/CvContext';
import { MailIcon } from '../../../assets/icons/MailIcon';
import { PhoneIcon } from '../../../assets/icons/PhoneIcon';

export function CvPreview() {
  const { cvData } = useContext(CvContext);
  const { personalInfo, experiences, educations } = cvData;

  const hasExperiences = experiences.some((e) => e.position);
  const hasEducations = educations.some((e) => e.institute);

  return (
    <div className="text-gray-800">
      {/* ===== ხელი, კონტაქტი, ფოტო ===== */}
      <div className="flex justify-between items-start gap-6 mb-8">
        <div className="flex-1">
          {(personalInfo.name || personalInfo.lastName) && (
            <h2 className="text-3xl font-bold text-red-500 mb-4">
              {personalInfo.name} {personalInfo.lastName}
            </h2>
          )}

          {personalInfo.email && (
            <p className="text-sm mb-1 flex items-center gap-2 text-gray-700">
              <MailIcon className="w-4 h-4 text-gray-500 shrink-0" />
              {personalInfo.email}
            </p>
          )}

          {personalInfo.phone && (
            <p className="text-sm flex items-center gap-2 text-gray-700">
              <PhoneIcon className="w-4 h-4 text-gray-500 shrink-0" />
              {personalInfo.phone}
            </p>
          )}

          {personalInfo.aboutMe && (
            <div className="mt-6">
              <h3 className="text-red-500 font-bold mb-1">ჩემ შესახებ</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{personalInfo.aboutMe}</p>
            </div>
          )}
        </div>

        {personalInfo.image && (
          <img
            src={personalInfo.image}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 shrink-0"
          />
        )}
      </div>

      {/* ===== გამოცდილება ===== */}
      {hasExperiences && (
        <div className="mb-6">
          <h3 className="text-red-500 font-bold mb-2">გამოცდილება</h3>
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

      {/* ===== განათლება ===== */}
      {hasEducations && (
        <div>
          <h3 className="text-red-500 font-bold mb-2">განათლება</h3>
          {educations.map(
            (edu, i) =>
              edu.institute && (
                <div key={i} className="mb-4">
                  <p className="font-bold text-md">
                    {edu.institute}
                    {edu.degree && `, ${edu.degree}`}
                  </p>
                  {edu.dueDate && <p className="text-xs text-gray-500 italic">{edu.dueDate}</p>}
                  {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}