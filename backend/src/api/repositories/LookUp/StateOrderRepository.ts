import { Service } from 'typedi';

import { StateOrder } from '@base/api/models';
import { AppDataSource } from '@base/config/db';
import { IRepository } from '@base/infrastructure/abstracts/IRepository';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@Service()
export class StateOrderRepository extends RepositoryBase<StateOrder> implements IRepository<StateOrder>{

  constructor() {
    super(AppDataSource.getRepository(StateOrder));
  }

  async findByCode(code: string): Promise<StateOrder | null> {

    return this.repository.findOne({
      where: {
        code: code
      }
    })
  }
}