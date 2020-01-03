import { DaysLeftCountedPipe } from './../pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { CircleColorPipe } from './../pipes/circleColorPipe/circle-color.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemDetailsComponent } from './item-details.component';
import { TasksService } from '../services/tasksService/tasks.service';
import { of } from 'rxjs';

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;
  let tasksService: TasksService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RoundProgressModule],
      declarations: [ItemDetailsComponent, CircleColorPipe, DaysLeftCountedPipe],
      providers: [TasksService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tasksService = TestBed.get(TasksService);
  });

  it('should change path if no item found', () => {
    spyOn(component.changePath, 'emit');
    spyOn(tasksService, 'getActionItem').and.returnValue(of(undefined));
    component.ngOnChanges();
    expect(component.changePath.emit).toHaveBeenCalled();
  });
});
