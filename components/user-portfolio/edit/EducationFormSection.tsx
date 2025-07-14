import Button from "@/components/ui/Button";
import React from "react";

type Education = {
  institution_name: string;
  period: string;
  description: string;
};

type Props = {
  education: Education[];
  setEducation: (education: Education[]) => void;
  setHasChanges: (v: boolean) => void;
};

export default function EducationFormSection({ education, setEducation, setHasChanges }: Props) {
  const handleChange = (idx: number, field: keyof Education, value: string) => {
    const updated = education.map((edu, i) =>
      i === idx ? { ...edu, [field]: value } : edu
    );
    setEducation(updated);
    setHasChanges(true);
  };

  const handleAdd = () => {
    setEducation([
      ...education,
      { institution_name: "", period: "", description: "" },
    ]);
    setHasChanges(true);
  };

  const handleRemove = (idx: number) => {
    setEducation(education.filter((_, i) => i !== idx));
    setHasChanges(true);
  };

  return (
    <div>
      <h2 className="form-header mb-2">Education</h2>
      {education.map((edu, idx) => (
        <div key={idx} className="mb-2 pb-4">
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label className="form-label">Institution Name</label>
              <input
                className="form-input"
                value={edu.institution_name}
                onChange={e => handleChange(idx, "institution_name", e.target.value)}
                placeholder="e.g., Stanford University, MIT"
              />
            </div>
            <div>
              <label className="form-label">Period</label>
              <input
                className="form-input"
                value={edu.period}
                onChange={e => handleChange(idx, "period", e.target.value)}
                placeholder="e.g., 2019 - 2023"
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              rows={3}
              value={edu.description}
              onChange={e => handleChange(idx, "description", e.target.value)}
              placeholder="e.g., Bachelor of Technology in Computer Science, Graduated with honors"
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
        onClick={handleAdd}
        className="px-3 py-1 rounded"
      >
        + Add Education
      </Button>
    </div>
  );
}