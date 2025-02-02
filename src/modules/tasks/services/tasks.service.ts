import { EnhancedWithAuthHttpService } from '~shared/services/http-auth.service.ts';
import { httpFactoryService } from '~shared/services/http-factory.service.ts';

import { Task } from '../types/task.type.ts';
import { UpdateTaskType } from '../types/update-task.type.ts';
import { CreateTaskType } from '../types/create-task.type.ts';

class TasksService {
  constructor(private enhancedWithAuthHttpService: EnhancedWithAuthHttpService) {
    this.enhancedWithAuthHttpService = enhancedWithAuthHttpService;
  }
  
  public async getAll(): Promise<Task[]> {
    return this.enhancedWithAuthHttpService.get<Task[]>('/api/mindplan/tasks/');
  }
  
  public async getByID(id: number): Promise<Task> {
    return this.enhancedWithAuthHttpService.get<Task>(`/api/mindplan/tasks/${id}/`);
  }
  
  public async create(data: CreateTaskType): Promise<Task> {
    return this.enhancedWithAuthHttpService.post<Task, CreateTaskType>('/api/mindplan/tasks/', data)
  }
  
  public async partiallyUpdate(id: number, data: UpdateTaskType): Promise<Task> {
    return this.enhancedWithAuthHttpService.patch<Task, UpdateTaskType>(`/api/mindplan/tasks/${id}/`, data);
  }
  
  public async update(id: number, data: UpdateTaskType): Promise<Task> {
    return this.enhancedWithAuthHttpService.put<Task, UpdateTaskType>(`/api/mindplan/tasks/${id}/`, data);
  }
  
  public async delete(id: number): Promise<void> {
    return this.enhancedWithAuthHttpService.delete<void>(`/api/mindplan/tasks/${id}/`);
  }
}

export const tasksService = new TasksService(httpFactoryService.createAuthHttpService());
