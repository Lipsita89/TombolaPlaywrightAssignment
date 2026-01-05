import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { HomePage } from '../../pages/home.page';
import { DepositBalanceLimit } from '../../pages/deposit.balance.limit';
import { ContactReference } from '@pages/contact.preference';
import { WinnersPage } from '@pages/winners';
import { MyAccount } from '@pages/my.account';
import { Env } from '@pages/FrameworkConfig/env';

type MyFixtures = {
  loggedInHomePage: HomePage;
  depositPage: DepositBalanceLimit;
  depositBalanceLimit: DepositBalanceLimit;
  contactReference: ContactReference;
  winnerspage: WinnersPage;
  myAccount: MyAccount;
};

export const test = base.extend<MyFixtures>({
  loggedInHomePage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await page.goto(Env.BASE_URL);
    await loginPage.clickAllowCookies();
    await loginPage.isLoginPageExists();
    await loginPage.clickLogin(Env.USERNAME, Env.PASSWORD);
    await homePage.waitForPageLoaded();
    await use(homePage);
  },

  depositPage: async ({ loggedInHomePage }, use) => {
    const depositPage = await loggedInHomePage.clickAddMoneyLater();
    await use(depositPage);
  },

  depositBalanceLimit: async ({ loggedInHomePage,depositPage }, use) => {
    await loggedInHomePage.clickAddMoneyLater();
    await depositPage.verifyPageLoaded();
    await use(depositPage);
  },

  contactReference: async ({ page }, use) => {
    await use(new ContactReference(page));
  },

  winnerspage: async ({ loggedInHomePage, page }, use) => {
    const winnersPage = new WinnersPage(page);
    await loggedInHomePage.clickMaybeLater();
    await loggedInHomePage.clickWinners();
    await use(winnersPage);
  },

  myAccount: async ({ loggedInHomePage, page }, use) => {
    const myAccountPage = new MyAccount(page);
    await loggedInHomePage.clickMaybeLater();
    await loggedInHomePage.clickMyAccount();
    await use(myAccountPage);
  },
});
