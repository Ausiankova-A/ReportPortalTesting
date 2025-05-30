import { BasePage } from '@pages/baseInterface/basePage';
import { LocatorAdapter } from '@core/configuration/LocatorAdapter';

export class AddNewWidget extends BasePage {
    nextStepButton: any;
    demoFilter: any;
    widgetName: any;
    widgetDescription: any;
    addButton: any;
    saveButton: any;

    constructor(page: any, locatorAdapter: LocatorAdapter) {
        super(page, locatorAdapter);

        this.nextStepButton = this.locatorAdapter.getLocator('.widgetWizardContent__widget-wizard-content--InQJb .ghostButton__ghost-button--r7c9T');
        this.addButton = this.locatorAdapter.getLocator('button.bigButton__big-button--BmG4Q');
        this.saveButton = this.locatorAdapter.getLocator('button.bigButton__big-button--BmG4Q.bigButton__color-booger--EpRlL');
        this.demoFilter = this.locatorAdapter.getLocator('label.inputRadio__input-radio--EMMTx');
        this.widgetName = this.locatorAdapter.getLocator('input.input__input--iYEmM');
        this.widgetDescription = this.locatorAdapter.getLocator('textarea.inputTextArea__input-text-area--N0goa');
    }

    get widgetType(){
        return this.locatorAdapter.getLocators('div.widgetTypeItem__widget-type-item-name--WYizn');
    }
}