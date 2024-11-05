import { CreateTaskDto } from './dto/create-task.dto';
import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model'; 

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id:string): Task {
    return this.tasksService.getTaskById(id);
  }

  //function(@Body body) = this will pass entire body into the function
  
  // @Post()
  // createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): Task {
  //   return this.tasksService.createTask(title, description);
  // }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
      return this.tasksService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    updateTaskStatus(
      @Param('id') id:string,
      @Body() status: TaskStatus, 
    ): Task{
      return this.tasksService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
      return this.tasksService.deleteTask(id)
    }
}
