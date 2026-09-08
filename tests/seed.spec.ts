import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('input[name="user-name"]').fill('standard_user');
    await page.locator("//input[@id='password']").fill('secret_sauce');
    await page.locator('input[name="login-button"]').click();
    const dashboardText = await page.locator("//div[@class='app_logo']").textContent();
    expect(dashboardText).toBe('Swag Labs');
  });
});
