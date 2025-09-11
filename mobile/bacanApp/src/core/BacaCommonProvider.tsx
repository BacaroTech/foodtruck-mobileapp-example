/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  useCategoryApi,
  useSitesApi,
} from 'src/api';
import { useExtrasApi } from 'src/api/extras.api';
import {
  defaultTimeEnd,
  defaultTimeStart,
} from 'src/config';
import {
  CommonActionContext,
  CommonDataContext,
  ICommonActionContext,
  ICommonDataContext,
  initialCommonData,
  useCurrentUser,
} from 'src/context';
import { t } from 'src/location';
import {
  CategoryView,
  ExtrasView,
  IChildrenReactNode,
  WhereWeekView,
} from 'src/models';
import { TruckDayDTO } from 'src/models/where.interfaces';

const BacaCommon = ({ children }: IChildrenReactNode) => {
    const { data } = useCurrentUser();
    const [commonData, setCommonData] = useState<ICommonDataContext>(initialCommonData);
    const { doAsyncCategoriesMenu } = useCategoryApi();
    const { doAsyncPlacesFull, doAsyncPlacesWeek } = useSitesApi();
    const { doAsyncExtras } = useExtrasApi();

    const contextValue = useMemo<ICommonDataContext>(() => ({
        ...commonData,
    }), [commonData]);

    const fetchData = async () => {
        let todayPlaces: TruckDayDTO[] = [];
        let weekPlaces: TruckDayDTO[] = [];
        let categories: CategoryView[] = [];
        let whereWeekView: WhereWeekView[] = [];
        let extras: ExtrasView[] = [];

        setCommonData({
            categories: [],
            todayPlaces: [],
            weekPlaces: [],
            whereWeekView: [],
            extras: [],
            loading: true,
        });
        try {
            categories = await doAsyncCategoriesMenu();
        } catch (error) {
            console.error('get categories error', error);
        }

        try {
            todayPlaces = await doAsyncPlacesFull();
        } catch (error) {
            console.error('get places error', error);
        }

        try {
            weekPlaces = await doAsyncPlacesWeek();
            for (const place of weekPlaces) {
                const whereWeek = whereWeekView.find(wView => wView.day === place.nameOfDay);
                if (whereWeek) {
                    whereWeek.where.push({
                        address: `${place.siteName}, ${place.siteAddress}`,
                        rangeTime: `${defaultTimeStart} - ${defaultTimeEnd}`,
                    });
                } else {
                    whereWeekView.push({
                        day: t(`customer.day.${place.nameOfDay}`),
                        where: [{
                            address: `${place.siteName}, ${place.siteAddress}`,
                            rangeTime: `${defaultTimeStart} - ${defaultTimeEnd}`,
                        }],
                    });
                }
            }
        } catch (error) {
            console.error('get places week error', error);
        }
        try {
            extras = await doAsyncExtras();
        } catch (error) {
            console.error('get extras error', error);
        }
        setCommonData({
            categories,
            todayPlaces,
            weekPlaces,
            whereWeekView,
            extras,
            loading: false,
        });
    };

    useEffect(() => {
        if (data.authData?.access_token) {
            fetchData();
        }
    }, [data]);

    const actionValue: ICommonActionContext = {
        fetchData,
    };

    return <CommonDataContext.Provider value={contextValue}>
        <CommonActionContext.Provider value={actionValue}>
            {children}
        </CommonActionContext.Provider>
    </CommonDataContext.Provider>;
};

export { BacaCommon };
