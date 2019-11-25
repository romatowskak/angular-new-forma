import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  dialogForm: FormGroup;
  title = 'Create Action Item';
  projects = [{ name: 'project name' }];
  projectControl = new FormControl('', [Validators.required]);
  constructor(public dialogRef: MatDialogRef<AddItemComponent>) {}
  ngOnInit() {
    this.dialogForm = new FormGroup({
      name: new FormControl('', [Validators.required as any])
    });
  }
  close() {
    this.dialogRef.close();
  }
}
