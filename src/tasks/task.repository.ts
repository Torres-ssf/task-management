import { EntityRepository, Repository } from 'typeorm';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
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

  async getTasks(getTasksFilterDto: GetTasksFilterDTO): Promise<Task[]> {
    const { search, status } = getTasksFilterDto;

    const query = this.createQueryBuilder('tasks');

    if (status) {
      query.where('tasks.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'tasks.title LIKE :search OR tasks.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
