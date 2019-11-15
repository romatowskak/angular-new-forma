import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksService } from './tasks.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ActionItemsComponent } from './action-items/action-items.component';
import { CircleColorPipe } from './circle-color.pipe';
import { DaysLeftToDeadlineService } from './days-left-to-deadline.service';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ActionItemsComponent, CircleColorPipe],
  imports: [BrowserModule, AppRoutingModule],
  providers: [TasksService, DaysLeftToDeadlineService],
  bootstrap: [AppComponent]
})
export class AppModule {}
