import axios from 'axios';
import { enableMock } from 'src/config/env';
import { extrasMock } from 'src/mock';
import { ExtrasView } from 'src/models';
import { buildUrl } from 'src/utils/api.utils';

const useExtrasApi = () => {
    const doAsyncExtras = async () => {
        try {
            const response = await axios.get<ExtrasView[]>(
                buildUrl('/extra'),
            );
            return response.data;
        } catch (error) {
            if (enableMock) {
                return [...extrasMock];
            }
        }
        return [];
    };

    return {
        doAsyncExtras,
    };
};

export { useExtrasApi };
