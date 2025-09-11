import { BaseEntity, DeepPartial } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IRepository<T extends BaseEntity> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(data: Partial<T> | DeepPartial<T>): Promise<T>;
    update(id: number, data: QueryDeepPartialEntity<T>): Promise<T | null>;
    delete(id: number): Promise<void>;
}