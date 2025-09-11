import { Service } from 'typedi';

import { Category } from '@base/api/models/Category';
import { AppDataSource } from '@base/config/db';
import { IRepository } from '@base/infrastructure/abstracts/IRepository';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@Service()
export class CategoryRepository extends RepositoryBase<Category>  implements IRepository<Category>{

  constructor() {
    super(AppDataSource.getRepository(Category));
  }

  async findAllByTypeCategory(type: string): Promise<Category[]> {
    return this.repository.find({
      where: {
        type
      },
      order: {
        order: 'ASC'
      }
    })

  }

}
