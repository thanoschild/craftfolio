import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

type Props = {
  skills: string[];
  setSkills: (skills: string[]) => void;
  setHasChanges: (v: boolean) => void;
};

export default function SkillsFormSection({ skills, setSkills, setHasChanges }: Props) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setHasChanges(true);
      setInput("");
    }
  };

  const handleRemove = (idx: number) => {
    setSkills(skills.filter((_, i) => i !== idx));
    setHasChanges(true);
  };

  return (
    <div>
      <h2 className="form-header mb-2">Skills</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="flex items-center section-skill"
          >
            {skill}
            <button
              type="button"
              className="ml-1 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 text-xs transition-colors duration-200"
              onClick={() => handleRemove(idx)}
              aria-label="Remove skill"
            >
              <RxCross2/>
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="form-input flex-1"
          placeholder="Add a skill"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <Button
          type="button"
          variant="primary"
          className="px-4 py-5 rounded-lg"
          onClick={handleAdd}
        >
          + Add Skill
        </Button>
      </div>
    </div>
  );
}