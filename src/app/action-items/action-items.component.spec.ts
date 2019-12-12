import { MatDialogRef } from '@angular/material/dialog';
import { AddItemComponent } from './../add-item/add-item.component';
import { DaysLeftToDeadlineService } from './../services/daysLeftToDeadlineService/days-left-to-deadline.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TasksService, ActionItem } from '../services/tasksService/tasks.service';
import { ActionItemsComponent, ActionItemMapped } from './action-items.component';
import { CircleColorPipe } from '../pipes/circleColorPipe/circle-color.pipe';
import {
  MatDialog,
  MatDialogConfig,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatDialogModule,
  MatNativeDateModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('ActionItemsComponent', () => {
  let component: ActionItemsComponent;
  let fixture: ComponentFixture<ActionItemsComponent>;
  let tasksService: TasksService;
  let daysLeftToDeadlineService: DaysLeftToDeadlineService;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionItemsComponent, CircleColorPipe, AddItemComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatDialogModule,
        MatNativeDateModule,
        BrowserAnimationsModule
      ],
      providers: [
        TasksService,
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    tasksService = TestBed.get(TasksService);
    daysLeftToDeadlineService = TestBed.get(DaysLeftToDeadlineService);
    fixture = TestBed.createComponent(ActionItemsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the initial value of loading=true;', () => {
    expect(component.isloadingActionItems).toBe(true);
  });

  it('should not display action items when spinner is loading', () => {
    component.isloadingActionItems = true;
    const actionItems = fixture.debugElement.query(By.css('.tBody'));
    expect(actionItems).toBeFalsy();
  });

  it('should display action items when spinner stops loading', () => {
    component.isloadingActionItems = false;
    fixture.detectChanges();
    const actionItems = fixture.debugElement.query(By.css('.tBody'));
    expect(actionItems).toBeTruthy();
  });

  it('should change the value of "loading" to "false"', () => {
    const emptyTasks: ActionItem[] = [];
    spyOn(tasksService, 'getAllItems').and.returnValue(of(emptyTasks));
    component.ngOnInit();
    expect(component.isloadingActionItems).toBe(false);
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
    spyOn(daysLeftToDeadlineService, 'daysLeftToDeadline').and.returnValue(3);
    component.ngOnInit();
    expect(component.dataSource.length).toBe(1);
    expect(component.dataSource[0].dueDay).toEqual(3);
  });

  it('dialog should be opened', () => {
    spyOn(component, 'openDialog');
    component.isloadingActionItems = false;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.addItem')).nativeElement;
    btn.click();
    expect(component.openDialog).toHaveBeenCalled();
  });
});
