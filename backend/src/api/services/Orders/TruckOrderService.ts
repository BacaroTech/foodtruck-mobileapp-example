import { NotFoundError } from 'routing-controllers';
import Container, { Service } from 'typedi';

import {
  InvalidRequestException,
} from '@base/api/exceptions/Application/InvalidRequest';
import {
  mapCatgoryDTO,
  mapLookUpDTO,
} from '@base/api/mappers/lookup.mapper';
import {
  filterTruckResult,
  isToday,
  mapExtraDto,
  mapTruckOrderDetailResponse,
  mapTruckOrderResponse,
} from '@base/api/mappers/order.mapper';
import {
  Order,
  StateOrder,
} from '@base/api/models';
import { STATE_ORDER_TYPE } from '@base/api/models/enums/order.enums';
import {
  StateOrderRepository,
} from '@base/api/repositories/LookUp/StateOrderRepository';
import { DishRepository } from '@base/api/repositories/Orders/DishRepository';
import {
  ExtraOrderItemsRepository,
} from '@base/api/repositories/Orders/ExtraOrderItemsRepository';
import {
  IOrderRepository,
} from '@base/api/repositories/Orders/IOrderRepository';
import {
  OrderItemsRepository,
} from '@base/api/repositories/Orders/OrderItemsRepository';
import { OrderRepository } from '@base/api/repositories/Orders/OrderRepository';
import { TruckRepository } from '@base/api/repositories/Trucks/TruckRepository';
import {
  UserTruckRepository,
} from '@base/api/repositories/Trucks/UserTruckRepository';
import { UserRepository } from '@base/api/repositories/Users/UserRepository';
import {
  ExraOrderDTO,
  TruckOrderDto,
} from '@base/api/responses/Orders/order.interface';
import { ServiceBase } from '@base/infrastructure/abstracts/ServiceBase';
import { timeConverter } from '@base/utils';

@Service()
export class TruckOrderService extends ServiceBase<Order, IOrderRepository> {

  stateOrderRepository: StateOrderRepository;
  userRepository: UserRepository;
  truckRepository: TruckRepository;
  ordersItemsRepository: OrderItemsRepository;
  dishRepository: DishRepository;
  extraOrderItemsRepository: ExtraOrderItemsRepository;
  userTruckRepository: UserTruckRepository;

  constructor() {
    super(Container.get(OrderRepository));
    this.stateOrderRepository = Container.get(StateOrderRepository)
    this.userRepository = Container.get(UserRepository);
    this.truckRepository = Container.get(TruckRepository);
    this.ordersItemsRepository = Container.get(OrderItemsRepository);
    this.dishRepository = Container.get(DishRepository);
    this.extraOrderItemsRepository = Container.get(ExtraOrderItemsRepository);
    this.userTruckRepository = Container.get(UserTruckRepository);
  }


  public async findAllByUserTruck(userId: number): Promise<TruckOrderDto[]> {

    const truckUsers = await this.userTruckRepository.findByUserId(userId);
    if (!truckUsers || truckUsers.length === 0) {
      throw new InvalidRequestException("Richiesta non valida.");
    }
    //get first
    // TODO 
    const truckUser = truckUsers[0];

    const result = await this.repository.findAllByTruckId(truckUser.truckId);

    return result
          .filter(filterTruckResult)
          .filter(o => isToday(o.created_at))
          .map(mapTruckOrderResponse);

  }
  public async findAllByUserTruckByOrderId(userId: number, orderId: number): Promise<TruckOrderDto | null> {

    const truckUsers = await this.userTruckRepository.findByUserId(userId);

    if (!truckUsers || truckUsers.length === 0 || orderId === null || orderId === undefined) {
      throw new InvalidRequestException("Richiesta non valida.");
    }
    //get first
    const truckUser = truckUsers[0];

    const result: Order | null = await this.repository.findByIdByTruckIdFull(orderId, truckUser.truckId);
    if (result) {
      const dto = mapTruckOrderDetailResponse(result);
      for (const order of dto.ordersItems) {
        try {
          const dishId = order.dish.id;
          if (!dishId) {
            console.warn('OrderService - findLastCart: id not found');
            continue;
          }
          const dishEntity = await this.dishRepository.findByIdFull(dishId);
          if (!dishEntity) {
            console.warn('OrderService - findLastCart: entity not found: ID=' + dishId);
            continue;
          }
          let extrasDto: ExraOrderDTO[] = []
          if (order.id) {
            const extrasEntityList = await this.extraOrderItemsRepository.findByOrderItems(order.id);
            for (const extraOrder of extrasEntityList) {
              extrasDto.push(mapExtraDto(extraOrder.extra));
            }
          }

          order.dish.price = Number(dishEntity.price);
          order.dish.categories = dishEntity.categories.map(mapCatgoryDTO);
          order.dish.tags = dishEntity.tags.map(mapLookUpDTO);
          order.extra = [...extrasDto];
          
        } catch (error) {
          console.error("Error get extra", error);
        }
      }
      return dto;
    }
    throw new NotFoundError("Ordine non trovato");

  }

  public async updateTruckOrder(userId: number, orderId: number, data: TruckOrderDto): Promise<TruckOrderDto | null> {
    if (!data || !userId || !orderId || !data.response) {
      throw new InvalidRequestException("Richiesta non valida. Mancano i dati di richiesta");
    }

    const truckUsers = await this.userTruckRepository.findByUserId(userId);
    const truckUser = truckUsers[0];

    const dataDB: Order | null = await this.repository.findByIdByTruckIdFull(orderId, truckUser.truckId);
    if (dataDB) {

      let stateOrder: StateOrder | null = null;
      const _dataUpdate: any = {
        modify_at: new Date(),
      };
      const dataUpdate = await this.setStatus(data, dataDB, _dataUpdate);

      try {
        await super.update(orderId, dataUpdate);

        return this.findAllByUserTruckByOrderId(userId, orderId);

      } catch (error) {
        console.error("Error update order", error);
        throw new InvalidRequestException("Richiesta non valida.");
      }
    }
    throw new NotFoundError("Ordine non trovato");
  }

  private async setStatus(data: TruckOrderDto, dataDB: Order, dataUpdate: any) {
    let stateOrder: StateOrder | null = null;
    let _dataUpdate = {...dataUpdate}
    switch (data.response) {
      case 'CONFRIM':
        stateOrder = await this.stateOrderRepository.findByCode(STATE_ORDER_TYPE.ACCEPTED);
        if (dataDB.pickUpTimeRequest) {
          _dataUpdate['pickUpTimeAccepted'] = dataDB.pickUpTimeRequest;
        } else {
          throw new InvalidRequestException("Richiesta non valida. Manca l'ora di consegna");
        }
        break;
      case 'DENIED':
        stateOrder = await this.stateOrderRepository.findByCode(STATE_ORDER_TYPE.REJECT);

        break;
      case 'PICKEDUP':
        stateOrder = await this.stateOrderRepository.findByCode(STATE_ORDER_TYPE.PICKEDUP);

        break;
      case 'RUNNING':
        const timeRequest = timeConverter(data.pickUpTimeAccepted);

        if (!timeRequest) {
          throw new InvalidRequestException("Richiesta non valida. Manca l'ora di consegna");
        }
        if (timeRequest) {
          _dataUpdate['pickUpTimeAccepted'] = timeRequest;
        }
        stateOrder = await this.stateOrderRepository.findByCode(STATE_ORDER_TYPE.TRADE);
        break;
      default:
        break;
    }

    if (stateOrder) {
      _dataUpdate['stateOrder'] = stateOrder;
    }
    return _dataUpdate
  }

}
