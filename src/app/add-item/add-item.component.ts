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
export class AddOrUpdateActionItemComponent implements OnInit {
  dialogForm: FormGroup;
  createDialog: boolean;
  dialogTitle: string;
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
    if (this.data.createDialog === true) {
      this.dialogTitle = 'Create Action Item';
      this.dialogActionButton = 'Create';
    } else {
      this.dialogTitle = 'Edit Action Item';
      this.dialogActionButton = 'Edit';
    }
    this.dialogProjects
      .getProjectsNames()
      .pipe(first())
      .subscribe(projects => {
        this.projects = projects;
        this.loaderVisible = false;
      });
    this.createForm();
    this.dialogForm.patchValue({
      title: this.data.item ? this.data.item.title : '',
      projectName: this.data.item ? this.data.item.projectName : '',
      dueDate: this.data.item ? this.data.item.dueDate : '',
      description: this.data.item ? this.data.item.description : '',
      id: this.data.item ? this.data.item.id : ''
    });
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
    this.dialogForm.value.id ? this.editItem() : this.createActionItem();
  }
  createActionItem(): void {
    const newItem = this.formNewActionItem();
    this.dialogForm.disable();
    this.tasksService
      .add(newItem)
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
    const editedItem = this.dialogForm.value;
    this.tasksService.editActionItem(editedItem).subscribe(editedItem => {
      this.dialogRef.close(editedItem);
    });
  }
}
