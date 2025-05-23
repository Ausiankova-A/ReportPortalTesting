export class WDIOCollection<T> {
    constructor(
        private elements: Promise<WebdriverIO.ElementArray>,
        private itemClass: new (el: any, adapter: any) => T,
        private adapter: any
    ) {}

    async find(filterFn: (el: WebdriverIO.Element) => Promise<boolean>): Promise<T | undefined> {
        const els = await this.elements;
        for (const el of els) {
            if (await filterFn(el)) {
                return new this.itemClass(el, this.adapter);
            }
        }
        return undefined;
    }
}
