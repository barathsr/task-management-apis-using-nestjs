import { DataSource, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { Injectable } from '@nestjs/common';
@Injectable()
export class TasksRepository extends Repository<Task> {
    constructor(public dataSource: DataSource){
        super(Task, dataSource.createEntityManager()); 
    }
}
