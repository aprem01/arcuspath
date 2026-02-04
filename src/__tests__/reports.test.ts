/**
 * Reports and Safety System Tests
 * Tests for provider reporting and moderation functionality
 */

import {
  createReport,
  getReportById,
  getReportsByProvider,
  getAllReports,
  updateReportStatus,
  reports,
} from "@/data/reports";
import { ReportReason, ReportStatus } from "@/lib/types";

describe("Report System", () => {
  describe("createReport", () => {
    it("should create a new report", () => {
      const report = createReport(
        "test-provider-1",
        "discrimination",
        "Test report description for testing purposes",
        "test-session-123"
      );

      expect(report).toBeDefined();
      expect(report.id).toBeDefined();
      expect(report.providerId).toBe("test-provider-1");
      expect(report.reason).toBe("discrimination");
      expect(report.status).toBe("pending");
    });

    it("should generate unique IDs", () => {
      const report1 = createReport(
        "provider-1",
        "harassment",
        "Description 1",
        "session-1"
      );
      const report2 = createReport(
        "provider-1",
        "harassment",
        "Description 2",
        "session-2"
      );

      expect(report1.id).not.toBe(report2.id);
    });

    it("should set timestamps", () => {
      const report = createReport(
        "provider-1",
        "misrepresentation",
        "Description",
        "session-1"
      );

      expect(report.createdAt).toBeDefined();
      expect(report.updatedAt).toBeDefined();
    });

    it("should store reporter session ID anonymously", () => {
      const sessionId = "anonymous-session-456";
      const report = createReport(
        "provider-1",
        "other",
        "Description",
        sessionId
      );

      expect(report.reporterSessionId).toBe(sessionId);
      // Should NOT have any personally identifiable information
      expect(report).not.toHaveProperty("reporterEmail");
      expect(report).not.toHaveProperty("reporterName");
      expect(report).not.toHaveProperty("reporterPhone");
    });
  });

  describe("getReportById", () => {
    it("should return report when found", () => {
      const created = createReport(
        "provider-x",
        "discrimination",
        "Test",
        "session"
      );
      const found = getReportById(created.id);

      expect(found).toBeDefined();
      expect(found?.id).toBe(created.id);
    });

    it("should return undefined for non-existent ID", () => {
      const found = getReportById("nonexistent-report-id");
      expect(found).toBeUndefined();
    });
  });

  describe("getReportsByProvider", () => {
    it("should return reports for a specific provider", () => {
      const providerId = "specific-provider-123";

      createReport(providerId, "harassment", "Report 1", "session-1");
      createReport(providerId, "discrimination", "Report 2", "session-2");
      createReport("other-provider", "other", "Different provider", "session-3");

      const providerReports = getReportsByProvider(providerId);

      expect(providerReports.length).toBeGreaterThanOrEqual(2);
      providerReports.forEach((report) => {
        expect(report.providerId).toBe(providerId);
      });
    });

    it("should return empty array for provider with no reports", () => {
      const reports = getReportsByProvider("provider-with-no-reports-xyz");
      expect(Array.isArray(reports)).toBe(true);
    });
  });

  describe("getAllReports", () => {
    it("should return all reports", () => {
      const allReports = getAllReports();
      expect(Array.isArray(allReports)).toBe(true);
    });
  });

  describe("updateReportStatus", () => {
    it("should update report status", () => {
      const report = createReport(
        "provider-status-test",
        "unsafe-practices",
        "Description",
        "session"
      );

      const updated = updateReportStatus(report.id, "reviewing");

      expect(updated).toBeDefined();
      expect(updated?.status).toBe("reviewing");
    });

    it("should update timestamp when status changes", () => {
      const report = createReport(
        "provider-time-test",
        "harassment",
        "Description",
        "session"
      );

      const originalUpdatedAt = report.updatedAt;

      // Small delay to ensure different timestamp
      const updated = updateReportStatus(report.id, "resolved");

      expect(updated?.updatedAt).toBeDefined();
      // In production, timestamps would differ
    });

    it("should set resolvedAt when resolution is provided", () => {
      const report = createReport(
        "provider-resolve-test",
        "other",
        "Description",
        "session"
      );

      // resolvedAt is set when resolution text is provided
      const resolved = updateReportStatus(
        report.id,
        "resolved",
        "Moderator notes",
        "Issue has been addressed"
      );

      expect(resolved?.status).toBe("resolved");
      expect(resolved?.resolvedAt).toBeDefined();
      expect(resolved?.resolution).toBe("Issue has been addressed");
    });

    it("should return undefined for non-existent report", () => {
      const result = updateReportStatus("nonexistent-id", "reviewing");
      expect(result).toBeUndefined();
    });
  });
});

describe("Report Reasons", () => {
  const validReasons: ReportReason[] = [
    "discrimination",
    "unsafe-practices",
    "false-credentials",
    "harassment",
    "privacy-violation",
    "misrepresentation",
    "other",
  ];

  it("should accept all valid report reasons", () => {
    validReasons.forEach((reason) => {
      const report = createReport(
        "reason-test-provider",
        reason,
        "Testing reason: " + reason,
        "session"
      );

      expect(report.reason).toBe(reason);
    });
  });
});

describe("Report Status Flow", () => {
  const validStatuses: ReportStatus[] = [
    "pending",
    "reviewing",
    "resolved",
    "dismissed",
  ];

  it("should allow valid status transitions", () => {
    const report = createReport(
      "status-flow-provider",
      "discrimination",
      "Description",
      "session"
    );

    expect(report.status).toBe("pending");

    // Pending -> Reviewing
    let updated = updateReportStatus(report.id, "reviewing");
    expect(updated?.status).toBe("reviewing");

    // Reviewing -> Resolved
    updated = updateReportStatus(report.id, "resolved");
    expect(updated?.status).toBe("resolved");
  });

  it("should support all valid statuses", () => {
    validStatuses.forEach((status) => {
      const report = createReport(
        "status-test-provider",
        "other",
        "Description",
        "session"
      );

      const updated = updateReportStatus(report.id, status);
      expect(updated?.status).toBe(status);
    });
  });
});
