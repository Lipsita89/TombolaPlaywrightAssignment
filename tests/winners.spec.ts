import { expect } from '@playwright/test';
import { test } from '@fixtures/base.fixtures';
import logger from '@utils/logger';
import { commonUtils } from '@utils/common.utils';

test('Winners page dropdown validation', async ({ loggedInHomePage,winnerspage }) => {
    logger.info('getting the dropdown options');
    const values = await winnerspage.getDropdownOptions();
    logger.info('expecting Last 50 pulse JP winners')
    expect(values).toContain('Last 50 pulse JP winners');
    logger.info('selecting the Last50PulseJP option')
    await winnerspage.selectLast50PulseJP();
    logger.info('getting the row count')
    const rowCount = await winnerspage.getWinnerRowCount();
    await commonUtils.expectMoreThanZero(rowCount);
    logger.info('verified the rows count is more than zero');
}),

test('Winners page title validation', async ({ loggedInHomePage,winnerspage }) => {
    logger.info('verifying the Title');
    await winnerspage.verifyPageLoaded();
    logger.info('verified the Title');
});
