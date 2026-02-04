import { Report, ReportReason, ReportStatus, ModerationAction } from "@/lib/types";

// =============================================================================
// REPORTS DATA STORE
// In production, this would be a database. For MVP, we use in-memory storage.
// =============================================================================

// In-memory storage (will reset on server restart)
let reports: Report[] = [];
let moderationActions: ModerationAction[] = [];

// ID generators
let reportIdCounter = 1;
let actionIdCounter = 1;

// =============================================================================
// REPORT FUNCTIONS
// =============================================================================

/**
 * Create a new report
 * Privacy-safe: Only stores anonymous session ID, not user identity
 */
export function createReport(
  providerId: string,
  reason: ReportReason,
  description: string,
  sessionId: string
): Report {
  const now = new Date().toISOString();

  const report: Report = {
    id: `report-${reportIdCounter++}`,
    providerId,
    reason,
    description: description.trim().slice(0, 2000), // Limit description length
    status: "pending",
    reporterSessionId: sessionId,
    createdAt: now,
    updatedAt: now,
  };

  reports.push(report);
  return report;
}

/**
 * Get all reports (for moderation)
 */
export function getAllReports(status?: ReportStatus): Report[] {
  if (status) {
    return reports.filter((r) => r.status === status);
  }
  return [...reports];
}

/**
 * Get reports for a specific provider
 */
export function getReportsByProvider(providerId: string): Report[] {
  return reports.filter((r) => r.providerId === providerId);
}

/**
 * Get report by ID
 */
export function getReportById(id: string): Report | undefined {
  return reports.find((r) => r.id === id);
}

/**
 * Update report status (moderation action)
 */
export function updateReportStatus(
  reportId: string,
  status: ReportStatus,
  moderatorNotes?: string,
  resolution?: string
): Report | undefined {
  const report = reports.find((r) => r.id === reportId);
  if (!report) return undefined;

  report.status = status;
  report.updatedAt = new Date().toISOString();

  if (moderatorNotes) {
    report.moderatorNotes = moderatorNotes;
  }

  if (resolution) {
    report.resolution = resolution;
    report.resolvedAt = new Date().toISOString();
  }

  return report;
}

/**
 * Get pending report count for a provider
 */
export function getPendingReportCount(providerId: string): number {
  return reports.filter(
    (r) => r.providerId === providerId && (r.status === "pending" || r.status === "reviewing")
  ).length;
}

// =============================================================================
// MODERATION ACTIONS
// =============================================================================

/**
 * Create a moderation action
 */
export function createModerationAction(
  providerId: string,
  action: ModerationAction["action"],
  reason: string,
  performedBy: string,
  reportId?: string
): ModerationAction {
  const moderationAction: ModerationAction = {
    id: `action-${actionIdCounter++}`,
    providerId,
    reportId,
    action,
    reason,
    performedBy,
    performedAt: new Date().toISOString(),
  };

  moderationActions.push(moderationAction);
  return moderationAction;
}

/**
 * Get moderation actions for a provider
 */
export function getModerationActions(providerId: string): ModerationAction[] {
  return moderationActions.filter((a) => a.providerId === providerId);
}

/**
 * Get all moderation actions
 */
export function getAllModerationActions(): ModerationAction[] {
  return [...moderationActions];
}

// =============================================================================
// STATISTICS (for admin dashboard)
// =============================================================================

export function getReportStats() {
  const total = reports.length;
  const pending = reports.filter((r) => r.status === "pending").length;
  const reviewing = reports.filter((r) => r.status === "reviewing").length;
  const resolved = reports.filter((r) => r.status === "resolved").length;
  const dismissed = reports.filter((r) => r.status === "dismissed").length;

  const byReason = reports.reduce(
    (acc, r) => {
      acc[r.reason] = (acc[r.reason] || 0) + 1;
      return acc;
    },
    {} as Record<ReportReason, number>
  );

  return {
    total,
    pending,
    reviewing,
    resolved,
    dismissed,
    byReason,
  };
}

// =============================================================================
// DEMO DATA (for testing - remove in production)
// =============================================================================

export function seedDemoReports() {
  // Only seed if empty
  if (reports.length > 0) return;

  // Add a sample resolved report for demo
  reports.push({
    id: "report-demo-1",
    providerId: "10", // Robert Martinez - has lower verification
    reason: "misrepresentation",
    description:
      "Provider claimed to be an expert in transgender health insurance but seemed unfamiliar with basic coverage questions.",
    status: "resolved",
    reporterSessionId: "demo-session-1",
    createdAt: "2024-10-15T10:00:00Z",
    updatedAt: "2024-10-18T14:30:00Z",
    resolvedAt: "2024-10-18T14:30:00Z",
    moderatorNotes: "Contacted provider. They acknowledged gap and committed to additional training.",
    resolution: "Provider received guidance and agreed to update their expertise claims.",
  });

  reportIdCounter = 2;
}

// Initialize demo data
seedDemoReports();
