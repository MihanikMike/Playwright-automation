import { test, expect } from "@playwright/test";

test.describe("Payment Plan Test Group @sep02", () => {
  test.beforeEach(async ({ page }) => {
    const code = Buffer.from(
      `${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`
    ).toString("base64");
    await page.setExtraHTTPHeaders({ Authorization: `Basic ${code}` });
    await page.goto(process.env.SEP_QA_URL);

    let firstNameInputField = page.locator(
      "//input[@formcontrolname='firstName']"
    );
    let lastNameInputField = page.locator(
      "//input[@formcontrolname='lastName']"
    );
    let emailInputField = page.locator(
      "//input[@formcontrolname='email' and @type='email']"
    );
    let phoneNumberInputField = page.locator(
      "//input[@formcontrolname='phoneNumber']"
    );
    let howDidYouHearAboutUsDropdown = page.locator(
      "//mat-label[text()='How did you hear about us?']"
    );
    let nextButton = page.locator("//button[@type='submit']");

    await firstNameInputField.fill("Muhtar");
    await lastNameInputField.fill("Mahmut");
    await emailInputField.fill("muhtarmahmut@example.com");
    await phoneNumberInputField.fill("555-123-4567");
    await howDidYouHearAboutUsDropdown.click();
    await page.click("//span[text()='Email']");
    await nextButton.click();
  });

  test("Verify that Step 2 stepper is blue and Step 1 stepper is green", async ({
    page,
  }) => {
    let step1StepperCircle = page.locator(
      "//div[@class='step-circle' and span[text()='1']]"
    );
    let step2StepperCircle = page.locator(
      "//div[@class='step-circle' and span[text()='2']]"
    );

    await expect(step1StepperCircle).toHaveCSS(
      "background-color",
      "rgb(172, 245, 138)"
    );
    await expect(step2StepperCircle).toHaveCSS(
      "background-color",
      "rgb(1, 201, 255)"
    );
  });

  test("Verify that the Next button is disabled by default", async ({
    page,
  }) => {
    let inactiveNextButton = page.locator("//button[text()='Next']");
    await expect(inactiveNextButton).toBeDisabled();
  });

  test("Verify that the Next button becomes enabled when a payment plan is selected", async ({
    page,
  }) => {
    let upfrontpaymentPlanOption = page.locator(
      "//mat-expansion-panel-header[@id='mat-expansion-panel-header-0']"
    );
    await upfrontpaymentPlanOption.click();

    let activeNextButton = page.locator(
      "//button[@class='next-button' and text()='Next']"
    );
    await expect(activeNextButton).toBeEnabled();
  });

  test("Verify Clicking the active next button will change the stepper 2 color to green", async ({
    page,
  }) => {
    let upfrontpaymentPlanOption = page.locator(
      "//mat-expansion-panel-header[@id='mat-expansion-panel-header-0']"
    );
    await upfrontpaymentPlanOption.click();

    let activeNextButton = page.locator(
      "//button[@class='next-button' and text()='Next']"
    );
    await activeNextButton.click();

    let step2StepperCircle = page.locator(
      "//div[@class='step-circle' and span[text()='2']]"
    );
    await expect(step2StepperCircle).toHaveCSS(
      "background-color",
      "rgb(172, 245, 138)"
    );
  });

  test(" Verify that Step 1 & Step 2 steppers are green and Step 3 stepper is blue", async ({
    page,
  }) => {
    let upfrontpaymentPlanOption = page.locator(
      "//mat-expansion-panel-header[@id='mat-expansion-panel-header-0']"
    );
    await upfrontpaymentPlanOption.click();

    let activeNextButton = page.locator(
      "//button[@class='next-button' and text()='Next']"
    );
    await activeNextButton.click();

    let step1StepperCircle = page.locator(
      "//div[@class='step-circle' and span[text()='1']]"
    );
    let step2StepperCircle = page.locator(
      "//div[@class='step-circle' and span[text()='2']]"
    );
    let step3StepperCircle = page.locator(
      "//div[@class='step-circle' and span[text()='3']]"
    );

    await expect(step1StepperCircle).toHaveCSS(
      "background-color",
      "rgb(172, 245, 138)"
    );
    await expect(step2StepperCircle).toHaveCSS(
      "background-color",
      "rgb(172, 245, 138)"
    );
    await expect(step3StepperCircle).toHaveCSS(
      "background-color",
      "rgb(1, 201, 255)"
    );
  });

  test(" Verify that the payment input fields are enabled and accept card details", async ({
    page,
  }) => {
    const upfrontpaymentPlanOption = page.locator(
      "//mat-expansion-panel-header[@id='mat-expansion-panel-header-0']"
    );
    await upfrontpaymentPlanOption.click();
    const activeNextButton = page.locator(
      "//button[@class='next-button' and text()='Next']"
    );
    await activeNextButton.click();

    // const stripeFrame = page.frameLocator("//iframe[@title='Secure payment input frame']");
    const cardNumberInput = page
      .frameLocator("//iframe[@title='Secure payment input frame']")
      .locator('//input[@id="Field-numberInput"]');
    const cardExpiryInput = page
      .frameLocator("//iframe[@title='Secure payment input frame']")
      .locator('//input[@id="Field-expiryInput"]');
    const cardCvcInput = page
      .frameLocator("//iframe[@title='Secure payment input frame']")
      .locator('//input[@id="Field-cvcInput"]');
    const postalCodeInput = page
      .frameLocator("//iframe[@title='Secure payment input frame']")
      .locator('//input[@id="Field-postalCodeInput"]');

    const countryDropdown = page
      .frameLocator("//iframe[@title='Secure payment input frame']")
      .locator("//select[@id='Field-countryInput']");

    await cardNumberInput.fill("4242 4242 4242 4242");
    await cardExpiryInput.fill("12 / 34");
    await cardCvcInput.fill("123");
    await postalCodeInput.fill("12345");
    await countryDropdown.click("//option[@value='US']");
    //await countryDropdown.click("//span[text()='United States']");
    

    await expect(cardNumberInput).toHaveValue("4242 4242 4242 4242");
    await expect(cardExpiryInput).toHaveValue("12 / 34");
    await expect(cardCvcInput).toHaveValue("123");
    await expect(postalCodeInput).toHaveValue("12345");
    await expect(countryDropdown).toHaveValue("US");
  });

  test(" Verify that by default the terms and conditions check box is unchecked and paybutton is disabled", async ({
    page,
  }) => {
    let upfrontpaymentPlanOption = page.locator(
      "//mat-expansion-panel-header[@id='mat-expansion-panel-header-0']"
    );
    await upfrontpaymentPlanOption.click();
    let activeNextButton = page.locator(
      "//button[@class='next-button' and text()='Next']"
    );
    await activeNextButton.click();

    const cardNumberInput = page
      .frameLocator("//iframe[@title='Secure payment input frame']")
      .locator('//input[@id="Field-numberInput"]');
    const cardExpiryInput = page
      .frameLocator("//iframe[@title='Secure payment input frame']")
      .locator('//input[@id="Field-expiryInput"]');
    const cardCvcInput = page
      .frameLocator("//iframe[@title='Secure payment input frame']")
      .locator('//input[@id="Field-cvcInput"]');
    const postalCodeInput = page
      .frameLocator("//iframe[@title='Secure payment input frame']")
      .locator('//input[@id="Field-postalCodeInput"]');

    const countryDropdown = page
      .frameLocator("//iframe[@title='Secure payment input frame']")
      .locator("//select[@id='Field-countryInput']");

    await cardNumberInput.fill("4242 4242 4242 4242");
    await cardExpiryInput.fill("12 / 34");
    await cardCvcInput.fill("123");
    await postalCodeInput.fill("12345");
    await countryDropdown.click("//option[@value='US']");

    let termsAndConditionsCheckbox = page.locator("//input[@id='defaultCheck2']");
    let payButton = page.locator("//span[@class='mat-mdc-button-touch-target']");
    await expect(termsAndConditionsCheckbox).not.toBeChecked();
    await expect(payButton).toBeDisabled();
  });

  test("Verify that the paybutton will be activated when the check box is checked", async ({
    page,
  }) => {

    let upfrontpaymentPlanOption = page.locator(
      "//mat-expansion-panel-header[@id='mat-expansion-panel-header-0']"
    );
    await upfrontpaymentPlanOption.click();
    let activeNextButton = page.locator(
      "//button[@class='next-button' and text()='Next']"
    );
    await activeNextButton.click();

    const cardNumberInput = page
      .frameLocator("//iframe[@title='Secure payment input frame']")
      .locator('//input[@id="Field-numberInput"]');
    const cardExpiryInput = page
      .frameLocator("//iframe[@title='Secure payment input frame']")
      .locator('//input[@id="Field-expiryInput"]');
    const cardCvcInput = page
      .frameLocator("//iframe[@title='Secure payment input frame']")
      .locator('//input[@id="Field-cvcInput"]');
    const postalCodeInput = page
      .frameLocator("//iframe[@title='Secure payment input frame']")
      .locator('//input[@id="Field-postalCodeInput"]');

    const countryDropdown = page
      .frameLocator("//iframe[@title='Secure payment input frame']")
      .locator("//select[@id='Field-countryInput']");

    await cardNumberInput.fill("4242 4242 4242 4242");
    await cardExpiryInput.fill("12 / 34");
    await cardCvcInput.fill("123");
    await postalCodeInput.fill("12345");
    await countryDropdown.click("//option[@value='US']");

    let termsAndConditionsCheckbox = page.locator(
      "//input[@id='defaultCheck2']"
    );
    let payButton = page.locator("//span[@class='mat-mdc-button-touch-target']");

    await termsAndConditionsCheckbox.click();
    await expect(termsAndConditionsCheckbox).toBeChecked();
    await page.waitForTimeout(2000);
    await expect(payButton).toBeEnabled();

  });
});
