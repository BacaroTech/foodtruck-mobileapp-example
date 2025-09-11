import { Service } from 'typedi';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import { AppDataSource } from '@base/config/db';
import { IRepository } from '@base/infrastructure/abstracts/IRepository';
import { DishTag } from '@base/api/models';

@Service()
export class DishTagRepository extends RepositoryBase<DishTag>  implements IRepository<DishTag>{

  constructor() {
    super(AppDataSource.getRepository(DishTag));
  }

}
