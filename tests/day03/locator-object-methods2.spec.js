import { test } from "@playwright/test";

test.describe("Test Group", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com/");
  });

  test("innerText(): retrives the visible text", async ({ page }) => {
    let headerElement = page.locator("//span[@class='h1y']");
    let actualText = await headerElement.innerText();
    console.log("actualText = " + actualText);
  });

  test("inputValue(): only woeks with <input>, <textarea>, <select>, retrives the input value", async ({ page }) => {
    let inputsLink = page.getByText("Inputs");
    await inputsLink.click();
    
    let inputBox = page.locator("//input[@type='number']");
    
    inputBox.fill("12345");
    
    let actualValue = await inputBox.inputValue();
    console.log("actualValue = " + actualValue);

  });

  test("getAttribute(): retrieves the attribute value", async ({ page }) => {

    let abTextingLink = page.locator("text='A/B Testing'");
    let hrefLink = await abTextingLink.getAttribute("href");
    console.log("hrefLink = " + hrefLink);
  });
});
