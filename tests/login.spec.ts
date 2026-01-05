
import { test } from '@fixtures/base.fixtures';
import logger from '../utils/logger';

test('user login test', async ({loggedInHomePage}) => {
   logger.info('Starting user login test');
   logger.info('Login attempted with provided credentials');
   await loggedInHomePage.assertWelcomeMsg();
   logger.info('Verified welcome message on HomePage');
   logger.info('User login test completed successfully'); 
}),

test('verify the page title', async ({loggedInHomePage}) => {
   logger.info('Starting test: verify Title');
   logger.info('Login successful');
   await loggedInHomePage.verifyPageLoaded();
   logger.info('Completed test: verify Title');
}),

test('user logout ',async({loggedInHomePage})=>{
   logger.info('Starting user logout test');
   logger.info('Login attempted with provided credentials');
   logger.info('Clicked "Maybe Later" on HomePage if prompted');
   await loggedInHomePage.clickMaybeLater();
   const loggedOutLoginPage = await loggedInHomePage.clickLogout();
   logger.info('User clicked Logout');
   await loggedOutLoginPage.assertLoginButtonVisible();
   logger.info('Verified Login button is visible after logout');
   logger.info('User logout test completed successfully');
});

