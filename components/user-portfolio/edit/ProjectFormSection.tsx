import Button from "@/components/ui/Button";
import React from "react";

type Project = {
  project_name: string;
  project_url: string;
  description: string;
};

type Props = {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  setHasChanges: (v: boolean) => void;
};

export default function ProjectFormSection({ projects, setProjects, setHasChanges }: Props) {
  const handleChange = (idx: number, field: keyof Project, value: string) => {
    const updated = projects.map((proj, i) =>
      i === idx ? { ...proj, [field]: value } : proj
    );
    setProjects(updated);
    setHasChanges(true);
  };

  const handleAdd = () => {
    setProjects([
      ...projects,
      { project_name: "", project_url: "", description: "" },
    ]);
    setHasChanges(true);
  };

  const handleRemove = (idx: number) => {
    setProjects(projects.filter((_, i) => i !== idx));
    setHasChanges(true);
  };

  return (
    <div>
      <h2 className="form-header mb-2">Projects</h2>
      {projects.map((proj, idx) => (
        <div key={idx} className="mb-2 pb-4">
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label className="form-label">Project Name</label>
              <input
                className="form-input"
                value={proj.project_name}
                onChange={e => handleChange(idx, "project_name", e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Project URL</label>
              <input
                className="form-input"
                value={proj.project_url}
                onChange={e => handleChange(idx, "project_url", e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              value={proj.description}
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
        + Add Project
      </Button>
    </div>
  );
}