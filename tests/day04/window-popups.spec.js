import { test, expect } from "@playwright/test";


  test("Window pop-up practice", async ({ page }) => {
    // creating event listener for monitoring window pop-ups
    let promisedNewPageEvent = page.waitForEvent("popup");
    await page.goto("https://practice.cydeo.com/windows");
    await page.click("text=Click Here"); // triggers the pop-up event
    let newPage = await promisedNewPageEvent; // awaiting for thr promise to be resolved
    await expect(newPage).toHaveTitle("New Window");
    await expect(page).toHaveTitle("Windows");

    await page.bringToFront();
    let firstWindowElement = page.getByText("Opening a new window");
    await expect(firstWindowElement).toBeVisible();

    await newPage.bringToFront();
    let secondWindowElement = newPage.getByText("New Window");
    await expect(secondWindowElement).toBeVisible();
  });

