import { Collection } from '@pages/baseInterface/collection';

export class Utils {
  static poParser(arrayOfElements: any, pages: any) {
    const pageName = arrayOfElements[0];

    const element = arrayOfElements[arrayOfElements.length - 1];
    let pathobject = pages[pageName];

  
    if (!pathobject) {
      throw new Error(`Page "${pageName}" not found in pages`);
    }

    for (let i = 1; i < arrayOfElements.length; i++) {
      let el = pathobject[arrayOfElements[i]];
      
      if (!el) {
        throw new Error(`Unable to find '${arrayOfElements[i]}' in ${JSON.stringify(pathobject, null, ' ')}`);
      }
      pathobject = el;
    }

    const isCollection = pathobject instanceof Collection;
    
    let locator;
    if (isCollection) {
      locator = pathobject; 
    } else {
      locator = typeof pathobject === 'function' ? pathobject()[element] : pathobject._selector;
    }
    
    if (locator) {
      return locator;
    }

    throw new Error(`Unable to find locator for '${element}'`);
  }
}
