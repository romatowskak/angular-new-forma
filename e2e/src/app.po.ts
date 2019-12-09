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

  getProjectNameInput() {
    return element(by.css('.project-input'));
  }

  getItemNameInput() {
    return element(by.css('.name-input'));
  }

  getDateInput() {
    return element(by.css('.date-input'));
  }
}
