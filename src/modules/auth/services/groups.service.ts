import { EnhancedWithAuthHttpService } from '~shared/services/http-auth.service.ts';
import { httpFactoryService } from '~shared/services/http-factory.service.ts';
import { Group } from '../types/groups/group.type.ts';
import { CreateGroupType } from '../types/groups/create-group.type.ts';


class GroupsService {
  constructor(private enhancedWithAuthHttpService: EnhancedWithAuthHttpService) {
    this.enhancedWithAuthHttpService = enhancedWithAuthHttpService;
  }
  
  public async getAll(): Promise<Group[]> {
    return this.enhancedWithAuthHttpService.get<Group[]>('/api/mindplan/groups/');
  }
  
  public async create(data: CreateGroupType): Promise<Group> {
    return this.enhancedWithAuthHttpService.post<Group, CreateGroupType>('/api/mindplan/groups/', data);
  }
}

export const groupsService = new GroupsService(httpFactoryService.createAuthHttpService());
