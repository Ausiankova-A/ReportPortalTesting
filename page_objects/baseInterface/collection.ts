import { Locator } from '@playwright/test';


type ItemClass<T> = new (...args: any[]) => T;

interface FilterOptions {
    has?: Locator;
    hasNot?: Locator;
    hasNotText?: string | RegExp;
    hasText?: string | RegExp;
}

export class Collection<T> {
    constructor(
        public locator: Locator,
        public itemClass: ItemClass<T>,
        public locatorAdapter: any 
    ) {}

    filter(options: FilterOptions): T {
        return new this.itemClass(this.locator.filter(options), this.locatorAdapter);
    }
}

export function collection<T>(locator: Locator, itemClass: ItemClass<T>, locatorAdapter: any) {
    return new Collection(locator, itemClass, locatorAdapter);
}