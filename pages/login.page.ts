import { Page, expect, Locator } from '@playwright/test';
import logger from '@utils/logger';
import { commonUtils } from '@utils/common.utils';
import { Env } from './FrameworkConfig/env';


export class LoginPage {
    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly allowCookies: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {

        this.page = page;
        this.usernameInput = page.locator('input[name="LoginCredential"]');
        this.passwordInput = page.locator('input[name="Password"]');
        this.loginButton = page.getByRole('button', { name: /log in/i });
        this.allowCookies = page.getByRole('button', { name: /allow all cookies/i });
        this.errorMessage = page.locator('li.feedback-entry.invalid-feedback-entry',
            { hasText: 'The details you have entered are incorrect' }
        );
    }
    
    async clickAllowCookies() {
        try {
            await this.allowCookies.waitFor({ state: 'visible', timeout: 3000 });
            await this.allowCookies.click();
            await expect(this.allowCookies).toBeHidden();
        } catch {
        }
    }

    async isLoginPageExists(): Promise<void> {
        await expect(this.page).toHaveTitle(/(tombola - log in to play|Britain's Biggest Bingo Site.*tombola)/i);
    }
    
    async verifyPageLoaded() {
        await commonUtils.verifyPageTitle(this.page, Env.LOGIN_PAGE_TITLE);
    }

    async clickLogin(uname: string, pWord: string) {

        await this.usernameInput.fill(uname);
        await this.passwordInput.fill(pWord);
        await this.passwordInput.press('Tab');
        await this.loginButton.click();
    }

    async getErrorMessage() {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(/The details you have entered are incorrect/i);
    }

    async assertLoginButtonVisible() {
        await expect(this.loginButton).toBeVisible();

    }
}