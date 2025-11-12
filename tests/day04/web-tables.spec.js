import { test, expect } from "@playwright/test";

test("Web Table Practice", async ({ page }) => {
  // test codes here
  await page.goto("https://practice.cydeo.com/web-tables");
  let table = page.locator("//table[@id='ctl00_MainContent_orderGrid']");
  // verify the table has 9 rows and 13 columns, and there are 104 cells in total.
  let rows = await table.locator("//tr").all();
  let colums = await table.locator("//th").all();
  let cells = await table.locator("//td").all();
  // assertions here to verify the table's structure and content.
  expect(rows.length).toBe(9);
  expect(colums.length).toBe(13);
  expect(cells.length).toBe(104);

  for (let cell of cells) {
    console.log(await cell.textContent());
  }
});

test("Web Table Practice 2", async ({ page }) => {
  await page.goto("https://practice.cydeo.com/web-tables");

  let table = page.locator("//table[@id='ctl00_MainContent_orderGrid']");

  let rows = await table.locator("//tr").all();

  // create a loop to print each cell's data of each row.
  for (let row of rows) {
    let cells = await row.locator("//td").all();
    if (cells.length > 2) {
      for (let i = 1; i < cells.length - 1; i++) {
        console.log(await cells[i].textContent());
      }
      console.log("--------------------------------");
    }
  }
});

test("Web Table Practice 3", async ({ page }) => {
    await page.goto("https://practice.cydeo.com/web-tables");

    let table = page.locator("//table[@id='ctl00_MainContent_orderGrid']");

    let checkBoxes = await table.locator("//input[@type='checkbox']").all();
    for (let checkBox of checkBoxes) {
        await checkBox.check();
        await expect(checkBox).toBeChecked();
    }
});
