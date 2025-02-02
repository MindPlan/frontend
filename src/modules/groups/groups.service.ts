import { EnhancedWithAuthHttpService } from '~shared/services/http-auth.service.ts';
import { httpFactoryService } from '~shared/services/http-factory.service.ts';

import { Group } from './types/group.type.ts';
import { CreateGroupType } from './types/create-group.type.ts';
import { UpdateGroupType } from './types/update-group.type.ts';

class GroupsService {
  constructor(private enhancedWithAuthHttpService: EnhancedWithAuthHttpService) {
    this.enhancedWithAuthHttpService = enhancedWithAuthHttpService;
  }
  
  public async getAll(): Promise<Group[]> {
    return this.enhancedWithAuthHttpService.get<Group[]>('/api/mindplan/groups/');
  }
  
  public async getByID(id: number): Promise<Group> {
    return this.enhancedWithAuthHttpService.get<Group>(`/api/mindplan/groups/${id}/`);
  }
  
  public async create(data: CreateGroupType): Promise<Group> {
    return this.enhancedWithAuthHttpService.post<Group, CreateGroupType>('/api/mindplan/groups/', data);
  }
  
  public async partiallyUpdate(id: number, data: UpdateGroupType): Promise<Group> {
    return this.enhancedWithAuthHttpService.patch<Group, UpdateGroupType>(`/api/mindplan/groups/${id}/`, data);
  }
  
  public async update(id: number, data: UpdateGroupType): Promise<Group> {
    return this.enhancedWithAuthHttpService.put<Group, UpdateGroupType>(`/api/mindplan/groups/${id}/`, data);
  }
  
  public async delete(id: number): Promise<void> {
    return this.enhancedWithAuthHttpService.delete<void>(`/api/mindplan/groups/${id}/`);
  }
}

export const groupsService = new GroupsService(httpFactoryService.createAuthHttpService());
