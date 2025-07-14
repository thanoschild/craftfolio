import Button from "@/components/ui/Button";
import React from "react";

type Other = {
  title: string;
  link: string;
  description: string;
};

type Props = {
  other: Other[];
  setOther: (other: Other[]) => void;
  setHasChanges: (v: boolean) => void;
};

export default function OtherFormSection({ other, setOther, setHasChanges }: Props) {
  const handleChange = (idx: number, field: keyof Other, value: string) => {
    const updated = other.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setOther(updated);
    setHasChanges(true);
  };

  const handleAdd = () => {
    setOther([
      ...other,
      { title: "", link: "", description: "" },
    ]);
    setHasChanges(true);
  };

  const handleRemove = (idx: number) => {
    setOther(other.filter((_, i) => i !== idx));
    setHasChanges(true);
  };

  return (
    <div>
      <h2 className="form-header mb-2">Other</h2>
      {other.map((item, idx) => (
        <div key={idx} className="mb-2 pb-4">
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label className="form-label">Title</label>
              <input
                className="form-input"
                value={item.title}
                onChange={e => handleChange(idx, "title", e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Link</label>
              <input
                className="form-input"
                value={item.link}
                onChange={e => handleChange(idx, "link", e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              value={item.description}
              onChange={e => handleChange(idx, "description", e.target.value)}
              rows={2}
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
        + Add Other
      </Button>
    </div>
  );
}