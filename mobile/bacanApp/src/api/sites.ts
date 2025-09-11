import axios from 'axios';
import { API_URL } from 'src/config/api';
import { enableMock } from 'src/config/env';
import {
  siteFullMock,
  sitesMock,
} from 'src/mock/sites.mock';
import { TruckDayDTO } from 'src/models';

const useSitesApi = () => {
    const doAsyncPlaces = async () => {
        try {
            const response = await axios.get<TruckDayDTO[]>(`${API_URL}/where/now`);
            const data = response.data;
            return data.map((truckCalendar) => truckCalendar.siteName);

        } catch (error) {
            console.error(error);
            if (enableMock) {
                return [...sitesMock];
            }
        }
        return [] as string[];
    };

    const doAsyncPlacesFull = async () => {
        try {
            const response = await axios.get<TruckDayDTO[]>(`${API_URL}/where/now`);
            console.log(response.data)
            return response.data;

        } catch (error) {
            console.error(error);
            if (enableMock) {
                return [...siteFullMock];
            }
        }
        return [] as TruckDayDTO[];
    };

    const doAsyncPlacesWeek = async () => {
        try {
            const response = await axios.get<TruckDayDTO[]>(`${API_URL}/where/week`);
            return response.data;
        } catch (error) {
            console.error(error);
            if (enableMock) {
                return [...siteFullMock];
            }
        }
        return [] as TruckDayDTO[];
    };
    return {
        doAsyncPlaces,
        doAsyncPlacesFull,
        doAsyncPlacesWeek,
    };
};

export { useSitesApi };
