import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getActionItemsTable() {
    return element(by.css('.table-container'));
  }

  getActionItems() {
    return element.all(by.css('.single-item'));
  }

  getOpenDialogButton() {
    return element(by.css('.add-item'));
  }

  getModalDialog() {
    return element(by.css('.dialog-modal'));
  }

  getCreateActionItemButton() {
    return element(by.css('.create'));
  }

  getCloseDialogButton() {
    return element(by.css('.close'));
  }

  getMatSelect() {
    return element(by.tagName('mat-select'));
  }

  getMatOption() {
    return element(by.cssContainingText('mat-option', 'CASD Wilson & Lamberton Middle Schools'));
  }

  getItemNameInput() {
    return element(by.css('.name-input'));
  }

  getProjectInput() {
    return element(by.css('.project-input'));
  }

  getDateInput() {
    return element(by.css('.date-input'));
  }

  passActionItemName() {
    return this.getItemNameInput().sendKeys('New Action Item');
  }

  passDueDate() {
    return this.getDateInput().sendKeys('2019/11/15');
  }
}
