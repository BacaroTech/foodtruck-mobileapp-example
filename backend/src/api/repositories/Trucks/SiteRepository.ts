import { Service } from 'typedi';

import { Site } from '@base/api/models/Site';
import { AppDataSource } from '@base/config/db';
import { IRepository } from '@base/infrastructure/abstracts/IRepository';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@Service()
export class SiteRepository extends RepositoryBase<Site> implements IRepository<Site>{

  constructor() {
    super(AppDataSource.getRepository(Site));
  }

  async findByCode(code: string) {
    return this.repository.findOne({
      where: {
        code
      }
    })
  }

}
