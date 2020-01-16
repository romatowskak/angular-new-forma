import { AppMaterialModule } from './../../app-material/app-material.module';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditItemComponent } from './edit-item.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('EditItemComponent', () => {
  let component: EditItemComponent;
  let fixture: ComponentFixture<EditItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditItemComponent],
      imports: [FormsModule, AppMaterialModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
