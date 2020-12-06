import { EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from './enums/task-status.enum';
import { Task } from './task.entity';

interface createTask {
  title: string;
  description: string;
}

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask({ title, description }: createTask): Promise<Task> {
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    return await this.save(task);
  }
}
