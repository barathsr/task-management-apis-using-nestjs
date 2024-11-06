import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks.status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsString()
  search: string;
}

// without IsOptional
// export class GetTasksFilterDto {
//     status?: TaskStatus;
//     search?: string;
// }
