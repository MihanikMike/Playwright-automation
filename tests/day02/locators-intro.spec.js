import { test } from "@playwright/test";

test("Simple google test", async ({ page }) => {
    // test google page
    await page.goto("https://www.google.com");
    
    await page.waitForTimeout(3000);

    let searchBox = page.locator("//textarea[@id='APjFqb']");
    
    //await searchBox.type("CYDEO");
    await searchBox.fill("CYDEO");
    await page.waitForTimeout(3000);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(3000);
    

});


/*

<textarea jsname="yZiJbe" class="gLFyf" aria-controls="Alh6id" aria-owns="Alh6id" autofocus="" title="Search" value="" aria-label="Search" placeholder="" aria-autocomplete="both" aria-expanded="false" aria-haspopup="false" autocapitalize="off" autocomplete="off" autocorrect="off" id="APjFqb" maxlength="2048" name="q" role="combobox" rows="1" spellcheck="false" data-ved="0ahUKEwilosyRgtSPAxWDC3kGHQXMIdsQ39UDCAU"></textarea>


*/
//textarea[@id='APjFqb']

//textarea[@class='gLFyf']