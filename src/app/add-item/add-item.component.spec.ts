import { DaysLeftCountedPipe } from './../pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { CircleColorPipe } from './../pipes/circleColorPipe/circle-color.pipe';
import { ItemDetailsComponent } from './../item-details/item-details.component';
import { ActionItemsComponent } from './../action-items/action-items.component';
import { AppMaterialModule } from './../app-material/app-material.module';
import { Project, ProjectsService } from './../services/projects/projects.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddItemComponent } from './add-item.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

const dialogMock = {
  close: () => {}
};

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;
  let projectsService: ProjectsService;
  let nameField;
  let projectField;
  let dueDateField;
  let descriptionField;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddItemComponent,
        ActionItemsComponent,
        ItemDetailsComponent,
        CircleColorPipe,
        DaysLeftCountedPipe
      ],
      imports: [AppMaterialModule, RouterTestingModule, RoundProgressModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    projectsService = TestBed.get(ProjectsService);
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nameField = component.dialogForm.controls.name;
    projectField = component.dialogForm.controls.project;
    dueDateField = component.dialogForm.controls.dueDate;
    descriptionField = component.dialogForm.controls.description;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.dialogForm.valid).toBeFalsy();
  });

  it('name field invalid when empty', () => {
    expect(nameField.valid).toBeFalsy();
  });

  it('name should be required', () => {
    let errors = {};
    errors = nameField.errors || {};
    nameField.setValue('');
    expect(nameField.hasError('required')).toBeTruthy();
  });

  it('projectName field invalid when empty', () => {
    expect(projectField.valid).toBeFalsy();
  });

  it('projectName should be required', () => {
    let errors = {};
    errors = projectField.errors || {};
    projectField.setValue('');
    expect(projectField.hasError('required')).toBeTruthy();
  });

  it('dueDate field valid when empty', () => {
    expect(dueDateField.valid).toBeTruthy();
  });

  it('description field valid when empty', () => {
    expect(descriptionField.valid).toBeTruthy();
  });

  it('form valid when nameField and projectField filled', () => {
    nameField.setValue('test');
    projectField.setValue('test');
    expect(component.dialogForm.valid).toBeTruthy();
  });

  it('button disabled when nameField and projectField empty', () => {
    const createButton = fixture.debugElement.query(By.css('.create'));
    fixture.detectChanges();
    expect(createButton.nativeElement.disabled).toBeTruthy();
  });

  it('button active when nameField and projectField filled', () => {
    const createButton = fixture.debugElement.query(By.css('.create'));
    nameField.setValue('test');
    projectField.setValue('test');
    fixture.detectChanges();
    expect(createButton.nativeElement.disabled).toBeFalsy();
  });

  it('should disable form when an item is being created', () => {
    expect(component.dialogForm.valid).toBeFalsy();
    nameField.setValue('test name');
    projectField.setValue('test project');
    expect(component.dialogForm.valid).toBeTruthy();
    component.createActionItem();
    expect(nameField.enabled).toBe(false);
    expect(projectField.enabled).toBe(false);
    expect(dueDateField.enabled).toBe(false);
    expect(descriptionField.enabled).toBe(false);
  });

  it('should dispplay the spinner on the create-button when item is being created', fakeAsync(() => {
    component.isCreatingActionItem = false;
    component.createActionItem();
    tick();
    fixture.detectChanges();
    expect(component.isCreatingActionItem).toBe(true);
    tick(1000);
    fixture.detectChanges();
    expect(component.isCreatingActionItem).toBe(false);
  }));

  it('should retrieve the projects names from projectsService', () => {
    const projectsNames: Project[] = [{ name: 'CASD Wilson & Lamberton Middle Schools' }];
    spyOn(projectsService, 'getProjectsNames').and.returnValue(of(projectsNames));
    component.ngOnInit();
    expect(component.projects.length).toEqual(projectsNames.length);
  });

  it('button active when nameField and projectField filled', () => {
    const createButton = fixture.debugElement.query(By.css('.create'));
    nameField.setValue('test');
    projectField.setValue('test');
    fixture.detectChanges();
    expect(createButton.nativeElement.disabled).toBeFalsy();
  });

  it('should close the dialog when item created', fakeAsync(() => {
    const spyObj = spyOn(component.dialogRef, 'close');
    component.createActionItem();
    tick(1000);
    fixture.detectChanges();
    expect(spyObj).toHaveBeenCalled();
  }));

  it('should not show any error message if no item was selected', () => {
    const nameError = fixture.debugElement.query(By.css('.nameError'));
    const projectError = fixture.debugElement.query(By.css('.projectError'));
    expect(nameError).toBeFalsy();
    expect(projectError).toBeFalsy();
  });
});
