import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasksService = TestBed.get(TasksService);
    expect(service).toBeTruthy();
  });

  it('getAllTasks() should return data', done => {
    const service: TasksService = TestBed.get(TasksService);
    service.getAllTasks().subscribe(res => {
      expect(typeof res).toEqual('object');
      done();
    });
  });

  it('getAllTasks() should return 6 objects', done => {
    const service: TasksService = TestBed.get(TasksService);
    service.getAllTasks().subscribe(res => {
      expect(res.length).toEqual(6);
      done();
    });
  });

  it('should return tableDataItem', done => {
    const service: TasksService = TestBed.get(TasksService);
    const tableItem = {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80',
      dueDate: new Date('2019/11/17')
    };

    service.getAllTasks().subscribe(res => {
      expect(res[0]).toEqual(tableItem);
      done();
    });
  });
});
