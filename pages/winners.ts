import { Page, Locator } from '@playwright/test';
import { commonUtils } from '@utils/common.utils';
import { Env } from './FrameworkConfig/env';

export class WinnersPage {
  private page: Page;

  private readonly jackpotDropdown: Locator;
  private readonly rows: Locator;
  private readonly winnersLink:Locator;
  private readonly heading:Locator;

  constructor(page: Page) {
    this.page = page;
    this.winnersLink = page.getByRole('link', { name: 'winners' });
    this.heading = page.getByRole('heading', { name: /winners/i });
    this.jackpotDropdown = page.locator('#jackpot-drop-down');
    this.rows = page.locator('table tbody tr');
  }

  async openWinnersPage() {
    await commonUtils.clickLinkAndVerifyHeading(
      this.winnersLink
    );
  }

  async getDropdownOptions(): Promise<string[]> {
    return await commonUtils.getDropdownValues(this.jackpotDropdown);
  }

  async selectLast50PulseJP() {
    await commonUtils.selectDropdownByValue(this.jackpotDropdown, 'pulse');
  }

  async getWinnerRowCount(): Promise<number> {
    return await commonUtils.getVisibleRowCount(this.rows);
  }

  async verifyPageLoaded() {
    await commonUtils.verifyPageTitle(this.page, Env.WINNERS_PAGE_TITLE);
  }
}
