import {
  Container,
  Service,
} from 'typedi';

import { mapDishToDTO } from '@base/api/mappers/order.mapper';
import { Dish } from '@base/api/models/Dish';
import {
  DishCategoryRepository,
} from '@base/api/repositories/Orders/DishCategoryRepository';
import { DishRepository } from '@base/api/repositories/Orders/DishRepository';
import { IDishRepository } from '@base/api/repositories/Orders/IDishRepository';
import { DishDTO } from '@base/api/responses/Orders/order.interface';
import { ServiceBase } from '@base/infrastructure/abstracts/ServiceBase';

@Service()
export class DishService extends ServiceBase<Dish, IDishRepository> {

  dishCategoryRepository: DishCategoryRepository;
  
  constructor() {
    super(Container.get(DishRepository));
    this.dishCategoryRepository = Container.get(DishCategoryRepository);
  }


  public async findAllDTO(): Promise<DishDTO[]> {

    const entities: Dish[] = await this.repository.findAllFull();

    return entities.map(mapDishToDTO);
  }

  public async findAllByCodeCategory(codeCategory: string) {
    const entities: Dish[] = await this.repository.findAllByCodeCategory(codeCategory);
    return entities.map(mapDishToDTO);
  }

  public async findByIdFull(id: number): Promise<DishDTO | null> {
    const entity: Dish | null = await this.repository.findByIdFull(id);
    if (entity) {
      return mapDishToDTO(entity);
    }
    return null
  }
  public async findAllByIdCategory(idCategory: number):  Promise<DishDTO[]> {
    const entities: Dish[] = await this.repository.findAllByIdCategory(idCategory);
    return entities.map(mapDishToDTO);
  }

  public async update(id: number, data: DishDTO): Promise<Dish | null> {
    const value = await super.update(id, data)
    return value;
  }
}
