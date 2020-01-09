import { browser } from 'protractor';
import { AppPage } from '../app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display table with 8 action items', () => {
    page.navigateToAllActionItems();
    expect(page.getAllActionItems().count()).toBe(8);
    expect(page.getActionItemDetails().isPresent()).toBe(false);
  });

  it('should open and close dialog modal', () => {
    page.navigateToAllActionItems();
    page.openDialog();
    page.getCloseDialogButton().click();
    expect(page.getModalDialog().isPresent()).toEqual(false);
  });

  it('should open a modal dialog, fill inputs, create action item and closed dialog', () => {
    const itemName = page.itemUUID();
    page.openDialog();
    page.passActionItemName(itemName);
    page.getProjectField();
    page.getFirstProjectName();
    page.passDueDate();
    page.getCreateActionItemButton().click();
    expect(page.getNewItem(itemName)).toBeTruthy();
    expect(page.getActionItemDetails().isPresent()).toBe(true);
    expect(page.getActionItemName().getText()).toContain(itemName);
  });

  it('should display error to all items view if there is no item found', () => {
    page.navigateToNonExistingActionItem();
    expect(page.getActionItemDetails().isPresent()).toBe(false);
    expect(page.getErrorMessage().isPresent()).toBe(true);
  });
});
