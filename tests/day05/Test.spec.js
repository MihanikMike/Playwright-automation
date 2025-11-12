import { test, expect } from "@playwright/test";

test("Verify all links under ul tag are displayed and enabled", async ({
  page,
}) => {
  // Step 1 & 2: Navigate to the target URL
  await page.goto("https://practice.cydeo.com");

  // Step 3: Verify URL contains "practice.cydeo"
  await expect(page).toHaveURL(/practice\.cydeo/);

  // Step 4: Verify the page title
  await expect(page).toHaveTitle("Practice");

  // Step 5: All links under the ul HTML tag are visible and clickable
  const links = page.locator("//ul[@class='list-group']//a");
  const count = await links.count();

  for (let i = 0; i < count; i++) {
    const link = links.nth(i);
    const linkText = await link.textContent();
    console.log(`Link ${i + 1}: ${linkText}`);
    await expect(link).toBeVisible();
    await expect(link).toBeEnabled();
  }
});


test("Verify that the element inside iframe is enabled", async ({ page }) => {
  // Navigate to the page containing the iframe
  await page.goto("https://practice.cydeo.com/iframe");

  // Locate the iframe
  const frame = page.frameLocator("iframe");

  // Locate the element inside the iframe (e.g., the <p> element)
  const element = frame.locator("#tinymce");

  // Verify the element is enabled
  await expect(element).toBeEnabled();
});



test("Search CYDEO on Google", async ({ page }) => {
  // Step 1 & 2: Navigate to Google
  await page.goto("https://www.google.com/");

  // Step 3: Verify the title is 'Google'
  await expect(page).toHaveTitle("Google");

  // Step 4: Enter 'CYDEO' in the search box and press Enter
  const searchBox = page.locator("//textarea[@class='gLFyf']");
  await searchBox.fill("CYDEO");
  await searchBox.press("Enter");

  // Step 5: Page title contains 'CYDEO'
  await expect(page).toHaveTitle(/CYDEO/);
});


