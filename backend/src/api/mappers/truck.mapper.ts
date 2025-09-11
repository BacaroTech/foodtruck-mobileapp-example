import { TruckCalendars } from '@api/models/TruckCalendars';
import {
  TruckDayResponse,
  TruckDayResponseDTO,
} from '@api/responses/Trucks/truck.interface';

import { Day } from '../models/Day';

function getDayOfWeek(input: Day):TruckDayResponse{
    if (input.customDay) {
        return {
            dayCode: input.code,
            dayOfWeek: input.customDay.getDay(),
            nameOfDay: input.name
        }
    } else if (input.holiday) {
        return {
            dayCode: input.code,
            dayOfWeek: input.holiday.getDay(),
            nameOfDay: input.name
        }
    } else {
        return {
            dayCode: input.code,
            dayOfWeek: input.dayOfWeek,
            nameOfDay: input.name
        }
    }
}
export function mapTruckCalendarToTruckDay(input: TruckCalendars): TruckDayResponseDTO {
    const response: TruckDayResponseDTO = {
        siteCode: input.site?.code || "",
        siteName: input.site?.name || "",
        siteAddress: input.site?.address || "",
        truckCode: input.truck?.code || "",
        truckName: input.truck?.name || "",
        startAt: input.start_at,
        endAt: input.end_at,
        truckPhone: input.truck?.phone || "",
        ...getDayOfWeek(input.day)
    }

    return response;

}