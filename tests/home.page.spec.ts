import { test } from '@fixtures/base.fixtures';
import { HomePage } from '@pages/home.page';
import { expect } from '@playwright/test';
import logger from '../utils/logger';

test('verify BannerImage', async ({loggedInHomePage}) => {
    logger.info('Starting test: verify BannerImage');
    logger.info('Login successful');
    await loggedInHomePage.verifydepositBanner();
    logger.info('Verified deposit banner');
    logger.info('Completed test: verify BannerImage');
}),

test('verify the Page TITLE', async ({loggedInHomePage}) => {
    logger.info('Starting test: verify Title');
    logger.info('Login successful');
    await loggedInHomePage.verifyPageLoaded();
    logger.info('Completed test: verify Title');
}),

test('verify Logo', async ({loggedInHomePage}) => {
    logger.info('Starting test: verify Logo');
    logger.info('Login successful');
    await loggedInHomePage.verifyLogo();
    logger.info('Verified Logo');
    logger.info('Completed test: verify Logo');
}),

test('verify Bingo90JungleGame', async ({loggedInHomePage}) => {
    logger.info('Starting test: verify Logo');
    logger.info('Login successful');
    await loggedInHomePage.clickMaybeLater();
    const gamePage=await loggedInHomePage.clickBingo90JungleTileAndSwitch();
    await loggedInHomePage.verifyBingo90JungleGameLaunched(gamePage);
    logger.info('Verified Bingo90JungleGame');
    logger.info('Completed test: Bingo90JungleGame');
}),

test('verify AddMoneyButton visibility', async ({loggedInHomePage}) => {
    logger.info('Starting test: verify AddMoneyButton visibility');
    logger.info('Login successful');
    await loggedInHomePage.VerifyAddMoneylaterVisibility();
    logger.info('Verified Add Money Later button visibility');
    logger.info('Completed test: verify AddMoneyButton visibility');
}),

test('verify MayBeLater visibility', async ({ loggedInHomePage }) => {
    logger.info('Starting test: verify MayBeLater visibility');
    logger.info('Login successful');
    await loggedInHomePage.verifyMaybeLaterButtonVisible();
    logger.info('Verified Maybe Later button visibility');
    logger.info('Completed test: verify MayBeLater visibility');
});

