import {
  LookUpEntityBase,
} from '@base/infrastructure/abstracts/LookUpEntityBase';
import { BaseDTO } from '@base/infrastructure/interfaces/base.interface';

import { Category } from '../models';
import { CategoryDTO } from '../responses/LookUp/lookup.interface';

export function mapLookUpDTO(input: LookUpEntityBase): BaseDTO {

    return {
        id: input.id,
        code: input.code,
        name: input.name
    }
}


export function mapCatgoryDTO(input: Category): CategoryDTO {
    const base = mapLookUpDTO(input);
    return {
        ...base,
        order: input.order
    }
}