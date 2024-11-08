import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.status.enum';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
    
  ) {}
  async getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
    const { status, search } = filterDto;
    // const query = await DataSource.createQueryBuilder('task')
    // if(status){
    //   query.andWhere('task.status = :status', {status});
    // }
    // if(search){
    //   query.andWhere(
    //     'task.title LIKE :search OR task.description LIKE :search', 
    //     {search:`%${search}%`}, // % match for partially equal 
    //   );
    // }
    const tasks = await this.tasksRepository.find();
    return tasks;
  }

  async getTaskById (id: string): Promise<Task> {
    // const found = await this.tasksRepository.findOne(id);
    const found = await this.tasksRepository.findOneBy({id});
    if (!found){
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

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
