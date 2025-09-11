import { Service } from 'typedi';

import { DishCategory } from '@base/api/models';
import { AppDataSource } from '@base/config/db';
import { IRepository } from '@base/infrastructure/abstracts/IRepository';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@Service()
export class DishCategoryRepository extends RepositoryBase<DishCategory> implements IRepository<DishCategory>{


  constructor() {
    super(AppDataSource.getRepository(DishCategory));
  }
  
  async findByDishId(dishId: number): Promise<DishCategory[]> {
    return this.repository.findBy(
      {
        dishId: dishId
      }
    )
  }
}
