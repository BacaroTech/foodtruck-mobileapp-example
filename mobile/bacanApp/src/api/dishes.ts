import axios from 'axios';
import { API_URL } from 'src/config/api';
import { enableMock } from 'src/config/env';
import { dishesMock } from 'src/mock';
import {
  CategoryDTO,
  DishDTO,
  DishView,
} from 'src/models';
import { dishDtoViewList } from 'src/utils/dish.utils';

const useDishesApi = () => {
    const doAsyncDishes = async (category: CategoryDTO) => {
        try {

            const response = await axios.get<DishDTO[]>(`${API_URL}/dishes/category/${category.code}`);
            const dataView: DishView[] = dishDtoViewList(response.data);

            return dataView;

        } catch (error) {
            console.error(error);
            if (enableMock) {
                return [...dishesMock];
            }
        }
        return [] as DishView[];
    };
    return {
        doAsyncDishes,
    };
};

export { useDishesApi };
