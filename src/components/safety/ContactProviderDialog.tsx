"use client";

import { useState, useRef, useEffect } from "react";
import { X, Mail, Send, Shield, Loader2, Clock, CheckCircle } from "lucide-react";
import { Provider } from "@/lib/types";

interface ContactProviderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  provider: Provider;
}

export default function ContactProviderDialog({
  isOpen,
  onClose,
  provider,
}: ContactProviderDialogProps) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
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

    if (!subject.trim() || !message.trim()) {
      setErrorMessage("Please provide both a subject and message.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    // Simulate API call - in production, this would call /api/contact
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubject("");
    setMessage("");
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
      aria-labelledby="contact-dialog-title"
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
            <div className="w-10 h-10 rounded-full bg-gradient-arcus flex items-center justify-center">
              <span className="text-white font-bold">
                {provider.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 id="contact-dialog-title" className="font-semibold text-slate-900">
                Contact Provider
              </h2>
              <p className="text-sm text-slate-500">{provider.name}</p>
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
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Message Sent
              </h3>
              <p className="text-slate-600 mb-2">
                Your message has been securely relayed to {provider.name}.
              </p>
              {provider.contact.responseTime && (
                <p className="text-sm text-slate-500 flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4" />
                  Typical response time: {provider.contact.responseTime}
                </p>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="btn-primary mt-6"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Privacy notice */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4 flex gap-3">
                <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm">
                  <p className="font-medium text-emerald-800">Privacy Protected</p>
                  <p className="text-emerald-700">
                    Your contact details are never shared. Messages are securely relayed
                    through ArcusPath to protect your privacy.
                  </p>
                </div>
              </div>

              {/* Response time */}
              {provider.contact.responseTime && (
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>Typical response time: {provider.contact.responseTime}</span>
                </div>
              )}

              {/* Subject */}
              <div className="mb-4">
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-slate-900 mb-2"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Inquiry about services"
                  maxLength={100}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-arcus-purple focus:border-transparent"
                  required
                />
              </div>

              {/* Message */}
              <div className="mb-4">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-slate-900 mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Introduce yourself and describe what you're looking for..."
                  rows={5}
                  maxLength={2000}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-arcus-purple focus:border-transparent resize-none"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  {message.length}/2000 characters
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
                  disabled={isSubmitting || !subject.trim() || !message.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
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
