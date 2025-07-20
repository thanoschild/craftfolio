"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PiMagicWand } from "react-icons/pi";
import Button from "../ui/Button";
import { RiFileCheckLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import { IoCloudUploadOutline } from "react-icons/io5";
import Loader from "../ui/Loader";

type UploadState = {
  fileName: string;
  fileData: File | null;
  error: string;
  loader: boolean;
  uploaded: boolean;
  isExistingResume: boolean;
};

export default function UploadPage() {
  const [fileState, setFileState] = useState<UploadState>({
    fileName: "",
    fileData: null,
    error: "",
    loader: false,
    uploaded: false,
    isExistingResume: false
  });

  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setFileState({
        fileName: "",
        fileData: null,
        error: "File size exceeds 10MB limit.",
        loader: false,
        uploaded: false,
        isExistingResume: false,
      });
      return;
    }

    if (file.type !== "application/pdf") {
      setFileState({
        fileName: "",
        fileData: null,
        error: "Only PDF files are allowed.",
        loader: false,
        uploaded: false,
        isExistingResume: false,
      });
      return;
    }

    setFileState((prev) => ({
      ...prev,
      fileName: file.name,
      fileData: file,
      error: "",
      loader: true,
      uploaded: false,
      isExistingResume: false
    }));

    await fetch("/api/portfolio", {
      method: "DELETE",
    });

    const formData = new FormData();
    formData.append("file", file);
    console.log("file-name: ", file.name)
    formData.append("fileName", file.name)

    const res = await fetch("/api/resume", {
      method: "POST",
      body: formData,
    });

    setFileState((prev) => ({
      ...prev,
      loader: false,
      uploaded: res.ok,
      error: res.ok ? "" : "Failed to upload file. Please try again.",
    }));
  };

  const handleGoToPreview = () => {
    if (fileState.uploaded) router.push("/user-portfolio");
  };

  const handleRemoveFile = () => {
    setFileState({
      fileName: "",
      fileData: null,
      error: "",
      loader: false,
      uploaded: false,
      isExistingResume: false
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {

    const checkResume = async () => {
      try {
        const response = await fetch("/api/resume", {
          method: "GET",
        });
        if(response.ok) {
          const { fileName } = await response.json();

          setFileState({
            fileName: fileName,
            fileData: null,
            error: "",
            loader: false,
            uploaded: true,
            isExistingResume: true,
          });
        }
      } catch (error) {
        console.error("Error checking resume status:", error);
        setFileState({
          fileName: "",
          fileData: null,
          error: "Failed to check resume status.",
          loader: false,
          uploaded: false,
          isExistingResume: false
        });
      } finally {
        setInitialLoading(false);
      }
    };

    checkResume();
  }, []);

    if (initialLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 md:gap-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-light-text dark:text-dark-text">
          Upload your resume
        </h1>
        <p className="text-sm sm:text-base text-light-text-sub dark:text-dark-text-sub">
          Transform your PDF resume into a beautiful portfolio
        </p>
      </div>

      {/* Upload Section */}
      <label
        htmlFor="uploadFile1"
        className="w-full max-w-md sm:max-w-lg min-h-[160px] sm:min-h-[180px] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 bg-light-bg-sub dark:bg-dark-bg-sub border-2 border-dashed border-light-border-sub dark:border-dark-border-sub hover:border-light-text dark:hover:border-dark-text hover:bg-light-bg dark:hover:bg-dark-bg group"
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) {
            const event = {
              target: { files: [file] },
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            handleChange(event);
          }
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center justify-center p-4 sm:p-6">
          {/* Upload Icon */}
          <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-light-border dark:border-dark-border group-hover:border-light-text dark:group-hover:border-dark-text mb-3 sm:mb-4 transition-colors">
            <IoCloudUploadOutline className="text-xl sm:text-2xl text-light-text-sub dark:text-dark-text-sub group-hover:text-light-text dark:group-hover:text-dark-text transition-colors" />
          </div>

          {/* Upload Text */}
          <p className="text-sm sm:text-base font-medium text-light-text dark:text-dark-text text-center mb-1">
            Drop PDF here or click to browse
          </p>
          <p className="text-xs sm:text-sm text-light-text-sub dark:text-dark-text-sub">
            Max size: 10MB
          </p>

          {/* File Display */}
          {fileState.fileName && (
            <div className="mt-3 sm:mt-4 flex items-center gap-2 p-2 bg-light-bg dark:bg-dark-bg rounded-md border border-light-border-sub dark:border-dark-border-sub max-w-full">
              <RiFileCheckLine className="text-light-text-sub dark:text-dark-text-sub flex-shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-[180px] text-xs sm:text-sm text-light-text dark:text-dark-text font-medium">
                {fileState.fileName}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveFile();
                }}
                className="text-light-text-sub dark:text-dark-text-sub hover:text-light-text dark:hover:text-dark-text transition-colors flex-shrink-0"
                aria-label="Remove file"
              >
                <RxCrossCircled className="text-base sm:text-lg" />
              </button>
            </div>
          )}
        </div>

        <input
          type="file"
          id="uploadFile1"
          ref={fileInputRef}
          className="hidden"
          accept="application/pdf"
          onChange={handleChange}
        />
      </label>

      {/* Status Messages */}
      <div className="w-full max-w-md sm:max-w-lg space-y-3">
        {/* Loading */}
        {fileState.loader && (
          <div className="flex items-center justify-center p-3 bg-light-bg-sub dark:bg-dark-bg-sub border border-light-border-sub dark:border-dark-border-sub rounded-lg">
            <Loader message="Processing." size="sm" />
          </div>
        )}

        {/* Error */}
        {fileState.error && (
          <div className="p-3 bg-light-bg-sub dark:bg-dark-bg-sub border-2 border-light-border dark:border-dark-border rounded-lg">
            <p className="text-sm text-light-text dark:text-dark-text text-center">
              ⚠️ {fileState.error}
            </p>
          </div>
        )}

        {/* Success */}
        {fileState.uploaded && !fileState.loader && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm sm:text-base text-green-600 dark:text-green-400 text-center">
              {fileState.isExistingResume ? "✓ Already have Resume. Ready to generate your portfolio." : "✓ Resume uploaded successfully." }
            </p>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <Button
        variant="primary"
        disabled={!fileState.uploaded || fileState.loader}
        onClick={handleGoToPreview}
        className="py-5"
      >
        <PiMagicWand className="text-lg sm:text-xl" />
        <span>Generate Portfolio</span>
      </Button>
    </div>
  );
}
