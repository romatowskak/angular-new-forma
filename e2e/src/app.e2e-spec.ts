import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display table with 8 action items', () => {
    page.navigateTo();
    expect(page.getActionItems().count()).toBe(8);
  });

  it('should open and close dialog modal', () => {
    page.navigateTo();
    page.openDialog();
    page.getCloseDialogButton().click();
    expect(page.getModalDialog().isPresent()).toEqual(false);
  });

  it('should open a modal dialog, fill inputs, create action item and closed dialog', () => {
    const itemName = page.itemUUID();
    page.openDialog();
    page.passActionItemName(itemName);
    page.getMatSelect().click();
    page.getMatOption().click();
    page.passDueDate();
    browser
      .actions()
      .mouseMove(page.getCreateActionItemButton())
      .click()
      .perform();
    expect(page.getNewItem(itemName)).toBeTruthy();
  });
});
