import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, User, MapPin, FileText, Shield, CheckCircle } from "lucide-react";
import ApplicationReviewActions from "./ApplicationReviewActions";

export const metadata = {
  title: "Review Application | Admin - ArcusPath",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ReviewApplicationPage({ params }: Props) {
  const { id } = await params;

  const application = await prisma.providerApplication.findUnique({
    where: { id },
    include: {
      provider: {
        include: {
          user: {
            select: { id: true, name: true, email: true, image: true },
          },
          category: true,
          credentials: true,
        },
      },
    },
  });

  if (!application) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin/applications"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Applications
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Review Application
          </h1>
          <p className="text-gray-600">
            {application.provider.name || application.provider.user.name}
          </p>
        </div>
        <ApplicationReviewActions
          applicationId={application.id}
          providerId={application.providerId}
          currentStatus={application.status}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Basic Info */}
          <Section
            icon={<User className="w-5 h-5" />}
            title="Basic Information"
            step={1}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Provider Name" value={application.provider.name} />
              <Field
                label="Business Name"
                value={application.provider.businessName}
              />
              <Field
                label="Category"
                value={application.provider.category?.name}
              />
              <Field
                label="Year Established"
                value={application.provider.yearEstablished?.toString()}
              />
              <Field
                label="Email"
                value={application.provider.email}
                className="col-span-2"
              />
              <Field
                label="Phone"
                value={application.provider.phone}
              />
              <Field
                label="Website"
                value={application.provider.website}
              />
            </div>
            {application.provider.description && (
              <Field
                label="Description"
                value={application.provider.description}
                className="mt-4"
              />
            )}
          </Section>

          {/* Step 2: Location */}
          <Section
            icon={<MapPin className="w-5 h-5" />}
            title="Location & Service Area"
            step={2}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="City" value={application.provider.city} />
              <Field label="State" value={application.provider.state} />
              <Field label="ZIP Code" value={application.provider.zipCode} />
              <Field
                label="Virtual Services"
                value={application.provider.virtual ? "Yes" : "No"}
              />
            </div>
          </Section>

          {/* Step 3: Credentials */}
          <Section
            icon={<FileText className="w-5 h-5" />}
            title="Credentials"
            step={3}
          >
            {application.provider.credentials.length === 0 ? (
              <p className="text-gray-500">No credentials submitted</p>
            ) : (
              <div className="space-y-3">
                {application.provider.credentials.map((cred) => (
                  <div
                    key={cred.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{cred.name}</p>
                      <p className="text-sm text-gray-500">
                        {cred.type} {cred.licenseNumber && `• ${cred.licenseNumber}`}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        cred.status === "VERIFIED"
                          ? "bg-green-100 text-green-700"
                          : cred.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {cred.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Step 4: Trust Profile */}
          <Section
            icon={<Shield className="w-5 h-5" />}
            title="Trust Profile"
            step={4}
          >
            <Field
              label="Affirming Statement"
              value={application.provider.affirmationStatement}
            />
            <Field
              label="LGBTQ+ Owned"
              value={application.provider.lgbtqOwned ? "Yes" : "No"}
              className="mt-4"
            />
          </Section>

          {/* Step 5: Review */}
          <Section
            icon={<CheckCircle className="w-5 h-5" />}
            title="Application Status"
            step={5}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Current Step" value={`${application.currentStep}/5`} />
              <Field label="Status" value={application.status} />
              <Field
                label="Submitted At"
                value={
                  application.submittedAt
                    ? new Date(application.submittedAt).toLocaleString()
                    : "Not submitted"
                }
              />
              <Field
                label="Last Updated"
                value={new Date(application.updatedAt).toLocaleString()}
              />
            </div>
          </Section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Applicant Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Applicant</h3>
            <div className="flex items-center gap-3">
              {application.provider.user.image ? (
                <img
                  src={application.provider.user.image}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900">
                  {application.provider.user.name}
                </p>
                <p className="text-sm text-gray-500">
                  {application.provider.user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-3">
              <TimelineItem
                label="Application Started"
                date={application.createdAt}
              />
              {application.submittedAt && (
                <TimelineItem
                  label="Submitted for Review"
                  date={application.submittedAt}
                />
              )}
              {application.status === "APPROVED" && (
                <TimelineItem label="Approved" date={application.updatedAt} />
              )}
              {application.status === "REJECTED" && (
                <TimelineItem label="Rejected" date={application.updatedAt} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  step,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  step: number;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
          {icon}
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">Step {step}</p>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  className = "",
}: {
  label: string;
  value?: string | null;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-gray-900">{value || "-"}</p>
    </div>
  );
}

function TimelineItem({ label, date }: { label: string; date: Date }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 mt-2 bg-purple-500 rounded-full" />
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">
          {new Date(date).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
