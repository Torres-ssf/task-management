import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';

export class GetTasksFilterDTO {
  @IsOptional()
  @IsIn(Object.keys(TaskStatus))
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
