import React from "react";
import ExperienceFormSection from "./edit/ExperienceFormSection";
import ProjectFormSection from "./edit/ProjectFormSection";
import EducationFormSection from "./edit/EducationFormSection";
import SkillsFormSection from "./edit/SkillsFormSection";
import OtherFormSection from "./edit/OtherFormSection";
import HeaderFormSection from "./edit/HeaderFormSection";
import AboutFormSection from "./edit/AboutFormSection";
import { FormDataType } from "@/types/PortfolioForm";

type EditPortfolioProps = {
  formData: FormDataType | null;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType | null>>;
  hasChanges: boolean;
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditPortfolio({
  formData,
  setFormData,
  setHasChanges,
}: EditPortfolioProps) {
  if (!formData) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setHasChanges(true);
  };

  return (
    <form className="rounded-xl mx-auto space-y-8 mb-8">
      <HeaderFormSection
        formData={formData}
        handleChange={handleChange}
        setFormData={setFormData}
        setHasChanges={setHasChanges}
      />
      <AboutFormSection formData={formData} handleChange={handleChange} />
      <ExperienceFormSection
        experience={formData.experience || []}
        setExperience={(exp) => setFormData({ ...formData, experience: exp })}
        setHasChanges={setHasChanges}
      />
      <ProjectFormSection
        projects={formData.projects || []}
        setProjects={(projs) => setFormData({ ...formData, projects: projs })}
        setHasChanges={setHasChanges}
      />
      <EducationFormSection
        education={formData.education || []}
        setEducation={(edu) => setFormData({ ...formData, education: edu })}
        setHasChanges={setHasChanges}
      />
      <SkillsFormSection
        skills={formData.skills || []}
        setSkills={(skills) => setFormData({ ...formData, skills })}
        setHasChanges={setHasChanges}
      />
      <OtherFormSection
        other={formData.other || []}
        setOther={(other) => setFormData({ ...formData, other })}
        setHasChanges={setHasChanges}
      />
    </form>
  );
}
