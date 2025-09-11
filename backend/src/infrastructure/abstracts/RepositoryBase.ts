import {
  DeepPartial,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import {
  QueryDeepPartialEntity,
} from 'typeorm/query-builder/QueryPartialEntity';

import { EntityBase } from './EntityBase';
import { IRepository } from './IRepository';

export abstract class RepositoryBase<T extends EntityBase> implements IRepository<T>{
  
  constructor(public readonly repository: Repository<T>) {}

  public async findAll(): Promise<T[]> {
    return this.repository.find();
  }
  
  public async findById(id: number): Promise<T | null> {
    return this.repository.findOneBy({ id } as FindOptionsWhere<T>)
  }

  public async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  public async update(id: number, data: QueryDeepPartialEntity<T>): Promise<T | null> {
    const elementFind = await this.findById(id);
    
    if (elementFind) {
      Object.assign(elementFind, data);
      const elementSaved = elementFind?.save(data)
      //this.repository.update({ id } as FindOptionsWhere<T>, data);
      return elementSaved;//this.findById(id);
    }
    
    return null;
  }

  public async delete(id: number): Promise<void> {
    this.repository.delete({ id } as FindOptionsWhere<T>);
  }
}
