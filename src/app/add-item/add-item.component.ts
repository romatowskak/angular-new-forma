import { DialogProjectsService, DialogProject } from './../services/dialogProjects/dialog-projects.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  dialogForm: FormGroup;
  title = 'Create Action Item';
  projects: DialogProject[];

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    private formBuilder: FormBuilder,
    private dialogProjects: DialogProjectsService
  ) {}
  ngOnInit() {
    this.dialogProjects.getProjectsNames().subscribe(projects => (this.projects = projects));
    this.dialogForm = this.formBuilder.group({
      name: ['', Validators.required],
      project: ['', Validators.required],
      dueDate: '',
      description: ''
    });
  }
  close() {
    this.dialogRef.close();
  }
  createItem() {
    console.log(this.dialogForm);
  }
}
