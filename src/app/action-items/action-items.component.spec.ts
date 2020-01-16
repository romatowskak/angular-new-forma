import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { ItemDetailsComponent } from './../item-details/item-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from './../app-material/app-material.module';
import { MatDialogRef } from '@angular/material/dialog';
import { AddItemComponent } from './../add-item/add-item.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TasksService, ActionItem } from '../services/tasksService/tasks.service';
import { ActionItemsComponent, ActionItemMapped } from './action-items.component';
import { CircleColorPipe } from '../pipes/circleColorPipe/circle-color.pipe';
import { By } from '@angular/platform-browser';
import { DaysLeftCountedPipe } from '../pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ActivatedRoute } from '@angular/router';

describe('ActionItemsComponent', () => {
  let component: ActionItemsComponent;
  let fixture: ComponentFixture<ActionItemsComponent>;
  let tasksService: TasksService;
  let actionItem: ActionItem;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActionItemsComponent,
        CircleColorPipe,
        AddItemComponent,
        DaysLeftCountedPipe,
        ItemDetailsComponent
      ],
      imports: [AppMaterialModule, RouterTestingModule, RoundProgressModule],
      providers: [
        TasksService,
        ScrollToService,
        DaysLeftCountedPipe,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              id: 'itemId'
            })
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    tasksService = TestBed.get(TasksService);
    fixture = TestBed.createComponent(ActionItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    actionItem = {
      title: 'itemTitle',
      projectName: 'itemProjectName',
      type: 'itemType',
      completed: 'itemCompletion',
      dueDate: new Date('2019/11/17'),
      id: 'itemId'
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the initial value of loading=true;', () => {
    expect(component.isLoadingActionItems).toBe(true);
  });

  it('should not display action items when spinner is loading', () => {
    component.isLoadingActionItems = true;
    const actionItems = fixture.debugElement.query(By.css('.tBody'));
    expect(actionItems).toBeFalsy();
  });

  it('should change the value of "loading" to "false" when action items retrieved', () => {
    const emptyTasks: ActionItem[] = [];
    spyOn(tasksService, 'getAllItems').and.returnValue(of(emptyTasks));
    component.ngOnInit();
    expect(component.isLoadingActionItems).toBe(false);
  });

  it('for an empty array passed it should return an empty array as well', () => {
    const actionItemsBeforeMapping: ActionItem[] = [];
    const actionItemsMapped: ActionItemMapped[] = [];
    spyOn(tasksService, 'getAllItems').and.returnValue(of(actionItemsBeforeMapping));
    component.ngOnInit();
    expect(component.dataSource).toEqual(actionItemsMapped);
  });

  it('should return an array with objects containing new "dueDay" property', () => {
    const actionItemsBeforeMapping = [
      {
        title: 'The Flash Tutorial',
        projectName: 'CASD Wilson & Lamberton Middle Schools',
        type: 'General',
        completed: '70',
        dueDate: new Date('2019/12/19')
      }
    ];
    spyOn(tasksService, 'getAllItems').and.returnValue(of(actionItemsBeforeMapping));

    component.ngOnInit();
    expect(component.dataSource.length).toBe(1);
  });

  it('should open a dialog when button clicked', () => {
    spyOn(component, 'openDialog');
    component.isLoadingActionItems = false;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.addItem')).nativeElement;
    btn.click();
    expect(component.openDialog).toHaveBeenCalled();
  });

  it('should call getQueryParams()', () => {
    component.actionItem = actionItem;
    const getParamsSpy = spyOn(component, 'subscribeToQueryParams').and.callThrough();
    component.ngOnInit();
    expect(getParamsSpy).toHaveBeenCalled();
  });

  it('should get action item with corresponding id', done => {
    spyOn(tasksService, 'getActionItem').and.returnValue(of(actionItem));
    tasksService.getActionItem('itemId').subscribe(res => {
      component.actionItem = res;
      component.actionItemId = res.id;
      done();
      expect(component.actionItem).toEqual(actionItem);
      expect(component.actionItemId).toEqual(actionItem.id);
    });
  });
});
