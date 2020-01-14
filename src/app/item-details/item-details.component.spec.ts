import { ActionItem } from 'src/app/services/tasksService/tasks.service';
import { DaysLeftCountedPipe } from './../pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { CircleColorPipe } from './../pipes/circleColorPipe/circle-color.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemDetailsComponent } from './item-details.component';
import { TasksService } from '../services/tasksService/tasks.service';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;
  let actionItem: ActionItem;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RoundProgressModule],
      declarations: [ItemDetailsComponent, CircleColorPipe, DaysLeftCountedPipe],
      providers: [TasksService]
    })
      .overrideComponent(ItemDetailsComponent, { set: { changeDetection: ChangeDetectionStrategy.Default } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    component.item = actionItem;
    component.ngOnChanges();
    expect(component.daysLeftVisibility).toEqual(true);
  });

  it('should not display error message if there is an item found', () => {
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.selectedItem.errorMessage'));
    expect(errorMessage).toBeFalsy();
  });

  it('should display error message if there is no item found', () => {
    component.item = undefined;
    component.errorMessage = 'No item found!';
    component.isLoadingActionItem = false;
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.selectItem.errorMessage'));
    expect(errorMessage).toBeTruthy();
  });

  it('should display "Select Action Item.." message', () => {
    component.item = undefined;
    component.errorMessage = undefined;
    component.isLoadingActionItem = false;
    fixture.detectChanges();
    const selectItemMessage = fixture.debugElement.query(By.css('.selectItem.viewDetails'));
    expect(selectItemMessage).toBeTruthy();
  });

  it('should display action item details', () => {
    component.item = actionItem;
    component.errorMessage = undefined;
    component.isLoadingActionItem = false;
    fixture.detectChanges();
    const actionItemDetails = fixture.debugElement.query(By.css('.details-container'));
    expect(actionItemDetails).toBeTruthy();
  });
});
