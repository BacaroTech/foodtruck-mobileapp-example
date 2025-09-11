import {
  AllergensDTO,
  DishDTO,
  DishView,
  TagDTO,
} from 'src/models';

export const dishDtoViewList = (data: DishDTO[]): DishView[] => {
    const dataView: DishView[] = data.map(dishDtoViewMap);

    return dataView;
};

export const dishDtoViewMap = (dto: DishDTO): DishView => {
    const tags = dto.tags || ([] as TagDTO[]);
    const allergens: AllergensDTO[] = tags.map(a => ({
        code: a.code,
        name: a.name,
    }));
    const _data: DishView = {
        id: dto.id,
        code: dto.code,
        note: dto.note,
        name: dto.name,
        description: dto.description || '',
        price: dto.price || 0.0,
        allergens,
    };

    return _data;
};
