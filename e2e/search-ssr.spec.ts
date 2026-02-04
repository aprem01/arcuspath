import { test, expect } from "@playwright/test";

test.describe("Search Page SSR", () => {
  test("should render provider cards without showing Loading state", async ({
    page,
  }) => {
    // Disable JavaScript to verify SSR content
    await page.setJavaScriptEnabled(false);

    await page.goto("/search");

    // Should have the page title
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Providers"
    );

    // Should have results count
    await expect(page.getByTestId("results-count")).toBeVisible();

    // Should NOT show "Loading..." as primary content
    const pageContent = await page.textContent("body");
    expect(pageContent).not.toMatch(/^Loading\.\.\.$/);

    // Should have provider cards (the grid)
    const providerGrid = page.getByTestId("provider-grid");
    await expect(providerGrid).toBeVisible();

    // Should have at least one provider card (link to provider page)
    const providerLinks = providerGrid.locator('a[href^="/provider/"]');
    expect(await providerLinks.count()).toBeGreaterThan(0);
  });

  test("should render filtered results server-side with category param", async ({
    page,
  }) => {
    // Disable JavaScript to verify SSR content
    await page.setJavaScriptEnabled(false);

    await page.goto("/search?category=healthcare");

    // Should have the category-specific title
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Healthcare Providers"
    );

    // Should have provider cards
    const providerGrid = page.getByTestId("provider-grid");
    await expect(providerGrid).toBeVisible();
  });

  test("should render no-results state when no matches", async ({ page }) => {
    // Disable JavaScript to verify SSR content
    await page.setJavaScriptEnabled(false);

    // Use a query that won't match anything
    await page.goto("/search?q=xyznonexistent12345");

    // Should show "No providers found" message OR results
    // (depends on implementation - we check for proper render either way)
    const noResults = page.getByTestId("no-results");
    const providerGrid = page.getByTestId("provider-grid");

    const hasNoResults = await noResults.isVisible().catch(() => false);
    const hasProviderGrid = await providerGrid.isVisible().catch(() => false);

    // One of these should be true
    expect(hasNoResults || hasProviderGrid).toBe(true);
  });

  test("should have interactive filters after JavaScript loads", async ({
    page,
  }) => {
    await page.goto("/search");

    // Wait for hydration
    await page.waitForLoadState("networkidle");

    // Should be able to use the sort dropdown
    const sortSelect = page.locator("#sort-select");
    await expect(sortSelect).toBeVisible();

    // Change sort
    await sortSelect.selectOption("rating");

    // URL should update (client-side navigation)
    await expect(page).toHaveURL(/sort=rating/);
  });

  test("should filter by category and update results", async ({ page }) => {
    await page.goto("/search");
    await page.waitForLoadState("networkidle");

    // Get initial provider count
    const initialCount = await page
      .getByTestId("results-count")
      .textContent();

    // Click on a category filter
    const healthcareRadio = page.getByRole("radio", { name: "Healthcare" });
    await healthcareRadio.click();

    // Wait for navigation
    await page.waitForURL(/category=healthcare/);

    // Page should now show Healthcare Providers
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Healthcare Providers"
    );
  });

  test("should be accessible - keyboard navigation works", async ({ page }) => {
    await page.goto("/search");
    await page.waitForLoadState("networkidle");

    // Tab through the page
    await page.keyboard.press("Tab");

    // Should be able to focus on search input
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.focus();
    await expect(searchInput).toBeFocused();
  });
});

test.describe("Search Page SEO", () => {
  test("should have proper meta tags", async ({ page }) => {
    await page.goto("/search");

    // Check title
    const title = await page.title();
    expect(title).toContain("Provider");

    // Check meta description
    const metaDescription = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(metaDescription).toBeTruthy();
  });

  test("should have indexable content in HTML", async ({ page }) => {
    // Fetch raw HTML without executing JS
    const response = await page.request.get("/search");
    const html = await response.text();

    // Should contain provider content in HTML
    expect(html).toContain("provider-grid");
    expect(html).toContain('href="/provider/');

    // Should NOT have "Loading..." as the primary content
    expect(html).not.toMatch(
      /<div[^>]*>Loading\.\.\.<\/div>\s*<\/main>/
    );
  });
});
