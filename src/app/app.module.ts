import { AppMaterialModule } from './app-material/app-material.module';
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
import { ProjectsService } from './services/projects/projects.service';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { RouterModule } from '@angular/router';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { DaysLeftCountedPipe } from './pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ConfirmationDialogComponent } from './confirmationDialog/confirmation-dialog/confirmation-dialog.component';
import { EditItemComponent } from './edit-item/edit-item/edit-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ActionItemsComponent,
    CircleColorPipe,
    AddItemComponent,
    ItemDetailsComponent,
    DaysLeftCountedPipe,
    ConfirmationDialogComponent,
    EditItemComponent
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    RoundProgressModule,
    ScrollToModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'items',
        component: ActionItemsComponent
      },
      {
        path: '**',
        redirectTo: '/items'
      }
    ])
  ],
  providers: [
    TasksService,
    DaysLeftToDeadlineService,
    ProjectsService,
    CircleColorPipe,
    DaysLeftCountedPipe,
    ScrollToModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddItemComponent, ConfirmationDialogComponent, EditItemComponent]
})
export class AppModule {}
