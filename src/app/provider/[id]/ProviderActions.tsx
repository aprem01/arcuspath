"use client";

import { useState } from "react";
import { MapPin, Video, Clock, Flag, Send, Shield } from "lucide-react";
import { Provider } from "@/lib/types";
import ReportProviderDialog from "@/components/safety/ReportProviderDialog";
import ContactProviderDialog from "@/components/safety/ContactProviderDialog";

interface ProviderActionsProps {
  provider: Provider;
}

export default function ProviderActions({ provider }: ProviderActionsProps) {
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);

  return (
    <>
      {/* Contact Card */}
      <div className="card p-6 mb-6 lg:sticky lg:top-24">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Get in Touch
        </h2>

        {/* Privacy notice */}
        <div className="flex items-start gap-2 p-3 bg-emerald-50 rounded-lg mb-4">
          <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-emerald-800">
            Your contact info is never shared. Messages are securely relayed.
          </p>
        </div>

        <div className="space-y-4">
          {/* Primary CTA */}
          <button
            onClick={() => setShowContactDialog(true)}
            className="btn-primary w-full text-lg py-3 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" aria-hidden="true" />
            Contact Provider
          </button>

          {/* Response time */}
          {provider.contact.responseTime && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>Typical response: {provider.contact.responseTime}</span>
            </div>
          )}

          {/* Contact availability indicators */}
          <div className="flex flex-wrap gap-2 text-sm">
            {provider.contact.hasEmail && (
              <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded">
                Email available
              </span>
            )}
            {provider.contact.hasPhone && (
              <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded">
                Phone available
              </span>
            )}
            {provider.contact.hasWebsite && (
              <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded">
                Website available
              </span>
            )}
          </div>
        </div>

        <hr className="my-6" />

        {/* Location info */}
        <div className="text-sm text-slate-500 space-y-2">
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span>
              {provider.location.city}, {provider.location.state}
            </span>
          </p>
          {provider.location.virtual && (
            <p className="flex items-center gap-2 text-arcus-teal">
              <Video className="w-4 h-4" aria-hidden="true" />
              <span>Virtual appointments available</span>
            </p>
          )}
          {provider.location.serviceArea && provider.location.serviceArea.length > 0 && (
            <p className="text-xs text-slate-400">
              Service area: {provider.location.serviceArea.join(", ")}
            </p>
          )}
        </div>

        <hr className="my-6" />

        {/* Report link */}
        <button
          onClick={() => setShowReportDialog(true)}
          className="w-full flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-red-600 py-2 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Flag className="w-4 h-4" aria-hidden="true" />
          Report a concern
        </button>
      </div>

      {/* Dialogs */}
      <ContactProviderDialog
        isOpen={showContactDialog}
        onClose={() => setShowContactDialog(false)}
        provider={provider}
      />

      <ReportProviderDialog
        isOpen={showReportDialog}
        onClose={() => setShowReportDialog(false)}
        providerId={provider.id}
        providerName={provider.name}
      />
    </>
  );
}
