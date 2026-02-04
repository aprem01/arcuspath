"use client";

import { useState, useRef, useEffect } from "react";
import { X, AlertTriangle, Shield, Loader2 } from "lucide-react";
import { reportReasons } from "@/data/categories";
import { ReportReason } from "@/lib/types";

interface ReportProviderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  providerId: string;
  providerName: string;
}

export default function ReportProviderDialog({
  isOpen,
  onClose,
  providerId,
  providerName,
}: ReportProviderDialogProps) {
  const [selectedReason, setSelectedReason] = useState<ReportReason | "">("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and escape key handling
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedReason || description.trim().length < 10) {
      setErrorMessage("Please select a reason and provide a description (at least 10 characters).");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          providerId,
          reason: selectedReason,
          description: description.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.error?.message || "Failed to submit report. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedReason("");
    setDescription("");
    setSubmitStatus("idle");
    setErrorMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={dialogRef}
        className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600" aria-hidden="true" />
            </div>
            <div>
              <h2 id="report-dialog-title" className="font-semibold text-slate-900">
                Report Provider
              </h2>
              <p className="text-sm text-slate-500">{providerName}</p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {submitStatus === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Report Submitted
              </h3>
              <p className="text-slate-600 mb-6">
                Thank you for helping keep our community safe. We take all reports
                seriously and will review this promptly.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="btn-primary"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Safety notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800">Your safety matters</p>
                  <p className="text-amber-700">
                    Your report is anonymous. We will never share your identity with
                    the provider.
                  </p>
                </div>
              </div>

              {/* Reason selection */}
              <fieldset className="mb-4">
                <legend className="block text-sm font-medium text-slate-900 mb-2">
                  What happened? <span className="text-red-500">*</span>
                </legend>
                <div className="space-y-2">
                  {reportReasons.map((reason) => (
                    <label
                      key={reason.id}
                      className={`
                        flex items-start gap-3 p-3 rounded-lg border cursor-pointer
                        transition-colors
                        ${
                          selectedReason === reason.id
                            ? "border-arcus-purple bg-purple-50"
                            : "border-slate-200 hover:border-slate-300"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={reason.id}
                        checked={selectedReason === reason.id}
                        onChange={(e) => setSelectedReason(e.target.value as ReportReason)}
                        className="mt-1 text-arcus-purple focus:ring-arcus-purple"
                      />
                      <div>
                        <span className="block font-medium text-slate-900">
                          {reason.label}
                        </span>
                        <span className="block text-sm text-slate-500">
                          {reason.description}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="report-description"
                  className="block text-sm font-medium text-slate-900 mb-2"
                >
                  Tell us more <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="report-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please provide specific details about what happened. This helps us investigate thoroughly..."
                  rows={4}
                  maxLength={2000}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-arcus-purple focus:border-transparent resize-none"
                  required
                  minLength={10}
                />
                <p className="text-xs text-slate-500 mt-1">
                  {description.length}/2000 characters (minimum 10)
                </p>
              </div>

              {/* Error message */}
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                  disabled={isSubmitting || !selectedReason || description.trim().length < 10}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
