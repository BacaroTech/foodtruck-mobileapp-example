import { AxiosRequestConfig } from 'axios';
import { API_URL } from 'src/config/api';
import { AuthResponseDTO } from 'src/models';

export const buildAxiosConfig = (data: AuthResponseDTO | null | undefined): AxiosRequestConfig => {
    const requestConfig: AxiosRequestConfig = { };
    if (!data) {
        return requestConfig;
    }
    requestConfig.headers = {
        'Authorization': `Bearer ${data.access_token}`,
    };

    return requestConfig;
};

export const buildUrl = (path: string): string => {
    console.log(`${API_URL}${path}`)
    return `${API_URL}${path}`;
}
