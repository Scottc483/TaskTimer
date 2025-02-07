// total-timer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { formatTime } from '../../utils/time-format';

@Component({
  selector: 'app-total-timer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="total-timer">
      <h2>Total Time</h2>
      <div class="time-display">
        {{ formattedTime$ | async }}
      </div>
    </div>
  `,
  styleUrls: ['./total-timer.component.css']
})
export class TotalTimerComponent {
  formattedTime$: Observable<string> = this.taskService.totalTime$.pipe(
    map((totalSeconds: number) => formatTime(totalSeconds))
  );

  constructor(private taskService: TaskService) {}

}