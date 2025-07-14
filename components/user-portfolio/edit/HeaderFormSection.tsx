import { FormDataType } from "@/types/PortfolioForm";
import React from "react";

type HeaderFormSectionProps = {
  formData: FormDataType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType | null>>;
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HeaderFormSection({  
  formData, 
  handleChange, 
  setFormData, 
  setHasChanges  }: HeaderFormSectionProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked
    });
    setHasChanges(true);
  };

  return (
    <div>
      <h2 className="form-header">Header</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
        <div>
          <label className="edit-label">Name</label>
          <input
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Location</label>
          <input
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
        <div>
          <label className="form-label">Email</label>
          <input
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Phone Number</label>
          <input
            name="moblie_no"
            value={formData.moblie_no || ""}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
        <div>
          <label className="form-label">Current Role</label>
          <input
            name="current_role"
            value={formData.current_role || ""}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., Software Engineer, Product Manager"
          />
        </div>
        <div>
          <label className="form-label">GitHub</label>
          <input
            name="github_url"
            value={formData.github_url || ""}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
        <div>
          <label className="form-label">LinkedIn</label>
          <input
            name="linkedin_url"
            value={formData.linkedin_url || ""}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Twitter/X</label>
          <input
            name="twitter_url"
            value={formData.twitter_url || ""}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
        <div className="flex items-center">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="open_to_work"
              checked={formData.open_to_work || false}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded focus:ring-2 focus:ring-light-text dark:focus:ring-dark-text"
            />
            <span className="form-label">Open to Work</span>
          </label>
        </div>
        <div>
          {/* Empty div to maintain grid layout */}
        </div>
      </div>
    </div>
  );
}