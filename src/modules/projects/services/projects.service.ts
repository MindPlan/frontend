import { EnhancedWithAuthHttpService } from '~shared/services/http-auth.service.ts';
import { httpFactoryService } from '~shared/services/http-factory.service';

class ProjectsService {
  constructor(private enhancedWithAuthHttpService: EnhancedWithAuthHttpService) {
    this.enhancedWithAuthHttpService = enhancedWithAuthHttpService;
  }

  public async getAll(): Promise<any[]> {
    return [];
  }

  public async getByID(id: number): Promise<any> {}

  public async create(data: any): Promise<any> {}

  public async partiallyUpdate(id: number, data: any): Promise<any> {}

  public async inviteUser(user_id: number): Promise<void> {}
  
  public async removeUser(user_id: number): Promise<void> {}

  public async delete(id: number): Promise<void> {}
}

export const projectsService = new ProjectsService(httpFactoryService.createAuthHttpService());
