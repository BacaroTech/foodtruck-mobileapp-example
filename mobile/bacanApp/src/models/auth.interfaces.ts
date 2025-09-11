export interface ClaimUser {
    // bacarotruck user
    tu: string;
    // role
    r: string;
}

export interface AuthResponseDTO {
    user: ClaimUser,
    access_token: string,
    expires_in: string
}
