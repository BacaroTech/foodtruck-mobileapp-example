import { TruckDayDTO } from './where.interfaces';

export interface TruckDTO extends UserDTO {
    truckDay: TruckDayDTO | null,
}

export interface UserDTO {
    email: string;
    phone: string;
    name: string;
}

export type ProfileView = {

} & UserDTO
export type TruckProfileView = {

} & TruckDTO
