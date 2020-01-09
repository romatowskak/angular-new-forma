import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class AppPage {
  navigateToAllActionItems(): promise.Promise<string> {
    return browser.get('/items');
  }

  openDialog(): void {
    this.getOpenDialogButton().click();
    browser.wait(this.getModalDialog().isDisplayed, 3000);
  }

  getActionItemsTable(): ElementFinder {
    return element(by.css('.tableContainer'));
  }

  getAllActionItems(): ElementArrayFinder {
    return element.all(by.css('.singleItem'));
  }

  getOpenDialogButton(): ElementFinder {
    return element(by.css('.addItem'));
  }

  getModalDialog(): ElementFinder {
    return element(by.css('.dialogModal'));
  }

  getCreateActionItemButton(): ElementFinder {
    return element(by.css('.create'));
  }

  getCloseDialogButton(): ElementFinder {
    return element(by.css('.close'));
  }

  getProjectField(): promise.Promise<void> {
    return element(by.tagName('mat-select')).click();
  }

  getFirstProjectName(): promise.Promise<void> {
    return element.all(by.css('mat-option')).then(options => {
      options[0].click();
    });
  }

  getItemNameInput(): ElementFinder {
    return element(by.css('.nameInput'));
  }

  getProjectInput(): ElementFinder {
    return element(by.css('.projectInput'));
  }

  getDateInput(): ElementFinder {
    return element(by.css('.dateInput'));
  }

  passActionItemName(itemName): promise.Promise<void> {
    return this.getItemNameInput().sendKeys(itemName);
  }

  passDueDate(): promise.Promise<void> {
    return this.getDateInput().sendKeys('2019/11/15');
  }

  itemUUID(): string {
    return (
      Math.random()
        .toString(36)
        .substring(2) + Date.now().toString(36)
    );
  }

  getNewItem(itemName): ElementFinder {
    return element(by.cssContainingText('.title', itemName));
  }

  navigateToTheFirstActionItem(): promise.Promise<string> {
    return browser.get('/items?id=1');
  }

  navigateToTheSecondActionItem(): promise.Promise<string> {
    return browser.get('/items?id=2');
  }

  navigateToNonExistingActionItem(): promise.Promise<string> {
    return browser.get('/items?id=wrongPath');
  }

  getActionItemDetails(): ElementArrayFinder {
    return element.all(by.css('.details-container'));
  }

  getActionItemName(): ElementFinder {
    return element(by.css('.top.title'));
  }

  getErrorMessage(): ElementFinder {
    return element(by.css('.errorMessage'));
  }
}
