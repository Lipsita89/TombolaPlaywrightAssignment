import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { DataProvider } from '../utils/data.providers';
import { Env } from '@pages/FrameworkConfig/env';


const jsonPath = 'testdata/logindata.json';

const loginTests = DataProvider.getLoginTests(jsonPath);

test.describe('Login Data Driven', () => {

  loginTests.forEach((data, index) => {

    test(`Login | ${index + 1} | ${data.testName} @datadriven`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await page.goto(Env.BASE_URL);

      await loginPage.clickAllowCookies();

      await loginPage.clickLogin(data.username, data.password)

      if (data.expected === 'success') {
        const homePage = new HomePage(page);
        await homePage.assertWelcomeMsg();
      } else {
        await loginPage.getErrorMessage();
      }
    });

  });

});
