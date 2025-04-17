import { Collection } from '@pages/baseInterface/collection';

export class Utils {
  static poParser(arrayOfElements: any, pages: any) {
    const pageName = arrayOfElements[0];

    const element = arrayOfElements[arrayOfElements.length - 1];
    let Pathobject = pages[pageName];

  
    if (!Pathobject) {
      throw new Error(`Page "${pageName}" not found in pages`);
    }

    for (let i = 1; i < arrayOfElements.length; i++) {
      let el = Pathobject[arrayOfElements[i]];
      
      if (!el) {
        throw new Error(`Unable to find '${arrayOfElements[i]}' in ${JSON.stringify(Pathobject, null, ' ')}`);
      }
      Pathobject = el;
    }

    const isCollection = Pathobject instanceof Collection;
    
    let locator;
    if (isCollection) {
      locator = Pathobject; 
    } else {
      locator = typeof Pathobject === 'function' ? Pathobject()[element] : Pathobject._selector;
    }
    
    if (locator) {
      return locator;
    }

    throw new Error(`Unable to find locator for '${element}'`);
  }
}
