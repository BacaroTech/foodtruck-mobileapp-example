import { Category } from '@base/api/models';
import { IRepository } from '@base/infrastructure/abstracts/IRepository';

export interface ICategoryRepository extends IRepository<Category> {

    findAllByTypeCategory(type: string): Promise<Category[]>;
}