/**
 * Qui ci sono i codici che mappano gli errori
 */

export const CODE_ALREADY_EXIST = 'CODE_ALREADY_EXIST';
export const CODE_INVALID_CREDENTIAL = 'CODE_INVALID_CREDENTIAL';
export function extractMessageError(e: any): string {
    try {
        if (!e.response) {
            return 'Errore di network';
        }
        if (e.response.data) {

            const message = e.response.data.message;

            if (message.includes(CODE_ALREADY_EXIST)) {
                return 'Esiste già un utente registrato con questi dati';
            }
            if (message.includes(CODE_INVALID_CREDENTIAL)) {
                return 'Credenziali errate';
            }

            const status = e.response.data.status;
            if (status === 401) {
                return 'Non Autorizzato';
            }
        }

    } catch (err) {
        console.log('Error extractMessageError', err);
    }
    return '';
}
