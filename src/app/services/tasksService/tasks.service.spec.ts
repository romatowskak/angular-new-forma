import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { of } from 'rxjs';

describe('TasksService', () => {
  let tasksService;
  let dataTable;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: []
    });
    tasksService = TestBed.get(TasksService);
    dataTable = [
      {
        title: 'itemTitle',
        projectName: 'itemProjectName',
        type: 'itemType',
        completed: 'itemCompletion',
        dueDate: new Date('2019/11/17'),
        id: 'itemId'
      }
    ];
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
    spyOn(tasksService, 'getAllItems').and.returnValue(of(dataTable));
    tasksService.getAllItems().subscribe(res => {
      expect(res).toEqual(dataTable);
      expect(res[0]).toEqual(dataTable[0]);
      done();
    });
  });

  it('should return item with a given id', done => {
    tasksService.dataTable = dataTable;
    tasksService.getActionItem('itemId').subscribe(res => {
      expect(res).toEqual(dataTable[0]);
      done();
    });
  });
  it('should throw an error message if no item found', done => {
    tasksService.dataTable = dataTable;
    tasksService.getActionItem('anyId').subscribe(
      item => {},
      err => {
        expect(err).toBeDefined();
        done();
      }
    );
  });
});
