import { test, expect } from "@playwright/test";
import { Cookie } from "express-session";

// TODO: test flow for creating a new user and logging out.

// NOTE: this test user needs to be manually added.
const testUsername = "user";
const testPassword = "password";

test("Basic auth", async ({ page, browser }) => {
  await test.step("should login", async () => {
    // Go to login page.
    await page.goto("http://localhost:443/auth/login");

    // Fill in form and signin.
    await page.getByText("Username or email").waitFor();
    await page.locator("#username").fill(testUsername);
    await page.locator("#password").fill(testPassword);
    await page.getByRole("button", { name: "Sign In" }).click();

    // NOTE: for some reason this part fails. I have verified that the request is sent with the correct form data after clicking the button.
    await page.waitForURL("http://localhost:3000");

    // Check session status.
    await page.goto("http://localhost:443/auth/session");
    const session = await page.locator("pre").textContent();
    expect(JSON.parse(session ?? "{}")).toEqual({
      data: {
        session: expect.any(Object),
      },
      validUntil: expect.any(Number),
    });
  });

  await test.step("should logout", async () => {
    // Send log out post request.
    await page.request.post("http://localhost:443/auth/logout");

    // Check session status.
    await page.goto("http://localhost:443/auth/session");
    const session = await page.locator("pre").textContent();
    expect(JSON.parse(session ?? "{}")?.data?.session).toEqual({
      cookie: expect.any(Object),
    });
  });
});
