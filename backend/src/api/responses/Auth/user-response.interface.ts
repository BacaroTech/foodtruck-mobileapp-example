import { TruckDayResponseDTO } from '../Trucks';

export interface RoleResponseDTO {
    roleCode: string;
}

export interface TruckUserDTO extends UserDTO {
    truckDay: TruckDayResponseDTO
}
export interface UserDTO {
    email: string;
    phone: string;
    name: string;
}

export interface PasswordChangeResponse {
    message: string
}