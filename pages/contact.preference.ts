import { Page, Locator, expect } from '@playwright/test';
import { commonUtils } from '../utils/common.utils';

export class ContactReference {
  private readonly page: Page;
  private readonly bingoOptInAllToggle: Locator;
  private readonly bingoSmsCheckbox: Locator;
  private readonly bingoEmailCheckbox: Locator;
  private readonly bingoPostCheckbox: Locator;
  private readonly arcadeOptInAllToggle: Locator;
  private readonly arcadeSmsCheckbox: Locator;
  private readonly arcadeEmailCheckbox: Locator;
  private readonly arcadePostCheckbox: Locator;
  private readonly savechanges:Locator;
  private readonly updatedtext:Locator;
  private readonly alldone:Locator;

  constructor(page: Page) {
    this.page = page;
    this.bingoOptInAllToggle = page.locator('#Bingo_preferences_optInAll');
    this.bingoSmsCheckbox = page.locator('#BingoPreferences\\[0\\]\\.Value');
    this.bingoEmailCheckbox = page.locator('#BingoPreferences\\[1\\]\\.Value');
    this.bingoPostCheckbox = page.locator('#BingoPreferences\\[2\\]\\.Value');
    this.arcadeOptInAllToggle = page.locator('#Arcade_preferences_optInAll');
    this.arcadeSmsCheckbox = page.locator('#ArcadePreferences\\[0\\]\\.Value');
    this.arcadeEmailCheckbox = page.locator('#ArcadePreferences\\[1\\]\\.Value');
    this.arcadePostCheckbox = page.locator('#ArcadePreferences\\[2\\]\\.Value');
    this.savechanges=page.getByRole('button', { name: /save changes/i });
    this.updatedtext=page.getByRole('heading', { name: 'Updated' });
    this.alldone=page.getByText('All done, your preferences have been updated!', { exact: true });
  }

  async turnOffOptInAllAndVerify(): Promise<void> {
    await commonUtils.toggleOff(this.bingoOptInAllToggle, 'Bingo Opt-in All toggle');
    await commonUtils.expectUnchecked(this.bingoSmsCheckbox, 'Bingo SMS');
    await commonUtils.expectUnchecked(this.bingoEmailCheckbox, 'Bingo Email');
    await commonUtils.expectUnchecked(this.bingoPostCheckbox, 'Bingo Post');
  }

  async turnOnOptInAllAndVerify(): Promise<void> {
    await commonUtils.toggleOn(this.bingoOptInAllToggle, 'Bingo Opt-in All toggle');
    await commonUtils.expectChecked(this.bingoSmsCheckbox, 'Bingo SMS');
    await commonUtils.expectChecked(this.bingoEmailCheckbox, 'Bingo Email');
    await commonUtils.expectChecked(this.bingoPostCheckbox, 'Bingo Post');
  }

  async turnOffOptInAllAndVerify_arcade(): Promise<void> {
    await commonUtils.toggleOff(this.arcadeOptInAllToggle, 'Arcade Opt-in All toggle');
    await commonUtils.ensureUnchecked(this.arcadeSmsCheckbox, 'Arcade SMS');
    await commonUtils.ensureUnchecked(this.arcadeEmailCheckbox, 'Arcade Email');
    await commonUtils.ensureUnchecked(this.arcadePostCheckbox, 'Arcade Post');
  }

  async turnOnOptInAllAndVerify_arcade(): Promise<void> {
    await commonUtils.toggleOn(this.arcadeOptInAllToggle, 'Bingo Opt-in All toggle');
    await commonUtils.ensureChecked(this.arcadeSmsCheckbox, 'Arcade SMS');
    await commonUtils.ensureChecked(this.arcadeEmailCheckbox, 'Arcade Email');
    await commonUtils.ensureChecked(this.arcadePostCheckbox, 'Arcade Post');
  }

  async clickSaveChangesAndVerifyUpdated(): Promise<void> {
    await this.savechanges.click();
  
    await expect(this.page).toHaveURL(/\/my-account\/updated$/);
    await expect(this.updatedtext).toBeVisible();
    await expect(this.alldone).toBeVisible();
  }
  
}
