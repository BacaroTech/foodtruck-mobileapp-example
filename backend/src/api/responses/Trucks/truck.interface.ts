import { BaseDTO } from '@base/infrastructure/interfaces/base.interface';

export interface TruckDTO extends BaseDTO {
}
export interface TruckDayResponse {
    dayCode: string,
    dayOfWeek: number, 
    nameOfDay?: string
}
export interface TruckDayResponseDTO extends TruckDayResponse{
    siteCode: string;
    siteName: string;
    siteAddress: string;
    truckCode: string;
    truckName: string;
    startAt: string;
    endAt: string;
    truckPhone: string;
}