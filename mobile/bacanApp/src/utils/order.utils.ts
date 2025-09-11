import { OrderItemDTO } from 'src/models';

const statusReadonly = ['SEND', 'TRADE', 'ACCEPTED'];
export function checkReadonlyState(stateOrderCode: string | undefined): boolean {

    if (stateOrderCode && statusReadonly.includes(stateOrderCode)) {
        return true;
    }
    return false;
}

export function countTotalItemsOrder(ordersItems: OrderItemDTO[]): number {

    const count =  ordersItems.reduce((a, b) => { return a + b.quantity; }, 0);
    return count;
}
