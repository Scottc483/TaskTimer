// task-item.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { formatTime } from '../../utils/time-format';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;

  constructor(private taskService: TaskService) {}

  formatTime = formatTime;

  toggleTimer(): void {
    this.taskService.toggleTaskTimer(this.task.id);
  }

  completeTask(): void {
    // Use the service method instead of directly modifying the task
    this.taskService.completeTask(this.task.id);
  }

  deleteTask(): void {
    this.taskService.deleteTask(this.task.id);
  }

  getRemainingTime(): number {
    const totalSeconds = this.task.duration * 60;
    return Math.max(0, totalSeconds - this.task.elapsed);
  }

  getProgress(): number {
    return (this.task.elapsed / (this.task.duration * 60)) * 100;
  }
}