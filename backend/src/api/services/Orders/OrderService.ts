import Container, { Service } from 'typedi';

import {
  GenericException,
} from '@base/api/exceptions/Application/GenericException';
import {
  InvalidRequestException,
} from '@base/api/exceptions/Application/InvalidRequest';
import {
  mapCatgoryDTO,
  mapLookUpDTO,
} from '@base/api/mappers/lookup.mapper';
import {
  isToday,
  mapExtraDto,
  mapOrderResponse,
} from '@base/api/mappers/order.mapper';
import {
  Order,
  OrdersItems,
  StateOrder,
} from '@base/api/models';
import { STATE_ORDER_TYPE } from '@base/api/models/enums/order.enums';
import { DayRepository } from '@base/api/repositories/LookUp/DayRepository';
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
import { SiteRepository } from '@base/api/repositories/Trucks/SiteRepository';
import {
  TruckCalendarRepository,
} from '@base/api/repositories/Trucks/TruckCalendarRepository';
import { TruckRepository } from '@base/api/repositories/Trucks/TruckRepository';
import { UserRepository } from '@base/api/repositories/Users/UserRepository';
import { OrderRequest } from '@base/api/requests/Dishes/OrderRequest';
import {
  ExraOrderDTO,
  OrderDto,
  OrderItemDTO,
} from '@base/api/responses/Orders/order.interface';
import { ServiceBase } from '@base/infrastructure/abstracts/ServiceBase';
import { timeConverter } from '@base/utils';

@Service()
export class OrderService extends ServiceBase<Order, IOrderRepository> {

  stateOrderRepository: StateOrderRepository;
  userRepository: UserRepository;
  truckRepository: TruckRepository;
  ordersItemsRepository: OrderItemsRepository;
  dishRepository: DishRepository;
  extraOrderItemsRepository: ExtraOrderItemsRepository;
  calendarRepository: TruckCalendarRepository;
  dayRepository: DayRepository;
  siteRepository: SiteRepository;

  constructor() {
    super(Container.get(OrderRepository));
    this.stateOrderRepository = Container.get(StateOrderRepository)
    this.userRepository = Container.get(UserRepository);
    this.truckRepository = Container.get(TruckRepository);
    this.ordersItemsRepository = Container.get(OrderItemsRepository);
    this.dishRepository = Container.get(DishRepository);
    this.extraOrderItemsRepository = Container.get(ExtraOrderItemsRepository);
    this.dayRepository = Container.get(DayRepository);
    this.siteRepository = Container.get(SiteRepository);
    this.calendarRepository = Container.get(TruckCalendarRepository);
  }

  public async deleteAll() {
    const all: Order[] = await this.repository.findAllFull();
    for (const or of all) {
      console.log("order items", or.ordersItems)
      for (const item of or.ordersItems) {
        const extras = await this.extraOrderItemsRepository.findByOrderItems(item.id);
        if (extras.length > 0) {
          for (const ex of extras) {
            try {              
              await this.extraOrderItemsRepository.delete(ex.id);          
            } catch (error) {
              console.error("Error Delete extra order items", error);
            }
          }
        }
        try {          
          await this.ordersItemsRepository.delete(item.id)
        } catch (error) {
          console.error("Error Delete order items", error);
        }
      }

      try {          
        await this.delete(or.id)
      } catch (error) {
        console.error("Error Delete order items", error);
      }
    }
  }
  public async createCartDto(data: OrderRequest, userid: number): Promise<OrderDto | null> {
    try {
      if (!data || !userid) {
        throw new InvalidRequestException("Richiesta non valida. Mancano i dati di richiesta");
      }
      const { ordersItems, ...otherData } = data;
      const user = await this.userRepository.findById(userid);

      const stateOrder = await this.stateOrderRepository.findByCode(STATE_ORDER_TYPE.CART);
      const ticketCode = this.generateTicketCode();
      const totalPrice = this.calculateTotal(ordersItems);

      const dataCreate: any = {
        ...otherData,
        stateOrder,
        ticketCode,
        user,
        created_at: new Date(),
        modify_at: new Date(),
        pickUpTimeRequest: null,
        pickUpTimeAccepted: null,
        total: totalPrice,
        site: null,
        truck: null,
        day: null
      }
      let truck = null;

      if (data.truckCode) {
        truck = await this.truckRepository.findByCode(data.truckCode);
      }

      if (truck) {
        dataCreate['truck'] = truck;
      }

      const order: Order | null = await this.repository.create(dataCreate);

      for (const orItems of ordersItems) {
        await this.saveSingleOrderItem(orItems, order);
      }

      return order ? mapOrderResponse(order) : null;

    } catch (error) {
      console.error("Error update order", error);
      throw new InvalidRequestException("Richiesta non valida.");
    }
  }
  calculateTotal(ordersItems: OrderItemDTO[]): number {
    let total = 0;
    for (const _orIt of ordersItems) {

      const extras: ExraOrderDTO[] = _orIt.extra || [];
      const totalPriceAdds = extras
        .filter(ext => ext.status)
        .reduce((a, b) => a + Number(b.price), 0);
      const parziale = Number(_orIt.dish.price || 0) + totalPriceAdds;
      const totalParziale = parziale * _orIt.quantity;
      total += totalParziale;
    }

    return total;
  }

  public async updateCartDto(id: number, data: OrderRequest, userId: number): Promise<OrderDto | null> {
    if (!data || !userId || !id) {
      throw new InvalidRequestException("Richiesta non valida. Mancano i dati di richiesta");
    }

    const dataDB = await this.repository.findByIdByUserIdFull(id, userId);

    if (dataDB != null) {
      const totalPrice = await this.saveOrUpdateOrderItems(data, dataDB);

      const dataUpdate: any = {
        modify_at: new Date(),
        total: totalPrice,
        pickUpTimeRequest: null,
        pickUpTimeAccepted: null,
        site: dataDB['site'],
        truck: dataDB['truck'],
        day: dataDB['day']
      };
      const pickUpTimeRequest = timeConverter(data.pickUpTimeRequest);
      if (pickUpTimeRequest && pickUpTimeRequest instanceof Date && !isNaN(pickUpTimeRequest as any)) {
        dataUpdate['pickUpTimeRequest'] = pickUpTimeRequest;
      }
      let truck = null;
      let day = null;
      let site = null;
      if (data.truckCode) {
        truck = await this.truckRepository.findByCode(data.truckCode);
      }

      if (data.siteCode) {
        site = await this.siteRepository.findByCode(data.siteCode);
      }
      if (data.dayCode) {
        day = await this.dayRepository.findByCode(data.dayCode);
      }

      if (truck) {
        dataUpdate['truck'] = truck;
      }
      if (day) {
        dataUpdate['day'] = day;
      }
      if (site) {
        dataUpdate['site'] = site;
      }

      try {
        await super.update(id, dataUpdate);

        const result = await this.repository.findByIdByUserIdFull(id, userId);
        return result ? mapOrderResponse(result) : null;

      } catch (error) {
        console.error("Error update order", error);
        throw new InvalidRequestException("Richiesta non valida.");
      }
    } else {
      throw new InvalidRequestException("Richiesta non valida.");
    }
  }

  public async sendTradeOrder(id: number, userTrade: OrderDto, userid: number): Promise<OrderDto | null> {
    if (!userTrade || !userid || !id) {
      throw new InvalidRequestException("Richiesta non valida. Mancano i dati di richiesta");
    }

    const dataDB = await this.repository.findByIdByUserIdFull(id, userid);
    const timeRequest = timeConverter(userTrade.pickUpTimeRequest);
    let sendStateOrder: StateOrder | null = null;
    if (userTrade.response === "CONFRIM") {
      sendStateOrder = await this.stateOrderRepository.findByCode(STATE_ORDER_TYPE.ACCEPTED);
    } else if (userTrade.response === "DENIED") {
      sendStateOrder = await this.stateOrderRepository.findByCode(STATE_ORDER_TYPE.REJECT);
    } else if (userTrade.response === "RUNNING") {
      if (!timeRequest) {
        throw new InvalidRequestException("Richiesta non valida. Manca l'ora di consegna");
      }
      sendStateOrder = await this.stateOrderRepository.findByCode(STATE_ORDER_TYPE.TRADE);
    }

    if (sendStateOrder === null) {
      throw new InvalidRequestException("Richiesta non valida. Manca lo stato");
    }

    if (dataDB != null) {
      const dataCreate: any = {
        ...dataDB,
        modify_at: new Date(),
        stateOrder: sendStateOrder,
      }
      // if (timeRequest) {
      //   dataCreate["pickUpTimeRequest"] = timeRequest
      // }

      try {
        await super.update(id, dataCreate);

        const result = await this.repository.findByIdByUserIdFull(id, userid);
        return result ? mapOrderResponse(result) : null;

      } catch (error) {
        console.error("Error update order", error);
        throw new InvalidRequestException("Richiesta non valida.");
      }
    } else {
      throw new InvalidRequestException("Richiesta non valida.");
    }
  }

  public async sendOrder(id: number, data: OrderRequest, userid: number): Promise<OrderDto | null> {
    if (!data || !userid || !id) {
      throw new InvalidRequestException("Richiesta non valida. Mancano i dati di richiesta");
    }

    const pickUpTimeRequest = timeConverter(data.pickUpTimeRequest);
    if (!pickUpTimeRequest) {
      throw new InvalidRequestException("Richiesta non valida. Manca l'ora di consegna");
    }
    if (!data.truckCode) {
      throw new InvalidRequestException("Deve essere selezionato un posto");
    }

    let truck = null;
    if (data.truckCode) {
      truck = await this.truckRepository.findByCode(data.truckCode);
    }
    if (!truck) {
      throw new InvalidRequestException("Deve essere selezionato un posto");
    }

    const dataDB = await this.repository.findByIdByUserIdFull(id, userid);
    if (dataDB != null) {

      await this.saveOrUpdateOrderItems(data, dataDB);

      const stateOrder = await this.stateOrderRepository.findByCode(STATE_ORDER_TYPE.SEND);
      const dataCreate: object = {
        modify_at: new Date(),
        stateOrder,
        truck,
        pickUpTimeRequest
      }

      try {
        await super.update(id, dataCreate);

        const result = await this.repository.findByIdByUserIdFull(id, userid);
        return result ? mapOrderResponse(result) : null;

      } catch (error) {
        throw error;
      }
    } else {
      throw new InvalidRequestException("Richiesta non valida.");
    }
  }

  public async findAllFull(): Promise<OrderDto[]> {
    try {
      const entities: Order[] = await this.repository.findAllFull();
      return entities.map(mapOrderResponse);
    } catch (e) {
      throw new InvalidRequestException("Richiesta non valida.");
    }
  }

  public async findAllCartByUserIdFull(userId: number): Promise<OrderDto[]> {
    try {
      const entities: Order[] = await this.repository.findAllByUserIdFull(userId);
      return entities.map(mapOrderResponse);
    } catch (e) {
      throw new InvalidRequestException("Richiesta non valida.");
    }
  }

  public async findCartByIdFull(id: number, userId: number): Promise<OrderDto | null> {
    if (!userId || !id) {
      throw new InvalidRequestException("Richiesta non valida. Mancano i dati di richiesta");
    }
    const entity: Order | null = await this.repository.findByIdByUserIdByStatusFull(id, userId, "CART");
    if (entity)
      return mapOrderResponse(entity)

    return null
  }

  public async findByIdByUserIdFull(id: number, userId: number): Promise<OrderDto | null> {
    if (!userId || !id) {
      throw new InvalidRequestException("Richiesta non valida. Mancano i dati di richiesta");
    }
    try {
      const entity: Order | null = await this.repository.findByIdByUserIdFull(id, userId);
      if (entity) {
        return mapOrderResponse(entity);
      }

      return null;

    } catch (error) {
      console.error("Error findByIdByUserIdFull", error);
      throw new InvalidRequestException("Richiesta non valida.");
    }
  }

  public async findAllDto(userId: number): Promise<OrderDto[]> {
    if (!userId) {
      throw new InvalidRequestException("Richiesta non valida. Mancano i dati di richiesta");
    }
    try {
      const entities: Order[] = await this.repository.findAllByUserIdFull(userId);
      return entities.map(mapOrderResponse);
    } catch (error) {
      console.error("Error findAllDto", error);
      throw new InvalidRequestException("Richiesta non valida.");
    }
  }

  public async findLastCart(userId: number): Promise<OrderDto | null> {
    if (!userId) {
      throw new InvalidRequestException("Richiesta non valida. Mancano i dati di richiesta");
    }
    try {
      const entities: Order[] = await this.repository.findAllByUserIdFull(userId);
      const includeState: string[] = [
        STATE_ORDER_TYPE.CART,
        STATE_ORDER_TYPE.ACCEPTED,
        STATE_ORDER_TYPE.TRADE,
        STATE_ORDER_TYPE.SEND
      ]
      const entitiesFiltered = entities
        .filter(o => includeState.includes(o.stateOrder.code))
        .filter(o => isToday(o.created_at));
      entitiesFiltered.sort((a, b) => {
        const timeA = a?.modify_at?.getTime() || 0;
        const timeB = b?.modify_at?.getTime() || 0;
        return timeB - timeA;
      });

      if (entitiesFiltered.length > 0) {
        const entity = entitiesFiltered[0];
        const dto = mapOrderResponse(entity);

        for (const orderItem of dto.ordersItems) {
          try {
            const dishId = orderItem.dish.id;
            if (!dishId) {
              console.warn('OrderService - findLastCart: id not found');
              continue;
            }
            const dishEntity = await this.dishRepository.findByIdFull(dishId);
            if (!dishEntity) {
              continue;
            }
            let extrasDto: ExraOrderDTO[] = []
            if (orderItem.id) {
              const extrasEntityList = await this.extraOrderItemsRepository.findByOrderItems(orderItem.id);
              for (const extraOrder of extrasEntityList) {
                extrasDto.push(mapExtraDto(extraOrder.extra));
              }
            }

            orderItem.dish.price = Number(dishEntity.price);
            orderItem.dish.categories = dishEntity.categories.map(mapCatgoryDTO);
            orderItem.dish.tags = dishEntity.tags.map(mapLookUpDTO);
            orderItem.extra = [...extrasDto];
          } catch (error) {
            console.error("Error get extra", error);
          }
        }
        return dto;
      }

      return null;
    } catch (error) {
      console.error("Error findLastCart", error);
      throw new InvalidRequestException("Richiesta non valida.");
    }

  }

  public async findLastReject(userId: number): Promise<OrderDto | null> {
    if (!userId) {
      throw new InvalidRequestException("Richiesta non valida. Mancano i dati di richiesta");
    }
    try {
      const entities: Order[] = await this.repository.findAllByUserIdFull(userId);
      const includeState: string[] = [
        STATE_ORDER_TYPE.REJECT,
      ]

      const entitiesFiltered = entities
        .filter(o => includeState.includes(o.stateOrder.code))
        .filter(o => isToday(o.created_at));
      entitiesFiltered.sort((a, b) => {
        const timeA = a?.modify_at?.getTime() || 0;
        const timeB = b?.modify_at?.getTime() || 0;
        return timeB - timeA;
      });
      if (entitiesFiltered.length > 0) {
        const entity = entitiesFiltered[0];
        const dto = mapOrderResponse(entity);

        return dto;
      }

      return null;
    } catch (error) {
      console.error("Error findLastCart", error);
      throw new InvalidRequestException("Richiesta non valida.");
    }
  }


  private async saveOrUpdateOrderItems(dataRequest: OrderRequest, orderDB: Order): Promise<number> {
    if (!dataRequest) {
      throw new InvalidRequestException("Richiesta non valida. Mancano i dati di richiesta");
    }
    let total: number = 0;

    try {

      const { ordersItems: ordersItemsRequest } = dataRequest;

      total = this.calculateTotal(ordersItemsRequest);

      for (let i = 0; i < ordersItemsRequest.length; i++) {
        const oItemRequest = ordersItemsRequest[i];
        const codeItemRequest = oItemRequest.dish?.code;
        if (!codeItemRequest) {
          console.warn("Item dish without code", JSON.stringify(codeItemRequest))
          continue;
        }

        if (oItemRequest.id) {
          //update or delete
          if (oItemRequest.quantity === 0) {
            //delete
            try {
              await this.deleteSingleOrderItem(oItemRequest, orderDB);

            } catch (error) {
              console.error("error save single item", error)
            }
          } else {
            try {
              await this.updateSingleOrderItem(oItemRequest, orderDB);

            } catch (error) {
              console.error("error save single item", error)
            }
          }
        } else {
          // create
          try {
            await this.saveSingleOrderItem(oItemRequest, orderDB);

          } catch (error) {
            console.error("error save single item", error)
          }
        }
      }


    } catch (error) {
      console.error("Error saveOrderItems", error)
      throw new GenericException("Errore generico, contattare il supporto");
    }

    return total;
  }
  private async saveOrderItemsOld(dataRequest: OrderRequest, orderId: number) {
    if (!dataRequest) {
      throw new InvalidRequestException("Richiesta non valida. Mancano i dati di richiesta");
    }
    try {
      const dataDB = await this.repository.findByIdFull(orderId);
      if (dataDB === null) {
        console.warn("Order Service - saveOrderItems order not found");
        return;
      }

      const ordersItemsDB = [...dataDB.ordersItems || []];
      ordersItemsDB.sort((a, b) => (a.dish.id - b.dish.id));

      const { ordersItems: ordersItemsRequest } = dataRequest;
      ordersItemsRequest.sort((a, b) => {
        if (a.dish?.id && b.dish?.id) {
          return a.dish.id - b.dish.id;
        }
        return 0;
      });

      const orderItemsToAdd: OrderItemDTO[] = [];
      const orderItemsToUpdate: OrderItemDTO[] = [];

      for (let i = 0; i < ordersItemsRequest.length; i++) {
        const oItemRequest = ordersItemsRequest[i];
        const codeItemRequest = oItemRequest.dish?.code;
        if (!codeItemRequest) {
          console.warn("Item dish without code", JSON.stringify(codeItemRequest))
          continue;
        }
        const index = ordersItemsDB.findIndex(a => a.dish.id === oItemRequest.dish.id);
        if (index > -1) {
          orderItemsToUpdate.push(oItemRequest);
          ordersItemsDB.splice(index, 1);

        } else {
          orderItemsToAdd.push(oItemRequest);
        }
      }
      const orderItemsToRemove = [...ordersItemsDB];

      for (const orderToAdd of orderItemsToAdd) {
        try {
          await this.saveSingleOrderItem(orderToAdd, dataDB);

        } catch (error) {
          console.error("error save single item", error)
        }
      }

      for (const orderToUpdate of orderItemsToUpdate) {
        try {
          await this.updateSingleOrderItem(orderToUpdate, dataDB);

        } catch (error) {
          console.error("error save single item", error)
        }
      }

      for (const orderToDelete of orderItemsToRemove) {
        try {
          await this.deleteSingleOrderItem(orderToDelete, dataDB);

        } catch (error) {
          console.error("error save single item", error)
        }
      }
    } catch (error) {
      console.error("Error update order", error);
    }
  }

  private async saveSingleOrderItem(orItems: OrderItemDTO, order: Order) {
    if (orItems?.dish?.id) {
      const dish = await this.dishRepository.findById(orItems.dish.id)
      if (dish) {

        const ordersItemsCreated = await this.ordersItemsRepository.create({
          dish,
          order,
          quantity: orItems.quantity,
          note: orItems.note
        })
        if (!ordersItemsCreated.id) {
          console.warn("Order items created. ", JSON.stringify(ordersItemsCreated));
          return;
        }

        console.info("ordersItemsCreated.id", ordersItemsCreated.id)
        if (orItems.extra && orItems.extra.length > 0) {
          for (const e of orItems.extra) {
            this.extraOrderItemsRepository.create({
              extraId: e.id,
              orderItemId: ordersItemsCreated.id
            })
          }
        }
      }
    }
  }

  private async updateSingleOrderItem(orItems: OrderItemDTO, order: Order) {

    if (orItems?.id && orItems?.dish?.id && orItems?.dish?.code) {
      const orItemCurrent: OrdersItems | null = await this.ordersItemsRepository.findByCode(orItems.dish.code, order.id);
      const dish = await this.dishRepository.findById(orItems.dish.id)
      if (orItemCurrent && dish) {
        await this.ordersItemsRepository.update(
          orItemCurrent.id, {
          dish,
          order,
          quantity: orItems.quantity,
          note: orItems.note
        });

        // extras
        if (orItems.extra && orItems.extra.length > 0) {
          const extraOrderEntityDBList = await this.extraOrderItemsRepository.findByOrderItems(orItems.id);
          const extraOrderRequest = orItems.extra;

          // cerco per ogni extra salvato nel DB
          for (const extraOrderDB of extraOrderEntityDBList) {

            // se è presente tra gli extra nella request
            const extraFindId = extraOrderRequest.findIndex(extra => extra.id === extraOrderDB.extra.id);
            if (extraFindId === -1) {
              // se non lo trovo va eliminato
              await this.extraOrderItemsRepository.delete(extraOrderDB.id);
              continue;
            }
            const extraFind = extraOrderRequest[extraFindId];

            if (extraFind.status) {
              // update
              const data = {
                id: extraOrderDB.id,
                extraId: extraFind.id,
                orderItemId: orItems.id,
                note: orItems.note
              }
              await this.extraOrderItemsRepository.update(extraOrderDB.id, data);
              // tolgo dalla lista l'extra trovato
              extraOrderRequest.splice(extraFindId, 1);
            } else {
              // se lo trovo ma con status false va eliminato
              await this.extraOrderItemsRepository.delete(extraOrderDB.id);

              // tolgo dalla lista l'extra trovato
              extraOrderRequest.splice(extraFindId, 1);
            }
          }

          //aggiungo i rimanenti di extraOrderRequest
          for (const extraORequest of extraOrderRequest) {
            this.extraOrderItemsRepository.create({
              extraId: extraORequest.id,
              orderItemId: orItems.id
            })
          }
        }
      }
    }
  }

  private async deleteSingleOrderItem(orItems: OrderItemDTO, order: Order) {

    if (orItems?.dish?.code) {
      const orItemCurrent: OrdersItems | null = await this.ordersItemsRepository.findByCode(orItems.dish.code, order.id);
      if (orItemCurrent) {
        const extraOrderEntityList = await this.extraOrderItemsRepository.findByOrderItems(orItemCurrent.id);

        if (extraOrderEntityList.length > 0) {

          for (const extraOrder of extraOrderEntityList) {
            await this.extraOrderItemsRepository.delete(extraOrder.id);
          }

        }
        
        await this.ordersItemsRepository.delete(orItemCurrent.id)
      }
    }
  }

  private generateTicketCode() {
    const nowString = ("" + Date.now());
    const postfix = nowString.substring(nowString.length - 4)
    const ticketCode = this.generateId("BACA_", `_${postfix}`);
    return ticketCode;
  }

  private generateId(prefix: string, postfix?: string) {

    postfix = postfix || "";

    const hashId = Date.now().toString(36);

    return prefix + hashId + postfix;
  }
}


