import { decode } from 'js-base64';

export const decodeJwt = (jwt?: string) => {
    if(!jwt)
        return;
    const payloadEncoded = jwt.split('.')[1];
    try {
        const payloadDecoded = decode(payloadEncoded);
        return JSON.parse(payloadDecoded);

    } catch (error) {

        console.error('Error decode jwt', error);
    }
    return null;
};
