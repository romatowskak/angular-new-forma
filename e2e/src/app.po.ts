import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  openDialog() {
    this.getOpenDialogButton().click();
    browser.wait(this.getModalDialog().isDisplayed, 3000);
  }

  getActionItemsTable() {
    return element(by.css('.tableContainer'));
  }

  getActionItems() {
    return element.all(by.css('.singleItem'));
  }

  getOpenDialogButton() {
    return element(by.css('.addItem'));
  }

  getModalDialog() {
    return element(by.css('.dialogModal'));
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
    return element(by.css('.nameInput'));
  }

  getProjectInput() {
    return element(by.css('.projectInput'));
  }

  getDateInput() {
    return element(by.css('.dateInput'));
  }

  passActionItemName(itemName) {
    return this.getItemNameInput().sendKeys(itemName);
  }

  passDueDate() {
    return this.getDateInput().sendKeys('2019/11/15');
  }

  itemUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  getNewItem(itemName) {
    return element(by.cssContainingText('.title', itemName));
  }
}
