import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export default class TaskStatusValidationPipe implements PipeTransform {
  private readonly validStatuses = Object.keys(TaskStatus);

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not a valid task status`);
    }

    return value;
  }

  private isStatusValid(value: any) {
    return this.validStatuses.includes(value);
  }
}
