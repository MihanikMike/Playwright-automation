import { test, firefox } from "@playwright/test";

test("Context Fixture Example @fixture", async ({ context }) => {
  let page1 = await context.newPage();
  await page1.waitForTimeout(1000);
  let page2 = await context.newPage();
  await page2.waitForTimeout(1000);
  let page3 = await context.newPage();
  await page3.waitForTimeout(1000);
  let page4 = await context.newPage();
  await page4.waitForTimeout(1000);

  await page1.bringToFront();
  await page1.goto("https://linkedin.com/");
  await page2.bringToFront();
  await page2.goto("https://github.com/");
  await page3.bringToFront();
  await page3.goto("https://facebook.com/");
  await page4.bringToFront();
  await page4.goto("https://www.youtube.com/");
});

test("Browser Fixture Example @fixture", async ({ browser }) => {
  let context1 = await browser.newContext();
  let page1 = await context1.newPage();
  await page1.waitForTimeout(1000);
  let page2 = await context1.newPage();
  await page2.waitForTimeout(1000);

  let context2 = await browser.newContext();
  let page3 = await context2.newPage();
  await page1.waitForTimeout(1000);
  let page4 = await context2.newPage();
  await page2.waitForTimeout(1000);

  await page1.bringToFront();
  await page1.goto("https://linkedin.com/");
  await page2.bringToFront();
  await page2.goto("https://github.com/");
  await page3.bringToFront();
  await page3.goto("https://facebook.com/");
  await page4.bringToFront();
  await page4.goto("https://www.youtube.com/");
});

test("Custom Context and Browser Configuration", async () => {
  const browser = await firefox.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });
  const page = await context.newPage();

  await page.goto("https://www.amazon.com/");
  await page.waitForTimeout(2000);

  await browser.close();
});

test("", async ({ request }) => {
  let baseURL = "https://example.com";
  // send a GET request to /exampleEndPoint.
  let response = await request.get(`${baseURL}/exampleEndPoint`);
  // verify status code is 200
  expect(response.status()).toBe(200);
  // verify content type is application/json
  expecct(response.headers().get("content-type")).toBe("application/json");
  expecct(response.headers()["content-type"]).toBe("application/json");
  // verify the total json object is 1
  let json = await response.json();
  expect(json.length).toBe(1);
  // verify firstName is Josh
  expect(json[0].firstName).toBe("Josh");
  //  verify lastName is Jeremy
  expect(json[0].lastName).toBe("Jeremy");
  //
});

test("Send GET request and validate response", async ({ request }) => {
  const baseURL = "http://example.com/";
  const response = await request.get(`${baseURL}exampleEndPoint`);

  // Verify status code is 200
  expect(response.status()).toBe(200);

  // Verify content type is application/json
  expect(response.headers()["content-type"]).toContain("application/json");

  const responseBody = await response.json();

  // Verify the total json object is 1
  expect(Object.keys(responseBody).length).toBe(1);

  // Verify firstName is Josh
  expect(responseBody.firstName).toBe("Josh");

  // Verify lastName is Jeremy
  expect(responseBody.lastName).toBe("Jeremy");
});
/*
 Create a test for POST request. that creates the following json object
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "age": 30
      }
*/

test("Send POST request to create user", async ({ request }) => {
  const baseURL = "http://example.com/";
  const postData = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    age: 30,
  };

  const response = await request.post(`${baseURL}/api/post`, {data: postData,});

  // Verify status code is 201 (Created)
  expect(response.status()).toBe(201);

  const responseBody = await response.json();
  // Validate the response body matches the postData
  expect(responseBody.firstName).toBe(postData.firstName);
  expect(responseBody.lastName).toBe(postData.lastName);
  expect(responseBody.email).toBe(postData.email);
  expect(responseBody.age).toBe(postData.age);
});

// create delete test for DELETE request
test("Send DELETE request to /api/post delete JSON object", async ({ request }) => {
    const postData = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        age: 30,
    };
    const response = await request.delete(`http://example.com/api/post`, {data: postData,});
    const postId = response.json().id;
    const deleteResponse = await request.delete(`http://example.com/api/post/${postId}`);
    // Verify status code is 200 (OK)
    expect(deleteResponse.status()).toBe(200);
});
 
// create a put test for PUT request

test("Send PUT request to update user", async ({ request }) => {
    const baseURL = "http://example.com/";
    
    // First create a user to update
    const postData = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        age: 30,
    };
    
    const createResponse = await request.post(`${baseURL}/api/post`, {data: postData});
    
    const userId = createResponse.body().id;
    
    // Updated data for PUT request
    const updatedData = {
        firstName: "Jane",
        lastName: "Smith",
        email: "janesmith@example.com",
        age: 25,
    };
    
    // Send PUT request to update the user
    const putResponse = await request.put(`${baseURL}/api/post/${userId}`, {data: updatedData});
    
    // Verify status code is 200 (OK)
    expect(putResponse.status()).toBe(200);
    
    const responseBody = await putResponse.json();
    // Validate the response body matches the updated data
    expect(responseBody.firstName).toBe(updatedData.firstName);
    expect(responseBody.lastName).toBe(updatedData.lastName);
    expect(responseBody.email).toBe(updatedData.email);
    expect(responseBody.age).toBe(updatedData.age);
    expect(responseBody.id).toBe(userId);
});
