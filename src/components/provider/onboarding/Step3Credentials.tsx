"use client";

import { useState } from "react";
import { Plus, X, Upload, FileText, CheckCircle } from "lucide-react";

interface Credential {
  id: string;
  type: string;
  name: string;
  issuingBody: string;
  licenseNumber?: string;
  expiresAt?: string;
  documentName?: string;
}

export type Step3Data = {
  credentials: Credential[];
  specialties: string[];
  languages: string[];
};

interface Step3CredentialsProps {
  data: Partial<Step3Data>;
  onNext: (data: Step3Data) => void;
  onBack: () => void;
}

const CREDENTIAL_TYPES = [
  { value: "LICENSE", label: "Professional License" },
  { value: "CERTIFICATION", label: "Certification" },
  { value: "DEGREE", label: "Degree/Education" },
  { value: "TRAINING", label: "Training Certificate" },
  { value: "MEMBERSHIP", label: "Professional Membership" },
  { value: "OTHER", label: "Other" },
];

const COMMON_LANGUAGES = [
  "English",
  "Spanish",
  "Mandarin",
  "Cantonese",
  "French",
  "Vietnamese",
  "Korean",
  "Japanese",
  "Arabic",
  "Hindi",
  "Portuguese",
  "Russian",
  "German",
  "ASL",
];

export default function Step3Credentials({
  data,
  onNext,
  onBack,
}: Step3CredentialsProps) {
  const [credentials, setCredentials] = useState<Credential[]>(
    data.credentials || []
  );
  const [specialties, setSpecialties] = useState<string[]>(
    data.specialties || []
  );
  const [languages, setLanguages] = useState<string[]>(
    data.languages || ["English"]
  );
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [showCredentialForm, setShowCredentialForm] = useState(false);
  const [credentialForm, setCredentialForm] = useState<Partial<Credential>>({
    type: "LICENSE",
  });

  const addCredential = () => {
    if (credentialForm.name && credentialForm.type) {
      setCredentials([
        ...credentials,
        {
          ...credentialForm,
          id: crypto.randomUUID(),
          type: credentialForm.type!,
          name: credentialForm.name!,
          issuingBody: credentialForm.issuingBody || "",
        },
      ]);
      setCredentialForm({ type: "LICENSE" });
      setShowCredentialForm(false);
    }
  };

  const removeCredential = (id: string) => {
    setCredentials(credentials.filter((c) => c.id !== id));
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !specialties.includes(newSpecialty.trim())) {
      setSpecialties([...specialties, newSpecialty.trim()]);
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    setSpecialties(specialties.filter((s) => s !== specialty));
  };

  const toggleLanguage = (language: string) => {
    if (languages.includes(language)) {
      setLanguages(languages.filter((l) => l !== language));
    } else {
      setLanguages([...languages, language]);
    }
  };

  const addCustomLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ credentials, specialties, languages });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Credentials Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Your Credentials
          </h2>
          <p className="text-gray-600 text-sm">
            Add your professional licenses, certifications, and training.
            Verified credentials build trust with clients.
          </p>
        </div>

        {/* Existing Credentials */}
        {credentials.length > 0 && (
          <div className="space-y-3">
            {credentials.map((credential) => (
              <div
                key={credential.id}
                className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{credential.name}</p>
                    <p className="text-sm text-gray-600">
                      {CREDENTIAL_TYPES.find((t) => t.value === credential.type)
                        ?.label || credential.type}
                      {credential.issuingBody && ` • ${credential.issuingBody}`}
                    </p>
                    {credential.licenseNumber && (
                      <p className="text-xs text-gray-500">
                        License #: {credential.licenseNumber}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeCredential(credential.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Credential Form */}
        {showCredentialForm ? (
          <div className="border-2 border-dashed border-purple-200 rounded-xl p-4 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={credentialForm.type}
                  onChange={(e) =>
                    setCredentialForm({ ...credentialForm, type: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  {CREDENTIAL_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credential Name *
                </label>
                <input
                  type="text"
                  value={credentialForm.name || ""}
                  onChange={(e) =>
                    setCredentialForm({ ...credentialForm, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Licensed Clinical Social Worker"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issuing Body
                </label>
                <input
                  type="text"
                  value={credentialForm.issuingBody || ""}
                  onChange={(e) =>
                    setCredentialForm({
                      ...credentialForm,
                      issuingBody: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., California BBS"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  License/Certificate Number
                </label>
                <input
                  type="text"
                  value={credentialForm.licenseNumber || ""}
                  onChange={(e) =>
                    setCredentialForm({
                      ...credentialForm,
                      licenseNumber: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Optional"
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowCredentialForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addCredential}
                disabled={!credentialForm.name}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                Add Credential
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowCredentialForm(true)}
            className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Credential
          </button>
        )}

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
          <Upload className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">
              Document upload coming soon
            </p>
            <p className="text-sm text-blue-700">
              You'll be able to upload supporting documents after submitting your
              application.
            </p>
          </div>
        </div>
      </div>

      {/* Specialties Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Specialties</h2>
          <p className="text-gray-600 text-sm">
            What areas do you specialize in? This helps clients find you.
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newSpecialty}
            onChange={(e) => setNewSpecialty(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSpecialty();
              }
            }}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="e.g., Gender Identity, Trauma Recovery"
          />
          <button
            type="button"
            onClick={addSpecialty}
            className="px-4 py-2.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {specialties.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <span
                key={specialty}
                className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                {specialty}
                <button
                  type="button"
                  onClick={() => removeSpecialty(specialty)}
                  className="hover:text-purple-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Languages Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Languages</h2>
          <p className="text-gray-600 text-sm">
            What languages can you provide services in?
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {COMMON_LANGUAGES.map((language) => (
            <button
              key={language}
              type="button"
              onClick={() => toggleLanguage(language)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                languages.includes(language)
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {languages.includes(language) && (
                <CheckCircle className="w-4 h-4 inline mr-1" />
              )}
              {language}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustomLanguage();
              }
            }}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Add another language..."
          />
          <button
            type="button"
            onClick={addCustomLanguage}
            className="px-4 py-2.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90"
        >
          Next: Trust Profile
        </button>
      </div>
    </form>
  );
}
