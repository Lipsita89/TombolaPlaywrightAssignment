import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './login.page';
import { DepositBalanceLimit } from './deposit.balance.limit';
import { commonUtils } from '../utils/common.utils';
import { ContactReference } from './contact.preference';
import { WinnersPage } from './winners';
import { Env } from './FrameworkConfig/env';

export class HomePage {
    private readonly page: Page;
    private readonly welcomeMsg: Locator;
    private readonly depositBanner: Locator;
    private readonly addMoneyButton: Locator;
    private readonly maybeLaterButton: Locator;
    private readonly Logoutlink: Locator;
    private readonly Logo: Locator;
    private readonly myAccountlink: Locator;
    private readonly winnerslink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.welcomeMsg = page.locator('text=Welcome,').first();
        this.depositBanner = page.getByAltText(
            'Free £20 bonus when you deposit £20 Plus 20 Free Plays'
        );
        this.addMoneyButton = page.getByRole('link', { name: 'Add money' });
        this.maybeLaterButton = page.getByText('Maybe later', { exact: true });
        this.Logoutlink = page.getByRole('link', { name: 'logout' });
        this.Logo = page.locator('div.logo.iac');
        this.myAccountlink = page.getByRole('link', { name: 'my account' });
        this.winnerslink = page.getByRole('link', { name: /winners/i });
    }

    async waitForPageLoaded() {
        await expect(this.myAccountlink).toBeVisible();
    }
    async verifyMaybeLaterButtonVisible() {
        await commonUtils.verifyVisible(this.maybeLaterButton, '"Maybe Later" button visibility');
    }

    async assertWelcomeMsg(expectedText: string = 'Welcome, techtest1') {
        await commonUtils.verifyText(this.welcomeMsg, expectedText, 'Welcome message should be visible');
    }

    async VerifyAddMoneylaterVisibility() {
        await commonUtils.verifyVisible(this.addMoneyButton, 'Add Money button visibility');
    }

    async clickAddMoneyLater(): Promise<DepositBalanceLimit> {
        await commonUtils.clickElement(this.addMoneyButton, 'Clicking Add Money button');
        await this.page.waitForURL(/deposit-balance-limit/, { timeout: 7000 });
        return new DepositBalanceLimit(this.page);
    }

    async clickMaybeLater() {
        await commonUtils.clickElement(this.maybeLaterButton, 'Clicking Maybe Later button');
    }

    async verifyPageLoaded() {
        await commonUtils.verifyPageTitle(this.page, Env.HOME_PAGE_TITLE);
    }
    async clickMyAccount() {
        await commonUtils.clickElement(this.myAccountlink, 'clicking MyAccount link');
        return new ContactReference(this.page);
    }
    async clickWinners() {
        await commonUtils.clickElement(this.winnerslink, 'clicking winners link');
        return new WinnersPage(this.page);
    }

    async verifydepositBanner() {
        await commonUtils.verifyVisible(this.depositBanner, 'Deposit banner visibility');
        await commonUtils.verifyImgLoaded(this.depositBanner, 'Deposit banner image should be loaded');
    }

    async isHomePageExists(expectedTitle: string = 'Tombola') {
        const title = await this.page.title();
        expect(title).toContain(expectedTitle);
        return title;
    }

    async clickLogout(): Promise<LoginPage> {
        //todo change the function name
        //home.page.ts
        await commonUtils.clickElement(this.Logoutlink, 'Clicking Logout link');
        return new LoginPage(this.page);
    }

    async verifyLogo() {
        await commonUtils.verifyBackgroundImage(
            this.Logo,
            'Tombola logo background image should load'
        );
    }
}
