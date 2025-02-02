import { EnhancedWithAuthHttpService } from '~shared/services/http-auth.service.ts';
import { httpFactoryService } from '~shared/services/http-factory.service.ts';


class GroupsService {
  constructor(private enhancedWithAuthHttpService: EnhancedWithAuthHttpService) {
    this.enhancedWithAuthHttpService = enhancedWithAuthHttpService;
  }
  
  public async getAll(): Promise<void> {
  
  }
}

export const groupsService = new GroupsService(httpFactoryService.createAuthHttpService());
