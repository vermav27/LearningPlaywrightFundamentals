import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://www.sciensus.com/');
    await page.getByRole('button', { name: 'Allow all' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByRole('link').nth(3)).toBeVisible();
    await expect(page.locator('h1')).toContainText('Connecting patients with life-changing therapies at home');
    await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact us' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Patient hub' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'English' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Swiss offering' })).toBeVisible();
    await expect(page.locator('#post-9')).toContainText('The fastest route to patients');
    await expect(page.locator('#post-9')).toContainText('Digital innovation');
});