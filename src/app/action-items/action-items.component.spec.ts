import { DaysLeftToDeadlineService } from './../services/daysLeftToDeadlineService/days-left-to-deadline.service';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { TasksService, ActionTasksElement } from '../services/tasksService/tasks.service';
import { ActionItemsComponent, ActionTasksElementMapped } from './action-items.component';
import { CircleColorPipe } from '../pipes/circleColorPipe/circle-color.pipe';

describe('ActionItemsComponent', () => {
  let component: ActionItemsComponent;
  let fixture: ComponentFixture<ActionItemsComponent>;
  let tasksService: TasksService;
  let daysLeftToDeadlineService: DaysLeftToDeadlineService;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionItemsComponent, CircleColorPipe],
      providers: [TasksService]
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
    expect(component.loading).toBe(true);
  });

  it('should stop loading after 1s ', () => {
    const emptyTasks: ActionTasksElement[] = [];
    spyOn(tasksService, 'getAllTasks').and.returnValue(of(emptyTasks));
    component.ngOnInit();
    expect(component.loading).toBe(false);
  });

  it('for an empty array passed it should return an empty array as well', () => {
    const actionItemsBeforeMapping: ActionTasksElement[] = [];
    const actionItemsMapped: ActionTasksElementMapped[] = [];
    spyOn(tasksService, 'getAllTasks').and.returnValue(of(actionItemsBeforeMapping));
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
    spyOn(tasksService, 'getAllTasks').and.returnValue(of(actionItemsBeforeMapping));
    spyOn(daysLeftToDeadlineService, 'daysLeftToDeadline').and.returnValue(3);
    component.ngOnInit();
    expect(component.dataSource.length).toBeGreaterThanOrEqual(0);
    expect(component.dataSource.length).toBe(1);
    expect(component.dataSource[0].dueDay).toEqual(3);
  });
});
