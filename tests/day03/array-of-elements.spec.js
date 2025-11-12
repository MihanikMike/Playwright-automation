/*
1. Verify that there are exactly 50 link elements within the <ul> tag.
2. Verify that there are exactly 50 link elements within the <ul> tag is visible & clickable.
3. Verify that there are exactly 50 link elements within the <ul> tag has a href attribute.
*/

import { test, expect } from "@playwright/test";

test.describe("Test Group", () => {
  // Before each test, navigate to https://practice.cydeo.com/
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com/");
  });
  test("Verify that there are exactly 50 link elements within the <ul> tag", async ({
    page,
  }) => {
    let elements = await page.locator("//ul[@class='list-group']/li/a").all();
    expect(elements.length).toBe(50);
    // expect(elemetnts.length).toBeGreaterThenOrEqual(20);
  });

  test("Verify that there are exactly 50 link elements within the <ul> tag is visible & clickable", async ({
    page,
  }) => {
    let elements = await page.locator("//ul[@class='list-group']/li/a").all();
  });

  test("Verify that there are exactly 50 link elements within the <ul> tag has a href attribute", async ({
    page,
  }) => {});
});
