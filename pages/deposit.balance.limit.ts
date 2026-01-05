import { Locator, Page, expect } from "@playwright/test";
import { commonUtils } from "@utils/common.utils";
import { Env } from "./FrameworkConfig/env";

export class DepositBalanceLimit {
    readonly page: Page;
    readonly header: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.getByRole('heading', { name: 'Deposit Balance Limit', level: 1 });
    }
    
    async assertHeaderVisible() {
        await expect(this.header).toBeVisible();
    }

    async verifyPageLoaded() {
        await commonUtils.verifyPageTitle(this.page, Env.DEPOSIT_BALANCE_LIMIT_TITLE);
    }

}