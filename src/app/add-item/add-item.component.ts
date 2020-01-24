import { Project, ProjectsService } from './../services/projects/projects.service';
import { TasksService, AddActionItem } from './../services/tasksService/tasks.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';

enum dialogMode {
  create = 'Create',
  edit = 'Edit'
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddOrUpdateActionItemComponent implements OnInit {
  dialogForm: FormGroup;
  createDialog: boolean;
  dialogMode: string;
  dialogActionButton: string;
  projects?: Project[];
  isSavingDialogData: boolean = false;
  loaderVisible: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<AddOrUpdateActionItemComponent>,
    private formBuilder: FormBuilder,
    private dialogProjects: ProjectsService,
    private tasksService: TasksService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.data.createDialog === true ? (this.dialogMode = dialogMode.create) : (this.dialogMode = dialogMode.edit);
    this.dialogProjects
      .getProjectsNames()
      .pipe(first())
      .subscribe(projects => {
        this.projects = projects;
        this.loaderVisible = false;
      });
    this.createForm();
    this.dialogForm.patchValue(this.data.item || {});
    return this.dialogForm.value;
  }
  private createForm(): void {
    this.dialogForm = this.formBuilder.group({
      title: ['', Validators.required],
      projectName: ['', Validators.required],
      dueDate: '',
      description: '',
      id: ''
    });
  }
  saveForm(): void {
    this.isSavingDialogData = true;
    this.dialogMode === dialogMode.edit ? this.editItem() : this.createActionItem();
  }
  createActionItem(): void {
    const newActionItem = this.formNewActionItem();
    this.dialogForm.disable();
    this.tasksService
      .add(newActionItem)
      .pipe(first())
      .subscribe(actionItem => {
        this.dialogRef.close(actionItem);
      });
  }
  private formNewActionItem(): AddActionItem {
    const title = this.dialogForm.get('title');
    const projectName = this.dialogForm.get('projectName');
    const dueDate = this.dialogForm.get('dueDate');
    if (!title || !projectName || !dueDate) {
      throw 'Invalid Action Item data';
    }
    const newActionItem: AddActionItem = {
      title: title.value,
      projectName: projectName.value,
      type: 'General',
      completed: '0',
      dueDate: dueDate.value
    };
    return newActionItem;
  }
  editItem(): void {
    const editedActionItem = this.dialogForm.value;
    this.tasksService.editActionItem(editedActionItem).subscribe(editedActionItemId => {
      this.dialogRef.close(editedActionItemId);
    });
  }
}
