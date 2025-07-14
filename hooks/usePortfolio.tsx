import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { parseJson } from "@/lib/parseJson";
import { generatePortfolioId } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { FormDataType } from "@/types/PortfolioForm";
import { normalizeFormData } from "@/lib/normalizeFormData";

type PortfolioData = {
  id: string;
  live: string;
  [key: string]: any;
};

export function usePortfolio() {
  const [formData, setFormData] = useState<FormDataType | null>(null);
  const [editedFormData, setEditedFormData] = useState<FormDataType | null>(
    null
  );
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [hasChanges, setHasChanges] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [redirectToUpload, setRedirectToUpload] = useState(false);
  const { user } = useUser();

  // API utility function
  const updatePortfolio = async (data: FormDataType) => {
    try {
      await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error updating portfolio:", error);
      throw error;
    }
  };

  useEffect(() => {
    async function loadPortfolio() {
      if (!user) return;

      setStatus("Fetching user data.");

      try {
        // Try to get existing portfolio
        const portfolioRes = await fetch("/api/portfolio", { method: "GET" });
        if (portfolioRes.ok) {
          const portfolio = await portfolioRes.json();
          if (portfolio.resumeData) {
            const normalizedData = normalizeFormData(portfolio.resumeData)
            setFormData(normalizedData);
            setPortfolioUrl(normalizedData.id || "");
            setStatus("");
            return;
          }
        }

        // Generate new portfolio from resume
        setStatus("Reading Resume.");
        const resumeRes = await fetch("/api/resume", { method: "GET" });
        if (!resumeRes.ok) {
          setStatus("");
          let errorMsg = "Could not read resume.";
          try {
            const errorData = await resumeRes.json();
            if (errorData && errorData.error) {
              errorMsg = errorData.error;
            }
          } catch {
            // fallback to default errorMsg
          }
          setError(errorMsg);
          setRedirectToUpload(true);
          return;
        }
        const resumeData = await resumeRes.json();

        setStatus("Generating Portfolio.");
        const geminiRes = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: resumeData.text }),
        });
        if (!geminiRes.ok) {
          setStatus("");
          setRedirectToUpload(true);
          return;
        }
        const geminiData = await geminiRes.json();
        const parsed = parseJson(geminiData.result);

        if (parsed && typeof parsed === "object") {
          const id = generatePortfolioId(parsed.name || "portfolio");
          const newFormData = {
            ...parsed,
            live: "false",
            id,
            image_url: user.imageUrl || "",
          };
          const normalizedData = normalizeFormData(newFormData);
          setFormData(normalizedData);
          setPortfolioUrl(id);
          await updatePortfolio(normalizedData);
        } else {
          setStatus("");
          setRedirectToUpload(true);
          return;
        }
        setStatus("");
      } catch (error) {
        setStatus("");
        setRedirectToUpload(true);
      }
    }

    loadPortfolio();
  }, [user]);

  // Actions
  const actions = {
    // Edit actions
    startEdit: () => {
      setEditedFormData(formData);
      setHasChanges(false);
    },

    discardChanges: () => {
      setEditedFormData(formData);
      setHasChanges(false);
    },

    saveChanges: async () => {
      if (!editedFormData) return;
      setFormData(editedFormData);
      setHasChanges(false);
      await updatePortfolio(editedFormData);
    },

    // Link actions
    updateLink: async (newLink: string) => {
      if (!formData) return;

      const updatedFormData = { ...formData, id: newLink };
      const updatedEditedFormData = editedFormData
        ? { ...editedFormData, id: newLink }
        : null;

      setFormData(updatedFormData);
      setPortfolioUrl(newLink);
      if (updatedEditedFormData) {
        setEditedFormData(updatedEditedFormData);
      }

      await updatePortfolio(updatedFormData);
    },

    // Publish actions
    toggleLive: async () => {
      if (!formData) return;

      const newLiveStatus = formData.live === "true" ? "false" : "true";
      const updatedFormData = { ...formData, live: newLiveStatus };
      const updatedEditedFormData = editedFormData
        ? { ...editedFormData, live: newLiveStatus }
        : null;

      setFormData(updatedFormData);
      if (updatedEditedFormData) {
        setEditedFormData(updatedEditedFormData);
      }

      await updatePortfolio(updatedFormData);
    },
  };

  return {
    // State
    formData,
    editedFormData,
    status,
    hasChanges,
    portfolioUrl,
    isLive: formData?.live === "true",
    redirectToUpload, 
    error,

    // Setters
    setEditedFormData,
    setHasChanges,

    // Actions
    ...actions,
  };
}
