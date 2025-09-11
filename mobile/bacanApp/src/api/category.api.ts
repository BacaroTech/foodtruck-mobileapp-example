import axios from 'axios';
import { API_URL } from 'src/config/api';
import { enableMock } from 'src/config/env';
import { categoriesMock } from 'src/mock/category.mock';
import {
  CategoryDTO,
  CategoryView,
} from 'src/models';
import { mapImg } from 'src/utils/category.utils';

const useCategoryApi = () => {

    const doAsyncCategoriesMenu = async () => {
        try {

            const response = await axios.get<CategoryDTO[]>(`${API_URL}/categories/menu`);
            const data = response.data;
            return data.map((truckCalendar) => ({
                ...truckCalendar,
                img: mapImg(truckCalendar),
            }));

        } catch (error) {
            console.error(error);
            if (enableMock) {
                return [...categoriesMock];
            }
        }
        return [] as CategoryView[];
    };
    return {
        doAsyncCategoriesMenu,
    };
};

export { useCategoryApi };
