import { test, expect } from '@playwright/test';
import { readLoginDataFromDB, isDbConfigured } from '../../utils/dbReader';
import type { LoginRow } from '../../utils/yamlReader';

test.describe('DDT MySQL', () => {
    test.skip(!isDbConfigured(), 'MYSQL_HOST is not set');

    let rows: LoginRow[] = [];

    test.beforeAll(async () => {
        rows = await readLoginDataFromDB();
    });

    test('login with every active row from the database', async ({ page }) => {
        expect(rows.length).toBeGreaterThan(0);
        const loginUrl = 'https://app.thetestingacademy.com/playwright/multiple_element_filter';

        for (const row of rows) {
            await test.step(`Login with : ${row.description}`, async () => {
                await page.goto(loginUrl);
                await page.getByRole('textbox', { name: 'Email Address' }).fill(row.username);
                await page.getByRole('textbox', { name: 'Password' }).fill(row.password);
                await page.getByRole('button', { name: 'Login to Practice Account' }).click();

                if (row.shouldPass) {
                    await expect(page).not.toHaveURL(loginUrl);
                } else {
                    await expect(page.getByText(row.expectedError, { exact: false })).toBeVisible();
                }
            });
        }
    });
});
