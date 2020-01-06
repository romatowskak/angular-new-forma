import { browser } from 'protractor';
import { DisplayItemDetailsPage } from './displayItemDetails.po';

describe('workspace-project App', () => {
  let page: DisplayItemDetailsPage;

  beforeEach(() => {
    page = new DisplayItemDetailsPage();
  });

  it('should display table with 8 action items', () => {
    page.navigateToMain();
    expect(page.getAllActionItems().count()).toBe(8);
  });

  it('should display the first action item details', () => {
    page.navigateToTheFirstActionItem();
    browser.sleep(5000);
    expect(page.getActionItemDetails().isPresent()).toBe(true);
    expect(page.getActionItemName().getText()).toContain('Android - UI Automation Test');
  });

  it('should display the second action item details', () => {
    page.navigateToTheSecondActionItem();
    expect(page.getActionItemDetails().isPresent()).toBe(true);
    expect(page.getActionItemName().getText()).toContain('The Flash Tutorial');
  });

  it('should navigate to all items view if there is no item found', () => {
    page.navigateToNonExistingActionItem();
    expect(page.getActionItemDetails().isPresent()).toBe(false);
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/items');
  });
});
