"use client";

import React, { useEffect, useState } from "react";
import PreviewPortfolio from "./PreviewPortfolio";
import EditPortfolio from "./EditPortfolio";
import Button from "../ui/Button";
import { MdOutlineEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import EditPortfolioLinkModal from "./edit/EditPortfolioLinkModal";
import { FiUploadCloud } from "react-icons/fi";
import { usePortfolio } from "@/hooks/usePortfolio";
import Loader from "../ui/Loader";
import PortfolioLinkSection from "./edit/PortfolioLinkSection";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/ui/Toast";

export default function UserPortfolioPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "edit">("preview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const {
    formData,
    editedFormData,
    status,
    hasChanges,
    portfolioUrl,
    isLive,
    setEditedFormData,
    setHasChanges,
    startEdit,
    discardChanges,
    saveChanges,
    updateLink,
    toggleLive,
    redirectToUpload, 
    error
  } = usePortfolio();

  // Redirect if critical error or resume not found
  useEffect(() => {
    if (error) showToast.error(error);
    if (redirectToUpload) {
      router.replace("/upload");
    }
  }, [redirectToUpload, router, error]);

  const handleEdit = () => {
    setActiveTab("edit");
    startEdit();
  };

  const handleVisitSite = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${portfolioUrl}`,
      "_blank"
    );
  };

  if (status || !formData) {
    return <Loader size="lg" message={status || "Loading..."} />;
  }

  return (
    <div className="flex flex-col gap-12 mx-auto w-full max-w-5xl rounded-lg p-6">
      {/* Portfolio Link Section */}
      <PortfolioLinkSection
        portfolioUrl={portfolioUrl}
        isLive={isLive}
        onEditClick={() => setIsModalOpen(true)}
        onToggleLive={toggleLive}
        onVisitSite={handleVisitSite}
      />

      {/* Modal */}
      <EditPortfolioLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentLink={portfolioUrl}
        onSave={updateLink}
      />

      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex gap-3 sm:gap-4">
          <Button
            variant={activeTab === "preview" ? "primary" : "secondary"}
            onClick={() => setActiveTab("preview")}
            icon={<MdOutlineRemoveRedEye />}
            className="flex-1 sm:flex-none justify-center"
          >
            Preview
          </Button>
          <Button
            onClick={handleEdit}
            variant={activeTab === "edit" ? "primary" : "secondary"}
            icon={<MdOutlineEdit />}
            className="flex-1 sm:flex-none justify-center"
          >
            Edit
          </Button>
        </div>

        {/* Edit Actions */}
        {activeTab === "edit" && (
          <div className="flex gap-2 sm:gap-3">
            <Button
              variant="secondary"
              onClick={discardChanges}
              type="button"
              icon={<RxCross2 />}
              disabled={!hasChanges}
              className="flex-1 sm:flex-none sm:w-24 justify-center text-sm"
            >
              Discard
            </Button>
            <Button
              variant={hasChanges ? "primary" : "secondary"}
              onClick={saveChanges}
              type="button"
              icon={<FiUploadCloud />}
              disabled={!hasChanges}
              className="flex-1 sm:flex-none sm:w-24 justify-center text-sm"
            >
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      {activeTab === "preview" ? (
        <PreviewPortfolio formData={formData} />
      ) : (
        <EditPortfolio
          formData={editedFormData}
          setFormData={setEditedFormData}
          hasChanges={hasChanges}
          setHasChanges={setHasChanges}
        />
      )}
    </div>
  );
}
