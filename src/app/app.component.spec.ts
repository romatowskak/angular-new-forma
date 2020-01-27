import { ItemDetailsComponent } from './item-details/item-details.component';
import { MatDialog } from '@angular/material/dialog';
import { ActionItemsComponent } from './action-items/action-items.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CircleColorPipe } from './pipes/circleColorPipe/circle-color.pipe';
import { DaysLeftCountedPipe } from './pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, RoundProgressModule],
      declarations: [
        AppComponent,
        NavbarComponent,
        ActionItemsComponent,
        CircleColorPipe,
        ItemDetailsComponent,
        DaysLeftCountedPipe
      ],
      providers: [
        {
          provide: MatDialog,
          useValue: {}
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'examp-ng-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('examp-ng-app');
  });
});
