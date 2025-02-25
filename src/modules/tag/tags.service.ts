import { EnhancedWithAuthHttpService } from '~shared/services/http-auth.service.ts';
import { httpFactoryService } from '~shared/services/http-factory.service.ts';

import { Tag } from './types/tag.type.ts';
import { CreateTag } from "./types/create-tag.type.ts";

class TagsService {
  constructor(private enhancedWithAuthHttpService: EnhancedWithAuthHttpService) {
    this.enhancedWithAuthHttpService = enhancedWithAuthHttpService;
  }
  
  public async getAll(): Promise<Tag[]> {
    return this.enhancedWithAuthHttpService.get<Tag[]>('/api/mindplan/tags/');
  }
  
  public async getByID(id: number): Promise<Tag> {
    return this.enhancedWithAuthHttpService.get<Tag>(`/api/mindplan/tags/${id}/`);
  }
  
  public async create(data: CreateTag): Promise<Tag> {
    return this.enhancedWithAuthHttpService.post<Tag, CreateTag>(`/api/mindplan/tags/`, data);
  }
}

export const tagsService = new TagsService(httpFactoryService.createAuthHttpService());
