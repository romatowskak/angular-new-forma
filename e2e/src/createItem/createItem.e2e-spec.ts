import { CreateItemPage } from './createItem.po';

describe('workspace-project App', () => {
  let page: CreateItemPage;

  beforeEach(() => {
    page = new CreateItemPage();
  });

  it('should display table with 8 action items', () => {
    page.navigateToAllActionItems();
    expect(page.getAllActionItems().count()).toBe(8);
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
  });
});
