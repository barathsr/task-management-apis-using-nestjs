import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from "./tasks.service";
import { TaskStatus } from './tasks.status.enum';

const mockTaskRepository = () => ({ 
    getAllTasks: jest.fn(),
    findOne: jest.fn(),
}); // I'm not using a object to this instead I'm using factory function

const mockUser = {
    id:"123",
    userName: "Barath",
    password:"Test@123",
    tasks: [],
}

describe('TaskService', () => {
    let taskService: TasksService;
    let tasksRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TasksRepository, useFactory: mockTaskRepository }, 
            ],
        }).compile();

        taskService = module.get(TasksService);
        tasksRepository = module.get(TasksRepository);
    });

    describe('getAllTasks', () => {
        it('calls TaskRepository.getAllTasks and returns the result', async() => {
            expect(tasksRepository.getAllTasks).not.toHaveBeenCalled();
            tasksRepository.getAllTasks.mockResolvedValue('some value');
            const result = await tasksRepository.getAllTasks(null, mockUser);
            expect(tasksRepository.getAllTasks).toHaveBeenCalled();
            expect(result).toEqual('some value');
        });
    });

    describe('getTaskById', () => {
        it('calls TasksRepository.findOne and returns the result', async() => {
            const mockTask = {
                id:'someId',
                title:'Task Title',
                description:'Task Description',
                status: TaskStatus.OPEN,
            };

            tasksRepository.findOne.mockResolvedValue(mockTask);
            const result = await taskService.getTaskById('someId', mockUser);
            expect(result).toEqual(mockTask);
        });

        it('calls TasksRepository.findOne and handles an error', async() => {
            tasksRepository.findOne.mockResolvedValue(null);
            expect(taskService.getTaskById('someId', mockUser)).rejects.toThrow(NotFoundException);
        });
    });
});
