import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { TasksService, ActionTasksElement } from '../services/tasksService/tasks.service';
import { ActionItemsComponent, ActionTasksElementMapped } from './action-items.component';
import { CircleColorPipe } from '../pipes/circleColorPipe/circle-color.pipe';

describe('ActionItemsComponent', () => {
  let component: ActionItemsComponent;
  let fixture: ComponentFixture<ActionItemsComponent>;
  let tasksService: TasksService;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionItemsComponent, CircleColorPipe],
      providers: [TasksService]
    }).compileComponents();
  }));

  beforeEach(() => {
    tasksService = TestBed.get(TasksService);
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

  it('should return a mapped array', () => {
    const actionItemsBeforeMapping: ActionTasksElement[] = [];
    const actionItemsMapped: ActionTasksElementMapped[] = [];
    spyOn(tasksService, 'getAllTasks').and.returnValue(of(actionItemsBeforeMapping));
    component.ngOnInit();
    expect(component.dataSource).toEqual(actionItemsMapped);
  });
});
