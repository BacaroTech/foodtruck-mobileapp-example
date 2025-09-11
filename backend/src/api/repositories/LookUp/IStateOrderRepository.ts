import { StateOrder } from '@base/api/models';
import { IRepository } from '@base/infrastructure/abstracts/IRepository';

export interface IStateOrderRepository extends IRepository<StateOrder> {

    findByCode(type: string): Promise<StateOrder | null>;
}