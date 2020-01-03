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

  it('getAllItems() should return 8 objects', done => {
    tasksService.getAllItems().subscribe(res => {
      expect(res.length).toEqual(8);
      done();
    });
  });

  it('should return tableDataItem', done => {
    const tableItem = {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80',
      dueDate: new Date('2019/11/17'),
      id: '1'
    };
    tasksService.getAllItems().subscribe(res => {
      expect(res[0]).toEqual(tableItem);
      done();
    });
  });

  it('getActionItem() should return an item if the id matches', done => {
    const itemId = '2';
    tasksService.getActionItem(itemId).subscribe(res => {
      expect(res.id).toEqual('2');
      done();
    });
  });
  it('getActionItem() should return undefined if the id does not match', done => {
    tasksService.getActionItem(undefined).subscribe(res => {
      expect(res).toEqual(undefined);
      done();
    });
  });
});
