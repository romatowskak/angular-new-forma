import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstDummyComponent } from './first-dummy.component';

describe('FirstDummyComponent', () => {
  let component: FirstDummyComponent;
  let fixture: ComponentFixture<FirstDummyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstDummyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstDummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
