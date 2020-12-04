import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private task = [];

  getTasks() {
    return this.task;
  }
}
