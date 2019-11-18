import { CircleColorPipe } from './../circle-color.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionItemsComponent } from './action-items.component';

describe('ActionItemsComponent', () => {
  let component: ActionItemsComponent;
  let fixture: ComponentFixture<ActionItemsComponent>;
  let DATATABLE;
  let mockTasksService;
  let mockDaysLeftToDeadlineService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionItemsComponent, CircleColorPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    DATATABLE = [
      {
        title: 'Android - UI Automation Test',
        projectName: 'CASD Wilson & Lamberton Middle Schools',
        type: 'General',
        completed: '80',
        dueDate: new Date('2019/11/17')
      },
      {
        title: 'The Flash Tutorial',
        projectName: 'CASD Wilson & Lamberton Middle Schools',
        type: 'General',
        completed: '70',
        dueDate: new Date('2019/12/29')
      },
      {
        title: 'Cleaning and Organising Your Computer',
        projectName: 'CASD Wilson & Lamberton Middle Schools',
        type: 'Clash',
        completed: '0',
        dueDate: new Date('2019/11/15')
      },
      {
        title: 'Android - UI Automation Test',
        projectName: 'CASD Wilson & Lamberton Middle Schools',
        type: 'General',
        completed: '80',
        dueDate: new Date('2019/11/17')
      },
      {
        title: 'The Flash Tutorial',
        projectName: 'CASD Wilson & Lamberton Middle Schools',
        type: 'General',
        completed: '70',
        dueDate: new Date('2019/11/16')
      },
      {
        title: 'Cleaning and Organising Your Computer',
        projectName: 'CASD Wilson & Lamberton Middle Schools',
        type: 'Clash',
        completed: '0',
        dueDate: new Date('2020/01/05')
      }
    ];

    fixture = TestBed.createComponent(ActionItemsComponent);
    mockTasksService = jasmine.createSpyObj(['getAllTasks']);
    mockDaysLeftToDeadlineService = jasmine.createSpyObj(['daysLeftToDeadline']);
    component = new ActionItemsComponent(mockTasksService, mockDaysLeftToDeadlineService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should stop loading and render the view after 1s', () => {
    component.loading = true;

    setTimeout(() => {
      expect(component.loading).toBe(false);
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

  it('type of returned data should be an object', () => {
    component.dataSource = DATATABLE;
    expect(typeof component.dataSource).toBe('object');
  });

  it('should return array of 6 objects', () => {
    component.dataSource = DATATABLE;
    expect(component.dataSource.length).toBe(6);
  });
});
