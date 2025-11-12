import { expect, test } from "@playwright/test";
import path from "path";
import fs from "fs";

test("File downloads", async ({ page }) => {
  // create a listener to the "download" event
  let promisedDownloadEvent = page.waitForEvent("download");
  await page.goto("https://practice.cydeo.com/download");
  // click the link to download the file
  await page.click("text='Predator_Wallpaper_01_3840x2400.jpg'");
  // wait for the download event to be fired and get the download object
  let download = await promisedDownloadEvent;

  let downloadPath = path.join(__dirname, "./downloads",download.suggestedFilename());

  // save the downloaded file to the specified path
  await download.saveAs(downloadPath);

  expect(fs.existsSync(downloadPath)).toBeTruthy();
});

test("file uploads", async ({ page }) => {
    await page.goto("https://practice.cydeo.com/upload");

    let filePath = path.join(__dirname, "./uploads", "TestUpload.txt");

    await page.waitForTimeout(1000);

    await page.setInputFiles("//input[@type='file']", filePath);

    await page.waitForTimeout(1000);

    await page.click("//input[@type='submit']");
    
    await page.waitForTimeout(1000);

    expect(page.getByText("File Uploaded!")).toBeVisible();
});

