import { expect } from 'chai';

export class CustomElement {

    static async expectElementContainingTextIsDisplayed(
        elements: any,
        text: string
    ) {
        const match = await elements.find(async (el: any) => {
            const elText = await el.getText();
            return elText.includes(text);
        });
        expect(await match?.isDisplayed()).to.be.true;
    }

    static async expectElementContainingTextIsNOTDisplayed(
        elements: any,
        text: string
    ) {
        const resolvedElements = await elements;
        const elementsArray = Array.isArray(resolvedElements) ? resolvedElements : [resolvedElements];

    for (const el of elementsArray) {
        const elText = await el.getText();
        if (elText.includes(text)) {
            expect(await el.isDisplayed()).to.be.false;
        }
    }
    }

    static async findElementByText(
        elements: WebdriverIO.Element[] | Promise<WebdriverIO.Element[]>,
        text: string
    ): Promise<WebdriverIO.Element> {
        const resolvedElements = await elements;
        for (const el of resolvedElements) {
            const elText = await el.getText();
            if (elText.includes(text)) {
                return el;
            }
        }
        throw new Error(`Element containing text "${text}" not found`);
    }
}