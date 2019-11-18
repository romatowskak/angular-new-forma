import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasksService = TestBed.get(TasksService);
    expect(service).toBeTruthy();
  });

  it('getAllTasks() should return data', () => {
    const service: TasksService = TestBed.get(TasksService);
    service.getAllTasks().subscribe(res => {
      expect(typeof res).toBe('!null');
    });
  });

  it('getAllTasks() should return 6 objects', () => {
    const service: TasksService = TestBed.get(TasksService);
    service.getAllTasks().subscribe(res => {
      expect(res.length).toEqual(6);
    });
  });

  it('should return tableDataItem', () => {
    const service: TasksService = TestBed.get(TasksService);
    const tableItem = {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80',
      dueDate: new Date('2019/11/17')
    };

    service.getAllTasks().subscribe(res => {
      expect(res[0]).toBe(tableItem);
    });
  });
});
