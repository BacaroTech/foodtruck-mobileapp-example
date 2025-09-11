import { Dish } from '@base/api/models';
import { DishDTO } from '@base/api/responses/Orders/order.interface';
import { IRepository } from '@base/infrastructure/abstracts/IRepository';

export interface IDishRepository extends IRepository<Dish> {
  
  findAllFull(): Dish[] | PromiseLike<Dish[]>;

  findAllByIdCategory(idCategory: number): Dish[] | PromiseLike<Dish[]>;
  
  findAllByCodeCategory(codeCategory: string): Dish[] | PromiseLike<Dish[]>;

  findByIdFull(id: number): Promise<Dish | null>;

  update(id: number, data: DishDTO): Promise<Dish | null> 

}