import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Array<Task> = [];

  getTasks(): Array<Task> {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}
