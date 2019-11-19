import { TasksService } from './../services/tasks.service';
import { CircleColorPipe } from '../pipes/circle-color.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionItemsComponent } from './action-items.component';
import { of } from 'rxjs';

describe('ActionItemsComponent', () => {
  let component: ActionItemsComponent;
  let fixture: ComponentFixture<ActionItemsComponent>;
  let tableData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionItemsComponent, CircleColorPipe],
      providers: [TasksService]
    }).compileComponents();
  }));

  beforeEach(() => {
    tableData = [
      {
        title: 'Android - UI Automation Test',
        projectName: 'CASD Wilson & Lamberton Middle Schools',
        type: 'General',
        completed: '80',
        dueDate: new Date('2019/11/17')
      }
    ];
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

  it('should return an array with 1 object', () => {
    const tasksService = new TasksService();
    spyOn(tasksService, 'getAllTasks').and.returnValue(of(tableData));
    tasksService.getAllTasks();
    expect(tableData.length).toBe(1);
  });

  it('type of returned data should be an object', done => {
    const tasksService = new TasksService();
    spyOn(tasksService, 'getAllTasks').and.returnValue(of(tableData));
    component.dataSource = tableData;
    fixture.detectChanges();
    expect(typeof component.dataSource).toBe('object');
    done();
  });

  it('should return array of objects', done => {
    const tasksService = new TasksService();
    spyOn(tasksService, 'getAllTasks').and.returnValue(of(tableData));
    component.dataSource = [];
    component.ngOnInit();
    expect(component.dataSource.length).not.toBeNull();
    done();
  });

  it('should have the initial value of loading=true;', () => {
    const loading = component.loading;
    expect(loading).toBe(true);
  });
});
