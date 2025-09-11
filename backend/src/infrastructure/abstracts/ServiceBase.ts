import { BaseEntity } from 'typeorm';
import {
  QueryDeepPartialEntity,
} from 'typeorm/query-builder/QueryPartialEntity';

import { IRepository } from './IRepository';

export abstract class ServiceBase<T extends BaseEntity, Repo extends IRepository<T> = IRepository<T>> {
  constructor(public readonly repository: Repo) {}

  async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async findById(id: number): Promise<T | null> {
    return this.repository.findById(id);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: number, data: QueryDeepPartialEntity<T>): Promise<T | null> {
    
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}