import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActionItemsComponent } from './action-items/action-items.component';
import { DaysLeftToDeadlineService } from './services/daysLeftToDeadlineService/days-left-to-deadline.service';
import { TasksService } from './services/tasksService/tasks.service';
import { CircleColorPipe } from './pipes/circleColorPipe/circle-color.pipe';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ActionItemsComponent, CircleColorPipe],
  imports: [BrowserModule, AppRoutingModule],
  providers: [TasksService, DaysLeftToDeadlineService],
  bootstrap: [AppComponent]
})
export class AppModule {}
