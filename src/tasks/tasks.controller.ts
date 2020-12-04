import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Array<Task> {
    return this.tasksService.getTasks();
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') descrition: string,
  ): Task {
    return this.tasksService.createTask(title, descrition);
  }
}
