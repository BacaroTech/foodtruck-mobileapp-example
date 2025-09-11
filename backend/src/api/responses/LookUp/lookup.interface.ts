import { BaseDTO } from '@base/infrastructure/interfaces/base.interface';

export interface DayDTO extends BaseDTO { }

export interface CategoryDTO extends BaseDTO {
    order: number;
}

export interface TagDTO extends BaseDTO {}