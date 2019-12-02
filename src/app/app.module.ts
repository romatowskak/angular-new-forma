import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActionItemsComponent } from './action-items/action-items.component';
import { DaysLeftToDeadlineService } from './services/daysLeftToDeadlineService/days-left-to-deadline.service';
import { TasksService } from './services/tasksService/tasks.service';
import { CircleColorPipe } from './pipes/circleColorPipe/circle-color.pipe';
import { AddItemComponent } from './add-item/add-item.component';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatInputModule, MatLabel } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ProjectsService } from './services/projects/projects.service';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ActionItemsComponent, CircleColorPipe, AddItemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatDialogContent,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatLabel,
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
    MatDialogRef,
    Validators
  ],
  providers: [TasksService, DaysLeftToDeadlineService, ProjectsService],
  bootstrap: [AppComponent],
  entryComponents: [AddItemComponent]
})
export class AppModule {}
