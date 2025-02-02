import { EnhancedWithAuthHttpService } from '~shared/services/http-auth.service.ts';
import { httpFactoryService } from '~shared/services/http-factory.service.ts';

class TasksService {
  constructor(private enhancedWithAuthHttpService: EnhancedWithAuthHttpService) {
    this.enhancedWithAuthHttpService = enhancedWithAuthHttpService;
  }
}

export const tasksService = new TasksService(httpFactoryService.createAuthHttpService());
