import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';


Given('I set unique name with prefix {string} and today date as {word}', async function (prefix, alias) {
    const unique = `${prefix}-${Date.now()}`;
    this.testData[alias] = unique;
  });



When('I click on {locator} button', async function (locator) {
    await this.page.waitForSelector(locator, { state: 'visible' });
    await this.page.click(locator);
});

When('I fill in {locator} field with {text}', async function (string, valueKey) {
    await this.page.waitForSelector(string, { state: 'visible' });
    await this.page.locator(string).clear();
    const value = this.testData?.[valueKey] ?? valueKey;
  await this.page.locator(string).fill(value);
});

When('I delete element {collectionLocator} with text {text}', async function (collection, valueKey) {
  const value = this.testData?.[valueKey] ?? valueKey;
  await collection.filter({ hasText: value }).deleteDashboard.click();
});

When('I edit element {collectionLocator} with text {text}', async function (collection, valueKey) {
  const value = this.testData?.[valueKey] ?? valueKey;
  await collection.filter({ hasText: value }).editDashboard.click();
});



Then('I expect element {locator} is visible', async function (locator) {
    await expect(this.page.locator(locator)).toBeVisible();
    }
);

Then('I expect element {locator} is hidden', async function (locator) {
    await expect(this.page.locator(locator)).toBeHidden();
    }
);

Then('I expect element {locator} with text {text} is visible', async function (locator, valueKey) {
  const value = this.testData?.[valueKey] ?? valueKey;
    const finalLocator = this.page.locator(locator).filter({ hasText: value });
    await expect(finalLocator).toBeVisible();
  });

Then('I expect element {locator} with text {text} is hidden', async function (locator, valueKey) {
  const value = this.testData?.[valueKey] ?? valueKey;
    const finalLocator = this.page.locator(locator).filter({ hasText: value });
    await expect(finalLocator).toBeHidden();
  });

  Then('I expect dashboard has the following data:', async function (dataTable) {
    const expectedData = dataTable.rowsHash();

    for (const key in expectedData) {
      const rawValue = expectedData[key];
      expectedData[key] = this.testData[rawValue] ?? rawValue;
    }
  
    const nameLocator = this.page.locator('[class*="dashboardTable__name"]');
    const descLocator = this.page.locator('[class*="dashboardTable__description"]');
  
    if (expectedData.Name) {
      await expect(nameLocator.filter({ hasText: expectedData.Name })).toBeVisible();
    }
    if (expectedData.Description) {
      await expect(descLocator.filter({ hasText: expectedData.Description })).toBeVisible();
    }
  });