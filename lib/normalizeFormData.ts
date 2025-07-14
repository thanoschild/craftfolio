import { FormDataType } from "@/types/PortfolioForm";


export function normalizeFormData(data: unknown): FormDataType {
  if (typeof data !== 'object' || data === null) {
    throw new Error("Invalid input for normalizeFormData");
  }

  const safeData = data as Partial<FormDataType>;

  return {
    id: safeData.id || "",
    name: safeData.name || "",
    email: safeData.email || "",
    moblie_no: safeData.moblie_no || "",
    address: safeData.address || "",
    current_role: safeData.current_role || "",
    about: safeData.about || "",
    image_url: safeData.image_url || "",
    open_to_work: safeData.open_to_work || false,
    live: safeData.live || "false",
    github_url: safeData.github_url || "",
    linkedin_url: safeData.linkedin_url || "",
    twitter_url: safeData.twitter_url || "",
    skills: Array.isArray(safeData.skills) ? safeData.skills : [],
    projects: Array.isArray(safeData.projects)
      ? safeData.projects.map((project) => ({
          project_name: project?.project_name || "",
          project_url: project?.project_url || "",
          description: project?.description || "",
        }))
      : [],
    education: Array.isArray(safeData.education)
      ? safeData.education.map((edu) => ({
          institution_name: edu?.institution_name || "",
          description: edu?.description || "",
          period: edu?.period || "",
        }))
      : [],
    experience: Array.isArray(safeData.experience)
      ? safeData.experience.map((exp) => ({
          company_name: exp?.company_name || "",
          company_website_url: exp?.company_website_url || "",
          role: exp?.role || "",
          description: exp?.description || "",
          period: exp?.period || "",
          place: exp?.place || "",
        }))
      : [],
    other: Array.isArray(safeData.other)
      ? safeData.other.map((item) => ({
          title: item?.title || "",
          link: item?.link || "",
          description: item?.description || "",
        }))
      : [],
  };
}
