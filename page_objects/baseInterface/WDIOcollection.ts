export class WDIOCollection<T> {
    constructor(
        private readonly elements: Promise<WebdriverIO.ElementArray>,
        private readonly itemClass: new (el: any, adapter: any) => T,
        private readonly adapter: any
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
