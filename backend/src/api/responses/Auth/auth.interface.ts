import { ClaimUser } from './ClaimUser';

export interface AuthResponseDTO  {
    "user": ClaimUser,
    "access_token": string,
    "expires_in": string
}