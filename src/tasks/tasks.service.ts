import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.status.enum';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository
  ) {}
  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let task = this.getAllTasks();
  //   if (status) {
  //     task = task.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     task = task.filter((task) => {
  //       return task.title.includes(search) || task.description.includes(search);
  //     });
  //   }
  //   return task;
  // }

  async getTaskById (id: string): Promise<Task> {
    // const found = await this.tasksRepository.findOne(id);
    const found = await this.tasksRepository.findOneBy({id});
    if (!found){
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID ${id} not found`);
  //   }
  //   return found;
  // }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
    const { title, description } = createTaskDto;
    const  task = this.tasksRepository.create({
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    });
    await this.tasksRepository.save(task);
    return task;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status
    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete({id: id});
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id: "${id}" is not found`);
    }
  }
}
