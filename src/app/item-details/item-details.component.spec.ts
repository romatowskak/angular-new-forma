import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from './../app-material/app-material.module';
import { ConfirmationDialogComponent } from './../confirmationDialog/confirmation-dialog/confirmation-dialog.component';
import { ActionItem } from 'src/app/services/tasksService/tasks.service';
import { DaysLeftCountedPipe } from './../pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { CircleColorPipe } from './../pipes/circleColorPipe/circle-color.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemDetailsComponent } from './item-details.component';
import { TasksService } from '../services/tasksService/tasks.service';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material';

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;
  let actionItem: ActionItem;
  let dialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RoundProgressModule, AppMaterialModule, RouterTestingModule],
      declarations: [ItemDetailsComponent, ConfirmationDialogComponent, CircleColorPipe, DaysLeftCountedPipe],
      providers: [
        TasksService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              id: 'itemId'
            })
          }
        }
      ]
    })
      .overrideComponent(ItemDetailsComponent, { set: { changeDetection: ChangeDetectionStrategy.Default } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = TestBed.get(MatDialog);
    actionItem = {
      title: 'title',
      projectName: 'projectName',
      type: 'type',
      completed: 'completed',
      dueDate: new Date('2019/11/17'),
      id: 'id'
    };
  });

  it('should not display spinner if item was not clicked', () => {
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.fa-spin'));
    expect(spinner).toBeFalsy();
  });

  it('should display spinner if item details are being loaded', () => {
    component.isLoadingActionItem = true;
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.fa-spin'));
    expect(spinner).toBeTruthy();
  });

  it('should display days-left only if dueDate declared', () => {
    component.actionItem = actionItem;
    component.ngOnChanges();
    expect(component.daysLeftVisibility).toEqual(true);
  });

  it('should not display error message if there is an item found', () => {
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.selectedItem.errorMessage'));
    expect(errorMessage).toBeFalsy();
  });

  it('should display error message if there is no item found', () => {
    component.actionItem = undefined;
    component.errorMessage = 'No item found!';
    component.isLoadingActionItem = false;
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.selectItem.errorMessage'));
    expect(errorMessage).toBeTruthy();
  });

  it('should display "Select Action Item.." message if no action ite was selected', () => {
    component.actionItem = undefined;
    component.errorMessage = undefined;
    component.isLoadingActionItem = false;
    fixture.detectChanges();
    const selectItemMessage = fixture.debugElement.query(By.css('.selectItem.viewDetails'));
    expect(selectItemMessage).toBeTruthy();
  });

  it('should display action item details if item selected and clicked', () => {
    component.actionItem = actionItem;
    component.errorMessage = undefined;
    component.isLoadingActionItem = false;
    fixture.detectChanges();
    const actionItemDetails = fixture.debugElement.query(By.css('.details-container'));
    expect(actionItemDetails).toBeTruthy();
  });

  it('should open a confirmation dialog when button clicked', () => {
    spyOn(component, 'openConfirmationDialog');
    component.isLoadingActionItem = false;
    component.actionItem = actionItem;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.confirmationDialog')).nativeElement;
    btn.click();
    expect(component.openConfirmationDialog).toHaveBeenCalled();
  });
});
