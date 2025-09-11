import Container, { Service } from 'typedi';

import { OrderRepository } from '@base/api/repositories/Orders/OrderRepository';

import { Order } from '../../models';

@Service()
export class DailyCleanUpService {

    orderRepository: OrderRepository;

    constructor() {
        this.orderRepository = Container.get(OrderRepository);
    }

    async cleanPastOrders(pastOrders: Order[]) {
        for (const order of pastOrders) {
            console.info("eliminazione dell'ordine " + order.id);
            order.delated_at = new Date();
            try {
                await this.orderRepository.update(order.id, order);    
                console.info("Ordine eliminato con successo " + order.id);
            } catch (error) {
                console.warn("Errore durante l'eliminazione dell'ordine: " + order.id);
            }            
        }
    }

    async getAllPastOrders(): Promise<Order[]> {
        const allPastOrder: Order[] = await this.orderRepository.findAllPastNotNullOrders();

        return allPastOrder;

    }




}