import { InsertResult } from 'typeorm';

import { Order } from '@base/api/models';
import { IRepository } from '@base/infrastructure/abstracts/IRepository';

export interface IOrderRepository extends IRepository<Order> {
    
    createCustom(data: any): Promise<InsertResult>;
    createFull(data: Order): Promise<Order>;
    updateFull(id: number, data: Order): Promise<Order | null>;

    findAllFull(): Promise<Order[]>;

    findAllByUserIdFull(userId: number): Promise<Order[]>;

    findByIdFull(id: number): Promise<Order | null>;

    findByIdByUserIdFull(id: number, userId: number): Promise<Order | null>;

    findByIdByUserIdByStatusFull(id: number, userId: number, status: string): Promise<Order | null>

    findAllByTruckId(userId: number): Promise<Order[]>;

    findByIdByTruckIdFull(id: number, truckId: number): Promise<Order | null>;

}
