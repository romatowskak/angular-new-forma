import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { MatDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  const dialogMock = {
    close: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      imports: [AppMaterialModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onNoClick()', () => {
    spyOn(component, 'onNoClick');
    const btn = fixture.debugElement.query(By.css('.onNoClick')).nativeElement;
    btn.click();
    expect(component.onNoClick).toHaveBeenCalled();
  });

  it('dialog should be closed after onNoClick()', () => {
    let onNoClick = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(onNoClick).toHaveBeenCalled();
  });
});
