import { Service } from 'typedi';

import { Dish } from '@base/api/models';
import { AppDataSource } from '@base/config/db';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

import { IDishRepository } from './IDishRepository';

@Service()
export class DishRepository extends RepositoryBase<Dish> implements IDishRepository {

  constructor() {
    super(AppDataSource.getRepository(Dish));
  }


  async findAllFull(): Promise<Dish[]> {
    return this.repository.find({
      relations: {
        tags: true,
        categories: true
      }
    })
  };
  async findByIdFull(id: number): Promise<Dish | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        tags: true,
        categories: true
      }
    })
  }
  async findAllByCodeCategory(codeCategory: string): Promise<Dish[]> {
    return this.repository.find({
      where: {
        categories: {
          code: codeCategory
        }
      },
      relations: {
        tags: true,
        categories: true
      }
    })
  }
  async findAllByIdCategory(idCategory: number): Promise<Dish[]> {
    return this.repository.find({
      where: {
        categories: {
          id: idCategory
        }
      },
      relations: {
        tags: true,
        categories: true
      }
    })
  }

}
