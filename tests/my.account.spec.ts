import logger from '@utils/logger';
import { test } from '@fixtures/base.fixtures';


test('verify left menu items', async ({ loggedInHomePage, myAccount }) => {
    logger.info('Verifying the left menu');
    await myAccount.verifyLeftMenuVisible();
    logger.info('Verified the left menu');
}),

test('verify My Account page title', async ({ loggedInHomePage, myAccount }) => {
    logger.info('Verifying the Title');
    await myAccount.verifyPageLoaded();
    logger.info('Verified the Title');
});
