import {test} from '@playwright/test';

test('Bypass authentication by embedding credentials in the URL', async ({page}) =>{
    await page.goto("https://admin:admin@practice.cydeo.com/basic_auth");
    await page.waitForTimeout(3000);
});

test('Bypass authentication by embedding credentials base64 format', async ({page}) =>{
    let encodedCredential = Buffer.from("admin:admin").toString('base64');
    page.setExtraHTTPHeaders({
        'Authorization': `Basic ${encodedCredential}`
    }); 
    await page.goto("https://practice.cydeo.com/basic_auth");
    await page.waitForTimeout(3000);
});
