import { User } from 'src/auth/user.entity';
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
  async getAllTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>{
    const { status, search } = filterDto;
    // const query = await DataSource.createQueryBuilder('task')
    // if(status){
    //   query.andWhere('task.status = :status', {status});
    // }
    // if(search){
    //   query.andWhere(
    //     'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', 
    //     {search:`%${search}%`}, // % match for partially equal 
    //   );
    // }
    let tasks = await this.tasksRepository.find({where:{user}});
    // TODO: want to add filter and search options 
    if(status){
      tasks = tasks.filter((task) => {
        return task.status === status;
      })
    }
    return tasks;
  }

  async getTaskById (id: string, user: User): Promise<Task> {
    // const found = await this.tasksRepository.findOne(id);
    // const found = await this.tasksRepository.findOneBy({id});
    const found = await this.tasksRepository.findOne({where:{id, user}});
    if (!found){
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{
    const { title, description } = createTaskDto;
    const  task = this.tasksRepository.create({
      title: title,
      description: description,
      status: TaskStatus.OPEN,
      user: user,
    });
    await this.tasksRepository.save(task);
    return task;
  }

  async updateTaskStatus(id: string, status: TaskStatus, user:User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status
    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string, user:User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id: "${id}" is not found`);
    }
  }
}
