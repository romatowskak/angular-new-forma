import { Project, ProjectsService } from './../services/projects/projects.service';
import { TasksService, AddActionItem } from './../services/tasksService/tasks.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  dialogForm: FormGroup;
  createDialog: boolean;
  dialogTitleForAddingItems: string = 'Create Action Item';
  dialogTitleForEditingItems: string = 'Edit Action Item';
  projects?: Project[];
  isCreatingActionItem: boolean = false;
  isEditingActionItem: boolean = false;
  id: string;

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    private formBuilder: FormBuilder,
    private dialogProjects: ProjectsService,
    private tasksService: TasksService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.dialogProjects
      .getProjectsNames()
      .pipe(first())
      .subscribe(projects => {
        this.projects = projects;
      });

    this.createForm();
    if (this.data) {
      this.dialogForm.patchValue({ name: this.data.title, project: this.data.projectName, dueDate: this.data.dueDate });
      this.id = this.data.id;
      this.createDialog = this.data.createDialog;
    }
  }
  private createForm(): void {
    this.dialogForm = this.formBuilder.group({
      name: ['', Validators.required],
      project: ['', Validators.required],
      dueDate: '',
      description: ''
    });
  }
  createActionItem(): void {
    const newItem = this.formNewActionItem();
    this.isCreatingActionItem = true;
    this.dialogForm.disable();
    this.tasksService
      .add(newItem)
      .pipe(first())
      .subscribe(actionItem => {
        this.dialogRef.close(actionItem);
        this.isCreatingActionItem = false;
      });
  }
  private formNewActionItem(): AddActionItem {
    const title = this.dialogForm.get('name');
    const projectName = this.dialogForm.get('project');
    const dueDate = this.dialogForm.get('dueDate');
    if (!title || !projectName || !dueDate) {
      throw 'Invalid Action Item data';
    }
    const newItem: AddActionItem = {
      title: title.value,
      projectName: projectName.value,
      type: 'General',
      completed: '0',
      dueDate: dueDate.value
    };
    return newItem;
  }
  editItem(): void {
    this.isEditingActionItem = true;
    const editedItemTitle = this.dialogForm.get('name')!.value;
    const editedItemProject = this.dialogForm.get('project')!.value;
    const editedItemDueDate = this.dialogForm.get('dueDate')!.value;
    this.tasksService
      .editActionItem(this.id, editedItemTitle, editedItemProject, editedItemDueDate)
      .subscribe(editedItem => {
        this.dialogRef.close(editedItem);
      });
  }
}
