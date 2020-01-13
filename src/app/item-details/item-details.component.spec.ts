import { DaysLeftCountedPipe } from './../pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { CircleColorPipe } from './../pipes/circleColorPipe/circle-color.pipe';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ItemDetailsComponent } from './item-details.component';
import { TasksService } from '../services/tasksService/tasks.service';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;
  let tasksService: TasksService;

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
    tasksService = TestBed.get(TasksService);
  });

  it('should not diplay spinner if item was not clicked', () => {
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.fa-spin'));
    expect(spinner).toBeFalsy();
  });

  it('should display days-left only if dueDate declared', () => {
    component.item = {
      title: 'title',
      projectName: 'projectName',
      type: 'type',
      completed: 'completed',
      dueDate: new Date('2019/11/17'),
      id: 'id'
    };
    component.ngOnChanges();
    expect(component.itemVisibility).toEqual(true);
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
    const errorMessage = fixture.debugElement.query(By.css('.selectedItem.errorMessage'));
    expect(errorMessage).toBeTruthy();
  });
});
