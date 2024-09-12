import { test, expect } from "@playwright/test";

// TODO: test flow for creating a new user and logging out.

// NOTE: this test user needs to be manually added.
const testUsername = "user";
const testPassword = "password";

test("Basic auth", async ({ page, browser }) => {
  await test.step("should login", async () => {
    // Go to login page and select keycloak.
    await page.goto("http://localhost:443/auth/signin");
    await page.getByText("Keycloak").click();

    // Fill in form and signin.
    await page.getByText("Username or email").waitFor();
    await page.locator("#username").fill(testUsername);
    await page.locator("#password").fill(testPassword);
    await page.getByRole("button", { name: "Sign in" }).click();

    // NOTE: for some reason this part fails. I have verified that the request is sent with the correct form data after clicking the button.
    await page.waitForURL("http://localhost:443");

    // Check session status.
    await page.goto("http://localhost:443/auth/session");
    const session = await page.locator("pre").textContent();
    expect(JSON.parse(session ?? "{}")).toEqual({
      user: {
        name: "test test",
        email: "test@test.com",
      },
      expires: expect.any(String),
    });
  });

  await test.step("should logout", async () => {
    // Go to logout page and select sign out.
    await page.goto("http://localhost:443/auth/signout");
    await page.getByRole("button", { name: "Sign out" }).click();

    // Check session status.
    await page.goto("http://localhost:443/auth/session");
    const session = await page.locator("pre").textContent();
    expect(session).toBe("null");
  });
});
