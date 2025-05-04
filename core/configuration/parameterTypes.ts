import { defineParameterType } from '@cucumber/cucumber';
import { Utils } from '@core/utils/utils';
import { Collection } from '@pages/baseInterface/collection';

  interface IWorld {
    [key: string]: string;
    page?: any;
    pageFactory?: any;
  }
  
  defineParameterType({
    regexp: /"([^"\\]*(\\.[^"\\]*)*)"/,
    name: 'locator',
    transformer: async function(this: IWorld, string: string){
      const pageFactory = this.pageFactory;

      if (string.indexOf(' > ') !== -1) {
        const array = string.split(' > ');
        return Utils.poParser(array, pageFactory);
      }
      return string;
    },
    useForSnippets: false,
  });

  defineParameterType({
    name: 'collectionLocator',
    regexp: /"([^"]+ > [^"]+)"/,
    transformer: async function (this: IWorld, str: string)  {
      const pageFactory = this.pageFactory;
      const array = str.split(' > ');
      const parsed = await Utils.poParser(array, pageFactory);
      if (!(parsed instanceof Collection)) {
        throw new Error(`Locator '${str}' is not a Collection`);
      }
      return parsed;
    },
  });
  
  defineParameterType({
    name: 'text',
    regexp: /"([^"\\]*(\\.[^"\\]*)*)"/,
    transformer: function (textString: string) {
      const world = this as unknown as IWorld;
  
      if (textString.startsWith('$')) {
        const varName = textString.slice(1);
      return world[varName] || textString;
      }
  
      return textString.toString();
    },
    useForSnippets: false,
  });