import { CreateTaskDto } from './dto/create-task.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './tasks.status.enum';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './tasks.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { ConfigService } from '@nestjs/config';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(
    private tasksService: TasksService,
    // private configService: ConfigService,
  ) {
  // console.log(configService.get('DB_PORT'))
  }

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User ${user.userName} retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`
      );
    return this.tasksService.getAllTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<Task>{
    return this.tasksService.getTaskById(id, user);
  }  

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user:User, 
  ): Promise<Task> {
    this.logger.verbose(`User ${user.userName} creating a new task. Data: ${JSON.stringify(createTaskDto)}`)
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatus: UpdateTaskStatusDto,
    @GetUser() user: User
  ): Promise<Task> {
    const { status } = updateTaskStatus;
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user:User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }
}
