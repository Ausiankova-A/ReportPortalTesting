import { $ } from '@wdio/globals';

export async function waitForVisible(
  elementOrSelector: string | WebdriverIO.Element,
  timeout = 5000
): Promise<WebdriverIO.Element> {
  const element =
    typeof elementOrSelector === 'string'
      ? await $(elementOrSelector) 
      : elementOrSelector;
// @ts-ignore
  await element.waitForDisplayed({ timeout });
  // @ts-ignore
  return element;
}

export async function waitForClickable(
  elementOrSelector: string | WebdriverIO.Element,
  timeout = 5000
): Promise<WebdriverIO.Element> {
  const element =
    typeof elementOrSelector === 'string'
      ? await $(elementOrSelector)
      : elementOrSelector;
// @ts-ignore
  await element.waitForClickable({ timeout });
  // @ts-ignore
  return element;
}
