import { test } from "@playwright/test";

test("Getting the title of the page", async ({ page }) => {
  await page.goto("https://practice.cydeo.com/");
  // pause for 3 seconds to load the page
  // await page.waitForTimeout(3000);

  // Get the title of the page
  let actualTitle = await page.title();
  console.log(actualTitle);
});

test("Getting the current url of the page", async ({ page }) => {
  await page.goto("https://practice.cydeo.com/");
  let actualURL = page.url();
  console.log(actualURL);
});

test("Set the window size", async ({ page }) => {
    await page.goto("https://practice.cydeo.com/");
    await page.waitForTimeout(3000);
    // Set the window size to 1280x720
    // await page.setViewportSize({ width: 2560, height: 1440 });
    // await page.waitForTimeout(3000);

});
