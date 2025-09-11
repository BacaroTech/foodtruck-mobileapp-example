import { Service } from 'typedi';

import { Truck } from '@base/api/models/Truck';
import { AppDataSource } from '@base/config/db';
import { IRepository } from '@base/infrastructure/abstracts/IRepository';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@Service()
export class TruckRepository extends RepositoryBase<Truck> implements IRepository<Truck>{

  constructor() {
    super(AppDataSource.getRepository(Truck));
  }


  async findByCode(code: string) {
    return this.repository.findOne({
      where: {
        code
      }
    })
  }

}
