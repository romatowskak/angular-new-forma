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

  uniqueID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  getItemNameInputId() {
    const name = this.getItemNameInput();
    name.id = 'id';
    return name.id;
  }
}
