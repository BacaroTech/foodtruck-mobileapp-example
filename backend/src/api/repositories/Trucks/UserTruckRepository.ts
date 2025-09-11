import { Service } from 'typedi';

import { UserTruck } from '@base/api/models/UserTruck';
import { AppDataSource } from '@base/config/db';
import { IRepository } from '@base/infrastructure/abstracts/IRepository';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@Service()
export class UserTruckRepository extends RepositoryBase<UserTruck> implements IRepository<UserTruck>{

  constructor() {
    super(AppDataSource.getRepository(UserTruck));
  }


  async findByUserId(userId: number) {
    // const entityManager = AppDataSource.createEntityManager();
    // const result = await entityManager
    //     .createQueryBuilder()
    //     .select()
    //     .from(UserTruck, 'userTruck')
    //     .where("userTruck.userId = :userId", { userId: userId })
    //     .getMany();
    // const result = await this.repository.createQueryBuilder()
    //     .select()
    //     // .from(UserTruck, 'userTruck')
    //     .where("userTruck.userId = :userId", { userId: userId })
    //     .getMany();
    
    // return result;
    return this.repository.find({
      where: {
        userId: userId
      }
    })
  }


}
