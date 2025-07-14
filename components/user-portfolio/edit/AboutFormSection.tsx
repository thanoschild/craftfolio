import { FormDataType } from "@/types/PortfolioForm";
import React from "react";

type AboutFormSectionProps = {
  formData: FormDataType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function AboutFormSection({ formData, handleChange }: AboutFormSectionProps) {
  return (
    <div>
      <h2 className="form-header">About</h2>
      <textarea
        name="about"
        value={formData.about || ""}
        onChange={handleChange}
        className="form-input"
        rows={4}
      />
    </div>
  );
}