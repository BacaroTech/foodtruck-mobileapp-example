import { Service } from 'typedi';

import { ExtraOrderItems } from '@base/api/models/ExtraOrderItems';
import { AppDataSource } from '@base/config/db';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@Service()
export class ExtraOrderItemsRepository extends RepositoryBase<ExtraOrderItems> {

    constructor() {
        super(AppDataSource.getRepository(ExtraOrderItems));
    }

    async findByOrderItems(ordersItemId: number): Promise<ExtraOrderItems[]> {
        return this.repository.find({
            relations: {
                extra: true,
                orderItem: true,
            },
            where: {
                orderItemId: ordersItemId
            }
        })

    }  
}