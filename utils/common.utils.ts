import { Page, expect, Locator } from '@playwright/test';

export class commonUtils {

  static async verifyVisible(locator: Locator, message?: string) {
    if (message) {
      await expect(locator, message).toBeVisible();
    } else {
      await expect(locator).toBeVisible();
    }
  }

  static async verifyBackgroundImage(
    locator: Locator,
    message?: string
  ) {
    await expect(locator, message).toBeVisible();

    const backgroundImage = await locator.evaluate(el =>
      window.getComputedStyle(el).backgroundImage
    );

    expect(
      backgroundImage,
      message ?? 'Background image should be present'
    ).not.toBe('none');
  }

  static async verifyText(locator: Locator, expectedText?: string, message?: string): Promise<string> {

    await this.verifyVisible(locator, message);

    const text = await locator.textContent();

    if (text === null) {
      throw new Error(`Locator has no text content${message ? `: ${message}` : ''}`);
    }

    const trimmedText = text.trim();

    if (expectedText !== undefined) {
      await expect(trimmedText).toBe(expectedText);
    }

    return trimmedText;
  }

  static async clickElement(locator: Locator, message?: string) {
    await locator.waitFor({ state: 'visible' });
    if (message) console.log(`Clicking on: ${message}`);
    await locator.click();
  }

  static async verifyAllVisible(...locators: Locator[]) {
    for (const locator of locators) {
      await expect(locator).toBeVisible();
    }
  }
  static async clickAndSwitchToNewWindow(
    page: Page,
    locator: Locator,
    description?: string
  ): Promise<Page> {
    await expect(locator).toBeVisible();
    if (description) {
      console.log(`Clicking: ${description}`);
    }
    const newPagePromise = page.context().waitForEvent('page');
    await locator.click();
    const newPage = await newPagePromise;
    await newPage.waitForLoadState('domcontentloaded');
    await newPage.bringToFront();
    return newPage;
  }

  static async verifyAttached(locator: Locator, message?: string) {
    await expect(locator, message ?? 'Element should exist').toBeAttached();
  }

  static async verifyImgLoaded(locator: Locator, message?: string, timeout: number = 5000) {
    await expect(locator, message).toBeVisible({ timeout });

    const isLoaded = await locator.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);
    expect(isLoaded, message ?? 'Image should be loaded and visible').toBe(true);
  }

  private static async clickLabelIfPresent(input: Locator): Promise<boolean> {
    const label = input.locator('xpath=ancestor::label[1]');
    if (await label.count()) {
      await label.click();
      return true;
    }
    return false;
  }

  static async toggleOff(locator: Locator, message?: string) {

    await this.verifyAttached(locator, message ?? 'Toggle should exist');

    if (await locator.isChecked()) {

      const clicked = await this.clickLabelIfPresent(locator);
      if (!clicked) {
        await locator.uncheck();
       
      }
    }

    await expect(locator, message ?? 'Toggle should be OFF').not.toBeChecked();
  }

  static async expectUrlContains(
    page: Page,
    expectedText: string
  ) {
    await page.waitForLoadState('domcontentloaded');
    const currentUrl = page.url();
    expect(currentUrl).toContain(expectedText);
  }
  
  static async toggleOn(locator: Locator, message?: string) {
    await this.verifyAttached(locator, message ?? 'Toggle should exist');

    if (!(await locator.isChecked())) {
      const clicked = await this.clickLabelIfPresent(locator);
      if (!clicked) {
        await locator.check();
      }
    }
    await expect(locator, message ?? 'Toggle should be ON').toBeChecked();
  }

  static async expectUnchecked(locator: Locator, message?: string) {
    await this.verifyAttached(locator, message ?? 'Checkbox should exist');
    await expect(locator, message ?? 'Checkbox should be unchecked').not.toBeChecked();
  }

  static async expectChecked(locator: Locator, message?: string) {
    await this.verifyAttached(locator, message ?? 'Checkbox should exist');
    await expect(locator, message ?? 'Checkbox should be checked').toBeChecked();
  }

  static async ensureUnchecked(locator: Locator, message?: string) {
    await this.verifyAttached(locator, message ?? 'Checkbox should exist');

    if (await locator.isChecked()) {
      await locator.uncheck();
    }
    await expect(locator, message ?? 'Checkbox should be unchecked').not.toBeChecked();
  }

  static async ensureChecked(locator: Locator, message?: string) {
    await this.verifyAttached(locator, message ?? 'Checkbox should exist');

    if (!(await locator.isChecked())) {
      await locator.check();
    }

    await expect(locator, message ?? 'Checkbox should be checked').toBeChecked();
  }

  // static getCheckboxInSection(section: Locator, label: string): Locator {
  //   return section.getByLabel(label, { exact: true });
  // }

  static async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  static async expectMoreThanZero(value: number) {
    expect(value).toBeGreaterThan(0);
  }
  static async clickLinkAndVerifyHeading(link: Locator) {
    await expect(link).toBeVisible();
    await link.click();
  }

  static async getDropdownValues(dropdown: Locator): Promise<string[]> {
    await expect(dropdown).toBeVisible();
    const values = await dropdown.locator('option').allTextContents();
    return values.map(v => v.trim());
  }

  static async selectDropdownByValue(dropdown: Locator, value: string) {
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption({ value });
  }

  // static async getRowCount(rows: Locator): Promise<number> {
  //   await expect(rows.first()).toBeVisible();
  //   return rows.count();
  // }

  static async getVisibleRowCount(rows: Locator): Promise<number> {
    await rows.first().waitFor({ state: 'visible' });
    return await rows.count();
  }

  static async verifyPageTitle(page: Page, expectedTitle?: string | RegExp) {
    await page.waitForLoadState('domcontentloaded');
    const title = await page.title();
    if (expectedTitle) {
      if (expectedTitle instanceof RegExp) {
        expect(title).toMatch(expectedTitle);
      } else {
        expect(title).toBe(expectedTitle);
      }
    }
    return title;
  }
}