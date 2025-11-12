import { test } from "@playwright/test";

test.describe("Test Group", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com/javascript_alerts");
  });

  test("Regular Alert", async ({ page }) => {
    page.on("dialog", (alert) => {
      console.log(`Alert message: ${alert.message()}`);
      alert.accept();
    });

    let clickForJSAlert = page.locator("//button[@onclick='jsAlert()']");
    await clickForJSAlert.click();
  });
  test("Comfirmation Alert", async ({ page }) => {
    page.on("dialog", async (alert) => {
      console.log(`Alert message: ${alert.message()}`);

      await alert.dismiss();
    });

    let clickForJSConfirmAlertButton = page.locator(
      "//button[@onclick='jsConfirm()']"
    );
    await clickForJSConfirmAlertButton.click();
  });
  test("Prompt Alert", async ({ page }) => {
    page.on("dialog", async (alert) => {
      console.log(`Alert message: ${alert.message()}`);

      await alert.accept("Mikhail");
    });
    let clickForJSPromptAlertButton = page.locator(
      "//button[@onclick='jsPrompt()']"
    );
    await clickForJSPromptAlertButton.click();
  });
});
