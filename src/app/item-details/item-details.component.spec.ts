import { DaysLeftCountedPipe } from './../pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { CircleColorPipe } from './../pipes/circleColorPipe/circle-color.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemDetailsComponent } from './item-details.component';
import { TasksService } from '../services/tasksService/tasks.service';
import { By } from '@angular/platform-browser';

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

  it('should not diplay spinner if item was not clicked', () => {
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.fa-spin'));
    expect(spinner).toBeFalsy();
  });
});
