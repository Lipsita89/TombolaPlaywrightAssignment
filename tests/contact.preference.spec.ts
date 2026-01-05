import logger from '@utils/logger';
import { test } from '@fixtures/base.fixtures';

test('verify ContactReference page Toggle functionality', async ({ loggedInHomePage,myAccount, contactReference}) => {
  logger.info('Login successful');
  logger.info('Clicking on MyAccount link');
  await loggedInHomePage.clickMyAccount();
  logger.info('Clicking on contactPreferences side menu');
  await myAccount.clickContactPreferences();
  logger.info('Turning off the Bingo toggle');
  await contactReference.turnOffOptInAllAndVerify();
  logger.info('Turning on the Bingo toggle');
  await contactReference.turnOnOptInAllAndVerify();
  logger.info('Turning on the Bingo toggle');
  await contactReference.turnOffOptInAllAndVerify_arcade();
  logger.info('Turning off the arcade toggle');
  await contactReference.turnOnOptInAllAndVerify_arcade();
  logger.info('Turning on the arcade toggle');
  await contactReference.clickSaveChangesAndVerifyUpdated();
  logger.info('Clicking on Save changes and verified its updated');

});
