import { CircleColorPipe } from '../pipes/circle-color.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionItemsComponent } from './action-items.component';
import { TasksService } from '../services/tasks.service';

describe('ActionItemsComponent', () => {
  let component: ActionItemsComponent;
  let fixture: ComponentFixture<ActionItemsComponent>;
  let mockTasksService;

  beforeEach(async(() => {
    mockTasksService = jasmine.createSpyObj(['getAllTasks']);
    TestBed.configureTestingModule({
      declarations: [ActionItemsComponent, CircleColorPipe],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should stop loading and render the view after 1s', done => {
    component.loading = true;
    component.ngOnInit();
    setTimeout(() => {
      expect(component.loading).toBe(false);
      done();
    }, 1000);
  });

  it('should return action item objects', () => {
    mockTasksService.getAllTasks();
    const actionItem = {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: 80,
      dueDate: new Date('2019/11/17')
    };
    component.dataSource = actionItem;
    expect(component.dataSource.title).toBe(actionItem.title);
  });

  it('type of returned data should be an object', done => {
    component.dataSource = null;
    fixture.detectChanges();
    expect(typeof component.dataSource).toBe('object');
    done();
  });

  it('should return array of objects', done => {
    component.dataSource = [];
    component.ngOnInit();
    expect(component.dataSource.length).not.toBeNull();
    done();
  });

  it('should have the initial value of loading=true;', () => {
    const loading = component.loading;
    expect(loading).toBe(true);
  });

  it('after calling ngOnInit() loading should equal false;', done => {
    component.loading = true;
    component.ngOnInit();
    expect(component.loading).toEqual(false);
    done();
  });
});
