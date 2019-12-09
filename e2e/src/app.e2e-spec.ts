import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display table with 6 action items', () => {
    page.navigateTo();
    expect(page.getActionItemsTable()).toBeTruthy();
    expect(page.getActionItems().count()).toBe(6);
  });

  it('should open and close dialog modal', () => {
    page.navigateTo();
    page.getOpenDialogButton().click();
    browser.wait(element(by.css('.dialog-modal')).isDisplayed, 5000);
    page.getCloseDialogButton().click();
    expect(page.getModalDialog()).toBeTruthy();
  });

  it('should open a modal dialog, fill inputs and create action item', () => {
    page.getOpenDialogButton().click();
    browser.wait(element(by.css('.dialog-modal')).isDisplayed, 3000);
    page.getItemNameInput().sendKeys('New Action Item');
    page.getProjectNameInput().sendKeys('Project Name');
    page.getDateInput().sendKeys('2019/11/15');
    browser
      .actions()
      .mouseMove(page.getCreateActionItemButton())
      .click()
      .perform();

    // expect(page.getActionItems().count()).toBe(7);
  });
});
