import { browser, by, element, ElementArrayFinder, ElementFinder, promise } from 'protractor';

export class DisplayItemDetailsPage {
  navigateToMain(): promise.Promise<string> {
    return browser.get('/');
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

  getAllActionItems(): ElementArrayFinder {
    return element.all(by.css('.singleItem'));
  }

  getActionItemDetails(): ElementArrayFinder {
    return element.all(by.css('.details-container'));
  }

  getActionItemName(): ElementFinder {
    return element(by.css('.top.title'));
  }
}
