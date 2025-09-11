import { Service } from 'typedi';

import { User } from '@base/api/models';
import { AppDataSource } from '@base/config/db';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@Service()
export class UserRepository extends RepositoryBase<User> {

  constructor() {
    super(AppDataSource.getRepository(User));
  }

  public async createUser(data: object) {
    let entity = new User();

    Object.assign(entity, data);

    return await this.repository.save(entity);
  }

  public async updateUser(user: User, data: object) {
    Object.assign(user, data);

    return await user.save(data);
  }

  public async findOneByEmail(email: string) {
    return await this.repository.findOne({

      relations: {
        role: true
      }, 
      where: {
        email: email
      }
    }
    )
  }

  public async findOneByUuid(uuid: string) {
    return await this.repository.findOne({
      where: {
        uuid
      },
      relations: {
        role: true
      }
    }
    )
  }

  public async findOneByUuidJoinRole(uuid: string) {
    return await this.repository.findOne({
      relations: {
        role: true
      },
      where: {
        uuid
      }
    }
    )
  }

  public async findById(id: number) {
    return await this.repository.findOneBy({
      id: id
    })
  }
}
