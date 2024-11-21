import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from "./tasks.service";

const mockTaskRepository = () => ({ 
    getAllTasks: jest.fn(),
}); // I'm not using a object to this instead I'm using factory function

const mockUser = {
    id:"123",
    username: "Barath",
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
});
