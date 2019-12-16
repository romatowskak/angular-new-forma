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

  getAllActionItems() {
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

  getProjectField() {
    return element(by.tagName('mat-select')).click();
  }

  getFirstProjectName() {
    return element.all(by.css('mat-option')).then(options => {
      options[0].click();
    });
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
    return (
      Math.random()
        .toString(36)
        .substring(2) + Date.now().toString(36)
    );
  }

  getNewItem(itemName) {
    return element(by.cssContainingText('.title', itemName));
  }
}
