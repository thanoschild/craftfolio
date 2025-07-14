import React from "react";
import Button from "@/components/ui/Button";
import { ExperienceType } from "@/types/PortfolioForm";


type Props = {
  experience: ExperienceType[];
  setExperience: (exp: ExperienceType[]) => void;
  setHasChanges: (v: boolean) => void;
};

export default function ExperienceFormSection({ experience, setExperience, setHasChanges }: Props) {
  const handleChange = (idx: number, field: keyof ExperienceType, value: string) => {
    const updated = experience.map((exp, i) =>
      i === idx ? { ...exp, [field]: value } : exp
    );
    setExperience(updated);
    setHasChanges(true);
  };

  const handleAdd = () => {
    setExperience([
      ...experience,
      { company_name: "", role: "", period: "", place: "", company_website_url: "", description: "" },
    ]);
    setHasChanges(true);
  };

  const handleRemove = (idx: number) => {
    setExperience(experience.filter((_, i) => i !== idx));
    setHasChanges(true);
  };

  return (
    <div>
      <h2 className="form-header mb-2">Experience</h2>
      {experience.map((exp, idx) => (
        <div key={idx} className="mb-2 pb-4">
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label className="form-label">Company Name</label>
              <input
                className="form-input"
                value={exp.company_name || ""}
                onChange={e => handleChange(idx, "company_name", e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Role</label>
              <input
                className="form-input"
                value={exp.role || ""}
                onChange={e => handleChange(idx, "role", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label className="form-label">Period</label>
              <input
                className="form-input"
                value={exp.period || ""}
                onChange={e => handleChange(idx, "period", e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Company website url</label>
              <input
                className="form-input"
                value={exp.company_website_url || ""}
                onChange={e => handleChange(idx, "company_website_url", e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              value={exp.description}
              onChange={e => handleChange(idx, "description", e.target.value)}
              rows={3}
            />
          </div>
          <button
            type="button"
            className="text-red-500 text-xs mt-2"
            onClick={() => handleRemove(idx)}
          >
            Remove
          </button>
        </div>
      ))}
      <Button
        type="button"
        variant="primary"
        className="px-3 py-1 rounded"
        onClick={handleAdd}
      >
        + Add Experience
      </Button>
    </div>
  );
}