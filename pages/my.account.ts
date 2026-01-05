import { Locator, Page} from "@playwright/test";
import { commonUtils } from "@utils/common.utils";
import { Env } from "./FrameworkConfig/env";

export class MyAccount {
    readonly page: Page;
    readonly contactPreferencesLink: Locator;
    readonly homeLink: Locator;
    readonly addMoneyLink: Locator;
    readonly safeplayLink: Locator;
    readonly withdrawFundsLink: Locator;
    readonly accountDetailsLink: Locator;
    readonly personalDetailsLink: Locator;
    readonly paymentDetailsLink: Locator;
    readonly transactionHistoryLink: Locator;
    readonly uploadIdLink: Locator;
    readonly referAFriendLink: Locator;
    readonly leftNav: Locator;

    constructor(page: Page) {
        this.page = page;
        this.leftNav = page
            .getByRole('navigation')
            .filter({ has: page.getByRole('link', { name: /withdraw funds/i }) });
        this.contactPreferencesLink = page.getByRole('link', { name: 'contact preferences' });
        this.homeLink = this.leftNav.getByRole('link', { name: /^home$/i });
        this.addMoneyLink = this.leftNav.getByRole('link', { name: /add money/i });
        this.safeplayLink = this.leftNav.getByRole('link', { name: /safeplay/i });
        this.withdrawFundsLink = this.leftNav.getByRole('link', { name: /withdraw funds/i });
        this.accountDetailsLink = this.leftNav.getByRole('link', { name: /account details/i });
        this.personalDetailsLink = this.leftNav.getByRole('link', { name: /personal details/i });
        this.contactPreferencesLink = this.leftNav.getByRole('link', { name: /contact preferences/i });
        this.paymentDetailsLink = this.leftNav.getByRole('link', { name: /payment details/i });
        this.transactionHistoryLink = this.leftNav.getByRole('link', { name: /transaction history/i });
        this.uploadIdLink = this.leftNav.getByRole('link', { name: /upload id/i });
        this.referAFriendLink = this.leftNav.getByRole('link', { name: /refer a friend/i });
    }
    async clickContactPreferences() {

        await commonUtils.clickElement(this.contactPreferencesLink, 'clicking MyAccount link');
    }

    async verifyLeftMenuVisible(): Promise<void> {
        await commonUtils.verifyAllVisible(
            this.homeLink,
            this.addMoneyLink,
            this.safeplayLink,
            this.withdrawFundsLink,
            this.accountDetailsLink,
            this.personalDetailsLink,
            this.contactPreferencesLink,
            this.paymentDetailsLink,
            this.transactionHistoryLink,
            this.uploadIdLink,
            this.referAFriendLink
        );
    }
    async verifyPageLoaded() {
        await commonUtils.verifyPageTitle(this.page, Env.MYACCOUNT_PAGE_TITLE);
    }


}