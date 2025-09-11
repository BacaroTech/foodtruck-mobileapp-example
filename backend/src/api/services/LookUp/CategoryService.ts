import {
  Container,
  Service,
} from 'typedi';

import { mapCatgoryDTO } from '@base/api/mappers/lookup.mapper';
import { Category } from '@base/api/models/Category';
import { CATEGORY_TYPE } from '@base/api/models/enums/category.enums';
import {
  CategoryRepository,
} from '@base/api/repositories/LookUp/CategoryRepository';
import {
  ICategoryRepository,
} from '@base/api/repositories/LookUp/ICategoryRepository';
import { CategoryDTO } from '@base/api/responses/LookUp/lookup.interface';
import { ServiceBase } from '@base/infrastructure/abstracts/ServiceBase';

@Service()
export class CategoryService extends ServiceBase<Category, ICategoryRepository> {

  constructor() {
    super(Container.get(CategoryRepository));
  }
  async findAllDto(): Promise<CategoryDTO[]> {
    const entities = await super.findAll();
    return entities.map(mapCatgoryDTO);
  }

  async findAllDishCategory(): Promise<CategoryDTO[]> {
    const entities = await this.repository.findAllByTypeCategory(CATEGORY_TYPE.MENU);
    return entities.map(mapCatgoryDTO)
  }

}
