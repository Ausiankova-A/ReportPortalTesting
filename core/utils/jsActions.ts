import { $, browser } from '@wdio/globals';

export async function dragAndDrop(
  source: string | any,
  target: string | any
): Promise<void> {
  const sourceElem = typeof source === 'string' ? await $(source) : await source;
  const targetElem = typeof target === 'string' ? await $(target) : await target;

  await sourceElem.scrollIntoView();
  await targetElem.scrollIntoView();

  await sourceElem.dragAndDrop(targetElem);
}


export async function resizeElement(
  target: string | any,
  width: number,
  height: number
): Promise<void> {
  const selector = typeof target === 'string' ? target : await target.selector;

  await browser.execute(
    (sel: string, w: number, h: number) => {
      const el = document.querySelector(sel) as HTMLElement;
      if (el) {
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
      } else {
        throw new Error('Element not found for resizing');
      }
    },
    selector,
    width,
    height
  );
}


export async function scrollToElement(
  target: string | any
): Promise<void> {
  const element = typeof target === 'string' ? await $(target) : await target;
  await element.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

export async function isElementInView(
  target: string | any
): Promise<boolean> {
  const selector = typeof target === 'string' ? target : await target.selector;

  return await browser.execute((sel: string) => {
    const el = document.querySelector(sel);
    if (!el) return false;

    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, selector);
}

export async function jsClick(
  target: string | any
): Promise<void> {
  const selector = typeof target === 'string' ? target : await target.selector;

  await browser.execute((sel: string) => {
    const el = document.querySelector(sel) as HTMLElement;
    if (el) el.click();
    else throw new Error('Element not found for click');
  }, selector);
}


export async function hoverElement(target: string | any): Promise<void> {
    const element = typeof target === 'string' ? await $(target) : await target;
    await element.scrollIntoView();
    await element.moveTo();
}


