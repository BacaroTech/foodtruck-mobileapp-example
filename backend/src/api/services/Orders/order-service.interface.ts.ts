import { StateOrder } from '@base/api/models';

export type UpdateTradeOrder = {
    modify_at: Date,
    sendStateOrder: StateOrder,
    pickUpTimeRequest?: Date
}