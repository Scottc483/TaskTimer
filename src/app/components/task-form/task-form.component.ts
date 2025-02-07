import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule]
})

export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      duration: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const { name, duration } = this.taskForm.value;
      this.taskService.addTask(name.trim(), duration);
      this.taskForm.reset();
    }
  }
}
