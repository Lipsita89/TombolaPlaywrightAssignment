
import { test } from '@fixtures/base.fixtures';
import logger from '../utils/logger';

test('verify Deposit Balance Limit Header visibility', async ({ loggedInHomePage,depositPage }) => {
        logger.info('Starting test: verify Deposit Balance Limit Header  visibility');
        await depositPage.assertHeaderVisible();
        logger.info('Completed test: verify Deposit Balance Limit Header visibility');
})

test('verify DepositBalanceLimit title ', async ({ depositPage }) => {
        logger.info('Starting test: verify DepositBalanceLimit title');
        await depositPage.verifyPageLoaded();
        logger.info('Completed test: verify DepositBalanceLimit title');
})
