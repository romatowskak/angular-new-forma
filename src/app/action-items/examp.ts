// import { TasksService } from './../tasks.service';
// import { CircleColorPipe } from './../circle-color.pipe';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { ActionItemsComponent } from './action-items.component';
// import { By } from '@angular/platform-browser';

// describe('ActionItemsComponent', () => {
//   let fixture: ComponentFixture<ActionItemsComponent>;
//   let mockTasksService;

//   let component: ActionItemsComponent;
//   let DATATABLE;

//   beforeEach(() => {
//     mockTasksService = jasmine.createSpyObj(['getAllTasks']);
//     TestBed.configureTestingModule({
//       declarations: [ActionItemsComponent, CircleColorPipe],
//       providers: [
//         {
//           provide: TasksService,
//           useValue: mockTasksService
//         }
//       ]
//     });
//     fixture = TestBed.createComponent(ActionItemsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();

//     // DATATABLE = [
//     //   {
//     //     title: 'Android - UI Automation Test',
//     //     projectName: 'CASD Wilson & Lamberton Middle Schools',
//     //     type: 'General',
//     //     completed: '80',
//     //     dueDate: new Date('2019/11/17')
//     //   },
//     //   {
//     //     title: 'The Flash Tutorial',
//     //     projectName: 'CASD Wilson & Lamberton Middle Schools',
//     //     type: 'General',
//     //     completed: '70',
//     //     dueDate: new Date('2019/12/29')
//     //   },
//     //   {
//     //     title: 'Cleaning and Organising Your Computer',
//     //     projectName: 'CASD Wilson & Lamberton Middle Schools',
//     //     type: 'Clash',
//     //     completed: '0',
//     //     dueDate: new Date('2019/11/15')
//     //   },
//     //   {
//     //     title: 'Android - UI Automation Test',
//     //     projectName: 'CASD Wilson & Lamberton Middle Schools',
//     //     type: 'General',
//     //     completed: '80',
//     //     dueDate: new Date('2019/11/17')
//     //   },
//     //   {
//     //     title: 'The Flash Tutorial',
//     //     projectName: 'CASD Wilson & Lamberton Middle Schools',
//     //     type: 'General',
//     //     completed: '70',
//     //     dueDate: new Date('2019/11/16')
//     //   },
//     //   {
//     //     title: 'Cleaning and Organising Your Computer',
//     //     projectName: 'CASD Wilson & Lamberton Middle Schools',
//     //     type: 'Clash',
//     //     completed: '0',
//     //     dueDate: new Date('2020/01/05')
//     //   }
//     // ];
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   // it('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });

//   // it('should stop loading and render the view after 1s', done => {
//   //   component.loading = true;
//   //   setTimeout(() => {
//   //     expect(component.loading).toBe(false);
//   //     done();
//   //   }, 1000);
//   // });

//   // it('should return action item objects', () => {
//   //   mockTasksService.getAllTasks();
//   //   const actionItem = {
//   //     title: 'Android - UI Automation Test',
//   //     projectName: 'CASD Wilson & Lamberton Middle Schools',
//   //     type: 'General',
//   //     completed: 80,
//   //     dueDate: new Date('2019/11/17')
//   //   };
//   //   component.dataSource = actionItem;
//   //   expect(component.dataSource.title).toBe(actionItem.title);
//   // });

//   // it('type of returned data should be an object', () => {
//   //   component.dataSource = DATATABLE;
//   //   expect(typeof component.dataSource).toBe('object');
//   // });

//   // it('should return array of 6 objects', () => {
//   //   component.dataSource = DATATABLE;
//   //   expect(component.dataSource.length).toBe(6);
//   // });

//   // it('should change the value of "loading"', () => {
//   //   const loading = component.loading;
//   //   expect(loading).toBe(true);
//   // });

//   // TypeError: Cannot read property 'textContent' of null
//   // it('should render the title in the ".action-item-name.title" element', () => {
//   //   fixture.componentInstance.dataSource = {
//   //     title: 'Android - UI Automation Test',
//   //     projectName: 'CASD Wilson & Lamberton Middle Schools',
//   //     type: 'General',
//   //     completed: '80',
//   //     dueDate: new Date('2019/11/17')
//   //   };

//   //   const input = component.dataSource[0];

//   //   fixture.detectChanges();

//   //   expect(fixture.debugElement.query(By.css('.title')).nativeElement.textContent).toContain(
//   //     'Android - UI Automation Test'
//   //   );
//   // });
// });
