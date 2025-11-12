//const {test} = require('@playwright/test');
import {test} from "@playwright/test";

test("Simple google test", async ({page}) => {
    // test codes here
    await page.goto("https://www.google.com");
    
    await page.waitForTimeout(3000);

});
