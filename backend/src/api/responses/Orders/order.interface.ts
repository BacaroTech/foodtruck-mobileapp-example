import {
  CategoryDTO,
  TagDTO,
} from '@api/responses/LookUp/lookup.interface';
import { TRADE_ORDER_TYPE } from '@base/api/models/enums/order.enums';
import { BaseDTO } from '@base/infrastructure/interfaces/base.interface';

export interface ExraOrderDTO {
  id: number;
  code: string;
  name: string;
  price: number;
  status: boolean;
}
export interface OrderItemDTO {
  id?: number;
  dish: DishDTO;
  quantity: number;
  extra?: ExraOrderDTO[];
  note?: string;
}

export interface OrderDto extends OrderBaseDto{
  ordersItems: OrderItemDTO[];
}

export interface OrderBaseDto {
  id?: number;
  truckCode?: string;
  truckPhone?: string;
  ticketCode?: string;
  stateOrderCode?: string;
  pickUpTimeRequest?: string;
  pickUpTimeAccepted?: string;
  siteName?: string;
  siteAddress?: string;
  response?: TRADE_ORDER_TYPE;
  total?: number;
  siteCode?: string;
  dayCode?: string;
}

export interface TruckOrderDto extends OrderDto {
  userUuid: string;
  userName: string;
  totalItems: number;
}

export interface DishDTO extends BaseDTO {
  description?: string;
  note?: string;
  price?: number;
  categories?: CategoryDTO[];
  tags?: TagDTO[];
}