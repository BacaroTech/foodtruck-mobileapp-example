import { TRADE_ORDER_TYPE } from '@base/api/models/enums/order.enums';
import { OrderDto } from '@base/api/responses/Orders/order.interface';

export interface OrderRequest extends OrderDto {
    status: TRADE_ORDER_TYPE;
}
