import { Service } from 'typedi';

import { OrdersItems } from '@base/api/models';
import { AppDataSource } from '@base/config/db';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@Service()
export class OrderItemsRepository extends RepositoryBase<OrdersItems> {

  constructor() {
    super(AppDataSource.getRepository(OrdersItems));
  }

  async findByCode(code: string, orderId: number): Promise<OrdersItems | null> {
    return this.repository.findOne({
      relations: {
        dish: true,
      },
      where: {
        order: {
          id: orderId
        },
        dish: {
          code: code
        }
      }
    })
  }
}