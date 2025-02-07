import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TotalTimerComponent } from './components/total-timer/total-timer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskFormComponent, TaskListComponent, TotalTimerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-timer';
}
