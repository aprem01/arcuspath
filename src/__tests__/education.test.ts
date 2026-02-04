/**
 * ArcusPath 360 Education Tests
 * Tests for education content and utilities
 */

import {
  educationTopics,
  getEducationTopicBySlug,
  getEducationTopicsByCategory,
  getAllEducationCategories,
  getRelatedTopics,
} from "@/data/education";

describe("Education Data", () => {
  describe("educationTopics array", () => {
    it("should have at least one topic", () => {
      expect(educationTopics.length).toBeGreaterThan(0);
    });

    it("should have valid topic structure", () => {
      educationTopics.forEach((topic) => {
        expect(topic).toHaveProperty("id");
        expect(topic).toHaveProperty("slug");
        expect(topic).toHaveProperty("title");
        expect(topic).toHaveProperty("description");
        expect(topic).toHaveProperty("category");
        expect(topic).toHaveProperty("content");
        expect(topic).toHaveProperty("readTime");
        expect(topic).toHaveProperty("lastUpdated");
      });
    });

    it("should have unique slugs", () => {
      const slugs = educationTopics.map((t) => t.slug);
      const uniqueSlugs = new Set(slugs);
      expect(slugs.length).toBe(uniqueSlugs.size);
    });

    it("should have valid read times", () => {
      educationTopics.forEach((topic) => {
        expect(topic.readTime).toBeGreaterThan(0);
        expect(topic.readTime).toBeLessThan(60); // Reasonable max
      });
    });

    it("should have non-empty content", () => {
      educationTopics.forEach((topic) => {
        expect(topic.content.trim().length).toBeGreaterThan(100);
      });
    });
  });

  describe("getEducationTopicBySlug", () => {
    it("should return topic when found", () => {
      const topic = getEducationTopicBySlug("finding-affirming-healthcare");
      expect(topic).toBeDefined();
      expect(topic?.slug).toBe("finding-affirming-healthcare");
    });

    it("should return undefined for non-existent slug", () => {
      const topic = getEducationTopicBySlug("nonexistent-topic");
      expect(topic).toBeUndefined();
    });
  });

  describe("getEducationTopicsByCategory", () => {
    it("should return healthcare topics", () => {
      const topics = getEducationTopicsByCategory("healthcare");
      expect(topics.length).toBeGreaterThan(0);
      topics.forEach((topic) => {
        expect(topic.category).toBe("healthcare");
      });
    });

    it("should return legal topics", () => {
      const topics = getEducationTopicsByCategory("legal");
      expect(topics.length).toBeGreaterThan(0);
      topics.forEach((topic) => {
        expect(topic.category).toBe("legal");
      });
    });

    it("should return empty array for category with no topics", () => {
      const topics = getEducationTopicsByCategory("lifestyle" as any);
      expect(Array.isArray(topics)).toBe(true);
    });
  });

  describe("getAllEducationCategories", () => {
    it("should return all categories", () => {
      const categories = getAllEducationCategories();
      expect(categories.length).toBeGreaterThan(0);
    });

    it("should have valid category structure", () => {
      const categories = getAllEducationCategories();
      categories.forEach((cat) => {
        expect(cat).toHaveProperty("id");
        expect(cat).toHaveProperty("name");
        expect(cat).toHaveProperty("description");
      });
    });

    it("should include main categories", () => {
      const categories = getAllEducationCategories();
      const ids = categories.map((c) => c.id);
      expect(ids).toContain("healthcare");
      expect(ids).toContain("legal");
      expect(ids).toContain("financial");
      expect(ids).toContain("career");
    });
  });

  describe("getRelatedTopics", () => {
    it("should return related topics", () => {
      const topic = educationTopics.find(
        (t) => t.relatedTopics && t.relatedTopics.length > 0
      );
      if (topic) {
        const related = getRelatedTopics(topic.id);
        expect(related.length).toBeGreaterThan(0);
      }
    });

    it("should return empty array for non-existent topic", () => {
      const related = getRelatedTopics("nonexistent");
      expect(related).toEqual([]);
    });

    it("should return actual topic objects", () => {
      const topic = educationTopics.find(
        (t) => t.relatedTopics && t.relatedTopics.length > 0
      );
      if (topic) {
        const related = getRelatedTopics(topic.id);
        related.forEach((r) => {
          expect(r).toHaveProperty("id");
          expect(r).toHaveProperty("title");
          expect(r).toHaveProperty("content");
        });
      }
    });
  });
});

describe("Education Content Quality", () => {
  describe("checklists", () => {
    it("should have checklists with valid structure", () => {
      const topicsWithChecklists = educationTopics.filter(
        (t) => t.checklist && t.checklist.length > 0
      );

      expect(topicsWithChecklists.length).toBeGreaterThan(0);

      topicsWithChecklists.forEach((topic) => {
        topic.checklist?.forEach((item) => {
          expect(item).toHaveProperty("id");
          expect(item).toHaveProperty("text");
          expect(item.text.length).toBeGreaterThan(0);
        });
      });
    });

    it("should have unique checklist item IDs within each topic", () => {
      educationTopics.forEach((topic) => {
        if (topic.checklist) {
          const ids = topic.checklist.map((item) => item.id);
          const uniqueIds = new Set(ids);
          expect(ids.length).toBe(uniqueIds.size);
        }
      });
    });
  });

  describe("related content", () => {
    it("should have valid related topic references", () => {
      const allIds = educationTopics.map((t) => t.id);

      educationTopics.forEach((topic) => {
        topic.relatedTopics.forEach((relatedId) => {
          expect(allIds).toContain(relatedId);
        });
      });
    });
  });
});
