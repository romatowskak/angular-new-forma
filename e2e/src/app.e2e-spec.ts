import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  let modalDialog;

  beforeEach(() => {
    page = new AppPage();
    modalDialog = page.getModalDialog();
  });

  it('should display table with 8 action items', () => {
    page.navigateTo();
    expect(page.getActionItems().count()).toBe(8);
  });

  it('should open and close dialog modal', () => {
    page.navigateTo();
    page.getOpenDialogButton().click();
    browser.wait(modalDialog.isDisplayed, 5000);
    page.getCloseDialogButton().click();
    browser.sleep(3000);
    expect(page.getActionItemsTable()).toBeTruthy();
  });

  it('should open a modal dialog, fill inputs, create action item and closed dialog', () => {
    page.getOpenDialogButton().click();
    browser.wait(modalDialog.isDisplayed, 3000);
    page.passActionItemName();
    page.getMatSelect().click();
    page.getMatOption().click();
    browser.waitForAngular();
    page.passDueDate();
    browser.sleep(2000);
    browser
      .actions()
      .mouseMove(page.getCreateActionItemButton())
      .click()
      .perform();
    browser.sleep(4000);
    expect(page.getActionItems().count()).toBe(9);
  });
});
