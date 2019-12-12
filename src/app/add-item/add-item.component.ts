import { TasksService, ActionItem } from './../services/tasksService/tasks.service';
import { Project, ProjectsService } from '../services/projects/projects.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  dialogForm: FormGroup;
  title = 'Create Action Item';
  projects: Project[];
  isCreatingActionItem = false;

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    private formBuilder: FormBuilder,
    private dialogProjects: ProjectsService,
    private tasksService: TasksService
  ) {
    dialogRef.disableClose = true;
  }
  ngOnInit() {
    this.dialogProjects
      .getProjectsNames()
      .pipe(first())
      .subscribe(projects => (this.projects = projects));
    this.dialogForm = this.formBuilder.group({
      name: ['', Validators.required],
      project: ['', Validators.required],
      dueDate: '',
      description: ''
    });
  }

  createActionItem(): void {
    const projectNameValue = this.dialogForm.get('project').value;
    const dueDateValue = this.dialogForm.get('dueDate').value;
    const newItem: ActionItem = {
      title: this.dialogForm.get('name').value,
      projectName: projectNameValue.name,
      type: 'General',
      completed: '60',
      dueDate: !!dueDateValue ? dueDateValue : undefined
    };
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
}
