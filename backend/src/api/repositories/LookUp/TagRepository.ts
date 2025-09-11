import { Service } from 'typedi';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import { AppDataSource } from '@base/config/db';
import { IRepository } from '@base/infrastructure/abstracts/IRepository';
import { Tag } from '@base/api/models';

@Service()
export class TagRepository extends RepositoryBase<Tag>  implements IRepository<Tag>{

  constructor() {
    super(AppDataSource.getRepository(Tag));
  }

}
