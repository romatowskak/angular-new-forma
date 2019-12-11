import { TasksService, ActionItem } from './../services/tasksService/tasks.service';
import { Project, ProjectsService } from '../services/projects/projects.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit, OnDestroy {
  dialogForm: FormGroup;
  title = 'Create Action Item';
  projects: Project[];
  isCreatingActionItem = false;
  private subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    private formBuilder: FormBuilder,
    private dialogProjects: ProjectsService,
    private tasksService: TasksService
  ) {
    dialogRef.disableClose = true;
  }
  ngOnInit() {
    this.subscription = this.dialogProjects.getProjectsNames().subscribe(projects => (this.projects = projects));
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
    this.tasksService.add(newItem).subscribe(actionItem => {
      this.dialogRef.close(actionItem);
      this.isCreatingActionItem = false;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
