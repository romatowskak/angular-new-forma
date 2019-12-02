import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let tasksService;
  beforeEach(() => {
    tasksService = TestBed.get(TasksService);
  });

  it('should be created', () => {
    expect(tasksService).toBeTruthy();
  });

  it('getAllItems() should return data', done => {
    tasksService.getAllItems().subscribe(res => {
      expect(typeof res).toEqual('object');
      done();
    });
  });

  it('getAllItems() should return 6 objects', done => {
    tasksService.getAllItems().subscribe(res => {
      expect(res.length).toEqual(6);
      done();
    });
  });

  it('should return tableDataItem', done => {
    const tableItem = {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80',
      dueDate: new Date('2019/11/17')
    };
    tasksService.getAllItems().subscribe(res => {
      expect(res[0]).toEqual(tableItem);
      done();
    });
  });
});
