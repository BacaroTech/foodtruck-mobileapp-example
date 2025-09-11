import { Service } from 'typedi';
import {
  InsertResult,
  IsNull,
  LessThan,
} from 'typeorm';

import { Order } from '@base/api/models';
import { AppDataSource } from '@base/config/db';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

import { IOrderRepository } from './IOrderRepository';

@Service()
export class OrderRepository extends RepositoryBase<Order> implements IOrderRepository {

  constructor() {
    super(AppDataSource.getRepository(Order));
  }

  async createCustom(data: any): Promise<InsertResult> {
    const v = await this.repository.createQueryBuilder()
      .insert()
      .into(Order)
      .values({
        created_at: data['created_at'],
        modify_at: data['modify_at'],
        ticketCode: data['ticketCode'],
        pickUpTimeRequest: data['pickUpTimeRequest'],
        pickUpTimeAccepted: data['pickUpTimeAccepted'],
        total: data['total'],
        user: data['user'],
        truck: data['truck'],
        stateOrder: data['stateOrder'],
        site: data['site'],
        day: data['day']
      })
      .execute();

    return v
  }

  async createFull(data: Order) {
    const { ordersItems, ...others } = data;
    const orderItemsIds = ordersItems.map(a => {
      const orderItem: object = {
        dish: { id: a.dish.id },
        order: { id: a.order.id }
      }
    })

    return this.repository.create({
      ...others,
      ordersItems: (orderItemsIds as any)
    })
  }
  async updateFull(id: number, data: Order) {
    const elementFind = await this.findById(id);
    const { ordersItems, ...others } = data;
    if (elementFind) {
      Object.assign(elementFind, data);
      return elementFind.save({
        data
      })
    }
    return null;

  }
  async findAllFull(): Promise<Order[]> {
    return this.repository.find({
      relations: {
        ordersItems: {
          dish: true
        },
        truck: true,
        stateOrder: true,
      },
      where: {
        delated_at: IsNull(),
      }
    })
  };

  async findAllByUserIdFull(userId: number): Promise<Order[]> {
    return this.repository.find({
      relations: {
        ordersItems: {
          dish: true,
        },
        truck: true,
        stateOrder: true
      },
      where: {
        delated_at: IsNull(),
        user: {
          id: userId
        }
      }
    })
  };

  async findByIdFull(id: number): Promise<Order | null> {
    return this.repository.findOne({
      relations: {
        ordersItems: {
          dish: true
        },
        truck: true,
        stateOrder: true
      },
      where: {
        delated_at: IsNull(),
        id: id
      }
    })
  }

  async findByIdByUserIdFull(id: number, userId: number): Promise<Order | null> {
    return this.repository.findOne({
      relations: {
        ordersItems: {
          dish: true
        },
        truck: true,
        stateOrder: true
      },
      where: {
        user: {
          id: userId
        },
        id
      }
    })
  }

  async findByIdByUserIdByStatusFull(id: number, userId: number, orderStatus: string): Promise<Order | null> {
    return this.repository.findOne({
      relations: {
        ordersItems: {
          dish: true
        },
        truck: true,
        stateOrder: true
      },
      where: {
        user: {
          id: userId
        },
        id,
        stateOrder: {
          code: orderStatus
        },
        delated_at: IsNull(),
      }
    })
  }

  async findAllByTruckId(truckId: number): Promise<Order[]> {
    return this.repository.find({
      relations: {
        ordersItems: {
          dish: true
        },
        truck: true,
        stateOrder: true,
        site: true,
        user: true
      },
      where: {
        truck: {
          id: truckId
        },
        delated_at: IsNull(),
      }
    })
  }

  findByIdByTruckIdFull(id: number, truckId: number): Promise<Order | null> {
    return this.repository.findOne({
      relations: {
        truck: true,
        stateOrder: true,
        site: true,
        ordersItems: {
          dish: true
        },
        user: true
      },
      where: {
        truck: {
          id: truckId
        },
        id: id,
        delated_at: IsNull(),
      }
    })
  }

  findAllPastNotNullOrders(): Order[] | PromiseLike<Order[]> {
    const day = new Date();
    day.setSeconds(0);
    day.setHours(0);
    day.setMinutes(0);
    console.log(day.toLocaleString())
    return this.repository.find({
      where: {
        delated_at: IsNull(),
        created_at: LessThan(day)
      }
    });
  }
}