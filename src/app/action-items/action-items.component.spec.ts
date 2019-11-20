import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { TasksService, ActionTasksElement } from '../services/tasksService/tasks.service';
import { ActionItemsComponent } from './action-items.component';
import { CircleColorPipe } from '../pipes/circleColorPipe/circle-color.pipe';

describe('ActionItemsComponent', () => {
  let component: ActionItemsComponent;
  let fixture: ComponentFixture<ActionItemsComponent>;
  let tasksService;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not return an empty array', async(() => {
    const emptyTasks: ActionTasksElement[] = [];
    spyOn(tasksService, 'getAllTasks').and.returnValue(of(emptyTasks));
    component.ngOnInit();
    expect(component.dataSource.length).not.toBeNull();
  }));

  it('should have the initial value of loading=true;', () => {
    expect(component.loading).toBe(true);
  });

  it('should stop loading after 1s', done => {
    setTimeout(() => {
      expect(component.loading).toBe(false);
      done();
    }, 1000);
  });
});
