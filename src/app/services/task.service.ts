// task.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService implements OnDestroy {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private totalTimeSubject = new BehaviorSubject<number>(0);
  // Add Map to store timer IDs for each task
  private timerIntervals: Map<number, number> = new Map();

  tasks$ = this.tasksSubject.asObservable();
  totalTime$ = this.totalTimeSubject.asObservable();

  addTask(name: string, duration: number): void {
    const newTask: Task = {
      id: Date.now(),
      name,
      duration,
      elapsed: 0,
      isRunning: false,
      isCompleted: false
    };
    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]); // Create new array reference
  }

  toggleTaskTimer(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task && !task.isCompleted) {
      if (this.timerIntervals.has(taskId)) {
        clearInterval(this.timerIntervals.get(taskId) as number);
        this.timerIntervals.delete(taskId);
      }

      task.isRunning = !task.isRunning;
      
      if (task.isRunning) {
        const intervalId = window.setInterval(() => {
          // console.log('Interval running! TaskId: ' , taskId, 'IntervalId: ', intervalId);
          console.log('INTERVALS: ', this.timerIntervals, 'AllIntervals: ', this.timerIntervals.keys());
          if (task.isRunning && !task.isCompleted) {
            task.elapsed += 1;
            this.updateTotalTime(1);

            if (task.elapsed >= task.duration * 60) {
              this.completeTask(taskId);
            }

            this.tasksSubject.next([...this.tasks]);
          }
        }, 1000) as unknown as number;

        this.timerIntervals.set(taskId, intervalId);
      }
      
      this.tasksSubject.next([...this.tasks]);
    }
}

  // New method to handle task completion
  completeTask(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.isCompleted = true;
      task.isRunning = false;
      
      // Clean up interval when task completes
      if (this.timerIntervals.has(taskId)) {
        clearInterval(this.timerIntervals.get(taskId));
        this.timerIntervals.delete(taskId);
      }

      this.tasksSubject.next([...this.tasks]);
    }
  }

  deleteTask(id: number): void {
    // Clean up interval before deleting task
    if (this.timerIntervals.has(id)) {
      clearInterval(this.timerIntervals.get(id));
      this.timerIntervals.delete(id);
    }

    const task = this.tasks.find(t => t.id === id);
    if (task) {
      this.updateTotalTime(-task.elapsed);
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.tasksSubject.next([...this.tasks]);
    }
  }

  private updateTotalTime(change: number): void {
    const currentTotal = this.totalTimeSubject.value;
    this.totalTimeSubject.next(currentTotal + change);
  }

  // Cleanup all intervals when service is destroyed
  ngOnDestroy(): void {
    this.timerIntervals.forEach(intervalId => clearInterval(intervalId));
    this.timerIntervals.clear();
  }
}