import { expect, test } from "@playwright/test";

test.describe("Start Application Page Test Group @sep01", () => {
  test.beforeEach(async ({ page }) => {
    const code = Buffer.from(
      `${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`
    ).toString("base64");
    await page.setExtraHTTPHeaders({ Authorization: `Basic ${code}` });
    await page.goto(process.env.SEP_QA_URL);
  });

  test("Verify that clicking the Terms & Conditions link opens a new Terms & Conditions tab.", async ({
    page,
  }) => {
    let windowPopupEventListener = page.waitForEvent("popup");

    let termsAndConditionsLink = page.locator(
      "//a[text()='Terms and conditions']"
    );

    await expect(termsAndConditionsLink).toBeEnabled();

    await termsAndConditionsLink.click();

    const newPage = await windowPopupEventListener;

    expect(await newPage.title()).toContain("Terms & Conditions");

    let termsAndConditionsTextElement = newPage.locator(
      "//bdt[@class='question']/strong[text()='TERMS AND CONDITIONS']"
    );

    await expect(termsAndConditionsTextElement).toBeVisible();
  });

  test("Verify that the first stepper is blue initially and changes to green once Step 1 is completed.", async ({page,}) => {
    let step1StepperCircle = page.locator(
      "//div[@class='step-circle' and span[text()='1']]"
    );

    await expect(step1StepperCircle).toHaveCSS("background-color","rgb(1, 201, 255)");

    let firstNameInputField = page.locator(
      "//input[@formcontrolname='firstName']"
    );
    await firstNameInputField.fill("Muhtar");

    let lastNameInputField = page.locator(
      "//input[@formcontrolname='lastName']"
    );
    await lastNameInputField.fill("Mahmut");

    let emailInputField = page.locator(
      "//input[@formcontrolname='email' and @type='email']"
    );
    await emailInputField.fill("muhtarmahmut@example.com");

    let phoneNumberInputField = page.locator(
      "//input[@formcontrolname='phoneNumber']"
    );
    await phoneNumberInputField.fill("555-123-4567");

    let howDidYouHearAboutUsDropdown = page.locator(
      "//mat-label[text()='How did you hear about us?']"
    );
    await howDidYouHearAboutUsDropdown.click();

    await page.click("//span[text()='Email']");

    let nextButton = page.locator("//button[@type='submit']");
    await nextButton.click();

    expect(step1StepperCircle).toHaveCSS(
      "background-color",
      "rgb(172, 245, 138)"
    );
  });

  test("Verify that personal input fields are enabled and accept user input.", async ({
    page,
  }) => {
    let firstNameInputField = page.locator("//input[@formcontrolname='firstName']");
    await firstNameInputField.fill("Muhtar");

    let lastNameInputField = page.locator("//input[@formcontrolname='lastName']");
    await lastNameInputField.fill("Mahmut");

    let emailInputField = page.locator("//input[@formcontrolname='email' and @type='email']");
    await emailInputField.fill("muhtarmahmut@example.com");

    let phoneNumberInputField = page.locator( "//input[@formcontrolname='phoneNumber']");
    await phoneNumberInputField.fill("555-123-4567");

    await expect(firstNameInputField).toHaveValue("Muhtar");
    await expect(lastNameInputField).toHaveValue("Mahmut");
    await expect(emailInputField).toHaveValue("muhtarmahmut@example.com");
    await expect(phoneNumberInputField).toHaveValue("555-123-4567");

  });
});
