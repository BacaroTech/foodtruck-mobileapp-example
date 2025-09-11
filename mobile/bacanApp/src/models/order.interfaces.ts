import {
  CategoryDTO,
  StatusCartView,
  TagDTO,
} from '.';

export interface ExtrasAddedView extends ExtrasView {
    status: boolean;
}

export interface ExtrasView extends ExtrasDTO { }

export interface ExtrasDTO {
    price: number;
    name: string;
    code: string;
    id: number;
}

export interface AllergensDTO {
    code: string;
    name: string;
}
export type Allergens = 'glutine' | 'soia' | 'glutine' | 'soia' | 'glutine' | 'soia';

interface DishBaseDTO {
    id: number;
    code: string
    name: string;
    description?: string;
    note?: string;
    price?: number;
    categories?: CategoryDTO[];
}

export interface DishDTO extends DishBaseDTO {
    tags?: TagDTO[];
}

export interface DishView extends DishBaseDTO {
    allergens: AllergensDTO[];
}

export interface ProductDTO {
    name: string,
    description: string,
    basePrice: number,
    adds: ExtrasView[],
    totalPriceAdds: number,
    remove: string,
    allergens: Allergens[],
    quantity: number,
}

export interface OrderItemView extends OrderItemDTO {
    dish: DishView;
}
export interface OrderItemDTO extends OrderItemBaseDTO {
    dish: DishDTO;
}
interface OrderItemBaseDTO {
    id?: number;
    extra: ExtrasDTO[];
    note?: string;
    quantity: number;
}

export type BacaResponseType = 'CONFRIM' | 'DENIED' | 'RUNNING' | 'PICKEDUP';

export type StateOrderCode =
    'CART' |
    'SEND' |
    'ACCEPTED' |
    'TRADE' |
    'REJECT' |
    'PICKEDUP';

export interface OrderDTO extends OrderBaseDTO{
    ordersItems: OrderItemDTO[];
}

export interface OrderBaseDTO {
    id?: number;
    truckCode?: string;
    truckPhone?: string;
    ticketCode?: string;
    stateOrderCode?: StateOrderCode;
    pickUpTimeRequest?: string;
    pickUpTimeAccepted?: string;
    siteName?: string;
    siteAddress?: string;
    siteCode?: string;
    dayCode?: string;
    response?: BacaResponseType;
    total?: number;
}
export interface TruckOrderDTO extends OrderDTO {
    userUuid: string;
    userName: string;
    totalItems: number;
}
export interface OrderTruckView {
    orderID: number;
    user: string;
    takeHour: string;
    takePropose: string;
    status: StatusCartView;
    place: string;
    total: number;
    totalItems: number;
}

export interface OrderTruckViewDetail extends OrderTruckView {
    orderItems: OrderTruckItemsView[]
}

export interface OrderTruckItemsView {
    name: string;
    basePrice: string;
    description: string;
    adds: AddsTruckView[];
    remove: string;
    quantity: number;
}

export interface AddsTruckView {
    name: string;
    price: string;
}
