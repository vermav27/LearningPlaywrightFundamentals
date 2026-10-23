import { Page, expect, Locator } from '@playwright/test';

export class dashBoard {

    readonly page: Page;
    readonly dashboardLabel: Locator;

    constructor(page: Page) {

        this.page = page;
        this.dashboardLabel = page.locator("//h6[contains(@class,'oxd-topbar-header')]");

    }

    // Actions

}