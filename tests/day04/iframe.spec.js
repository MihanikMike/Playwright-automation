import { test, expect } from "@playwright/test";

test("", async ({ page }) => {
    await page.goto("https://practice.cydeo.com/iframe");
    let frameLocator = page.frameLocator("//iframe[@id='mce_0_ifr']");
    let elementInTheFrame = frameLocator.locator("//body[@id='tinymce']");
    //await frameLocator.clear();
    elementInTheFrame.press("Control+a");
    elementInTheFrame.press("Backspace");
     
    await elementInTheFrame.fill("Hello, Cydeo");
    expect(elementInTheFrame).toHaveText("Hello, Cydeo");
    elementInTheFrame.press("Control+a");
    elementInTheFrame.press("Backspace");
    await elementInTheFrame.fill("Irina");
    expect(elementInTheFrame).toHaveText("Irina");
});
