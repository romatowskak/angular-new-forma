import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { Observable, throwError, of } from 'rxjs';
import { error } from 'util';

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
    const tableItem = [
      {
        title: 'itemTitle',
        projectName: 'itemProjectName',
        type: 'itemType',
        completed: 'itemCompletion',
        dueDate: new Date('2019/11/17'),
        id: 'itemId'
      }
    ];
    spyOn(tasksService, 'getAllItems').and.returnValue(of(tableItem));
    tasksService.getAllItems().subscribe(res => {
      expect(res).toEqual(tableItem);
      expect(res[0]).toEqual(tableItem[0]);
      done();
    });
  });
});
