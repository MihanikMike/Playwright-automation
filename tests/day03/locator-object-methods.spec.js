import { test } from "@playwright/test";

test.describe("Test Group", () => {
  // create beforeEach hook to navigate to https://practice.cydeo.com/
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com/");
  });

  test("Check(): checks the radio button and check boxes if they haven't been checked yet", async ({
    page,
  }) => {
    //let checkboxes = page.locator("text='Checkboxes'");
    let checkboxesLink = page.getByText("Checkboxes");
    await checkboxesLink.click();

    let checkbox1 = page.locator("//input[@id='box1']");

    await checkbox1.check();
  });

  test("Uncheck: unchecks the radio button and check boxes if they haven't been unchecked yet", async ({
    page,
  }) => {
    let checkboxesLink = page.getByText("Checkboxes");
    await checkboxesLink.click();

    let checkbox2 = page.locator("#box2");

    await checkbox2.uncheck();
  });

  test("SelectOption(): used fot dropdown boxes with select tagname", async ({ page }) => {
    let deopdownLink = page.getByText("Dropdown");
    await deopdownLink.click();
    let dropdown = page.locator("//select[@id='dropdown']");

   // await dropdown.selectOption("1"); // select by the value

   // await dropdown.selectOption({label: "Option 1"}); // select by text label
    await dropdown.selectOption({index: 1}); // select by index

  });
});
