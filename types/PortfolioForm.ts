export type ProjectType = {
  project_name: string;
  project_url: string;
  description: string;
};

export type EducationType = {
  institution_name: string;
  description: string;
  period: string;
};

export type ExperienceType = {
  company_name: string;
  company_website_url: string;
  role: string;
  description: string;
  period: string;
  place: string;
};

export type OtherType = {
  title: string;
  link: string;
  description: string;
};

// Main FormDataType using the individual types
export type FormDataType = {
  id: string;
  name: string;
  email: string;
  moblie_no: string;
  address: string;
  current_role: string;
  about: string;
  image_url: string;
  open_to_work: boolean;
  live: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
  skills: string[];
  projects: ProjectType[];
  education: EducationType[];
  experience: ExperienceType[];
  other?: OtherType[]; // Optional since not all portfolios may have this
};