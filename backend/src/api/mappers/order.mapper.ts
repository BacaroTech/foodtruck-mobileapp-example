import { Dish } from '@api/models/Dish';
import {
  CategoryDTO,
  TagDTO,
} from '@api/responses/LookUp/lookup.interface';
import {
  DishDTO,
  ExraOrderDTO,
  OrderDto,
  OrderItemDTO,
  TruckOrderDto,
} from '@api/responses/Orders/order.interface';

import {
  Extra,
  Order,
  OrdersItems,
} from '../models';
import { Category } from '../models/Category';
import { STATE_ORDER_TYPE } from '../models/enums/order.enums';
import { Tag } from '../models/Tag';
import {
  mapCatgoryDTO,
  mapLookUpDTO,
} from './lookup.mapper';

export function mapDishToDTO(input: Dish): DishDTO {
    const response: DishDTO = {
        id: input.id,
        code: input.code,
        name: input.name,
        description: input.description,
        note: input.note,
        price: input.price,
        categories: mapCategories(input.categories),
        tags: mapTags(input.tags)
    }

    return response;

}

function mapCategories(categories: Category[]): CategoryDTO[] | undefined {
    if (!categories) return;

    return categories.map(mapCategoryDTO);
}

function mapTags(tags: Tag[]): TagDTO[] | undefined {
    if (!tags) return;

    return tags.map(mapTagDTO);
}

const mapCategoryDTO = (cateogry: Category): CategoryDTO => ({ ...mapCatgoryDTO(cateogry) })
const mapTagDTO = (tag: Tag): TagDTO => ({ ...mapLookUpDTO(tag) })

export function mapOrderResponse(order: Order): OrderDto {
    return {
        id: order.id,
        ordersItems: order.ordersItems?.map(mapOrderItemsDto) || [],
        stateOrderCode: order.stateOrder?.code || "",
        truckCode: order.truck?.code || "",
        truckPhone: order.truck?.phone || "",
        pickUpTimeAccepted: order.pickUpTimeAccepted?.toString() || "",
        pickUpTimeRequest: order.pickUpTimeRequest?.toString() || "",
        total: order.total || 0,
    }
}

export function mapTruckOrderDetailResponse(order: Order): TruckOrderDto {
    return {
        id: order.id,
        ordersItems: order.ordersItems?.map(mapOrderItemsDto) || [],
        stateOrderCode: order.stateOrder?.code || "",
        truckCode: order?.truck?.code,
        userName: order?.user?.name,
        userUuid: order?.user?.uuid,
        pickUpTimeAccepted: order.pickUpTimeAccepted?.toString() || "",
        pickUpTimeRequest: order.pickUpTimeRequest?.toString() || "",
        total: order.total || 0,
        siteName: order?.site?.name,
        totalItems: order.ordersItems.reduce((a, b) => (a + b.quantity), 0)
    }
}

const excludeCode: string[] = [
    STATE_ORDER_TYPE.CART,
    STATE_ORDER_TYPE.REJECT,
    STATE_ORDER_TYPE.PICKEDUP
]

export function filterTruckResult(order: Order): boolean {
    const code = order.stateOrder.code;
    return !excludeCode.includes(code);
}

export function mapTruckOrderResponse(order: Order): TruckOrderDto {
    return {
        id: order.id,
        ordersItems: [],
        stateOrderCode: order.stateOrder?.code || "",
        truckCode: order?.truck?.code,
        userName: order?.user?.name,
        userUuid: order?.user?.uuid,
        pickUpTimeAccepted: order.pickUpTimeAccepted?.toString() || "",
        pickUpTimeRequest: order.pickUpTimeRequest?.toString() || "",
        total: order.total || 0,
        siteName: order.site?.name,
        totalItems: order.ordersItems.reduce((a, b) => (a + b.quantity), 0)
    }
}

export function mapOrderItemsDto(orderItem: OrdersItems): OrderItemDTO {
    return {
        id: orderItem.id,
        dish: orderItem.dish,
        quantity: orderItem.quantity,
        extra: orderItem.extras?.map(mapExtraDto),
        note: orderItem.note
    }
}

export function mapExtraDto(orderItem: Extra): ExraOrderDTO {
    return {
        id: orderItem.id,
        status: true,
        code: orderItem.code,
        name: orderItem.name,
        price: orderItem.price,
    }
}

export function isToday(created_at: Date | undefined): boolean {
    if (!created_at) return false;
    const isToday = created_at.getDay() === new Date().getDay();

    return isToday;
}