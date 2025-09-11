import {
  StateOrderCode,
  StatusCartView,
} from 'src/models';

export const mapStatus = (stateOrderCode?: StateOrderCode): StatusCartView => {

    if (!stateOrderCode) {
        return 'vuoto';
    }
    if (stateOrderCode === 'CART') {
        return 'aggiunta';
    }
    if (stateOrderCode === 'SEND') {
        return 'attesa';
    }
    if (stateOrderCode === 'ACCEPTED') {
        return 'accettato';
    }
    if (stateOrderCode === 'TRADE') {
        return 'trattativa';
    }
    if (stateOrderCode === 'REJECT') {
        return 'rifiutato';
    }
    if (stateOrderCode === 'PICKEDUP') {
        return 'ritirato';
    }
    return 'vuoto';
};

export const mapDescriptionStatus = (stateOrderCode: StatusCartView): string => {

    switch (stateOrderCode) {
        case 'attesa':
            return 'Hola cicho abbiamo ricevuto correttamente il tuo ordine per la piazza';

        case 'accettato':
            return 'Hola cicho il tuo ordine è stato confermato!';
        case 'rifiutato':
            return 'Hola cicho ci dispiace ma abbiamo dovuto rifiutare il tuo ordine';
        case 'trattativa':
            return 'Hola cicho abbiamo spostato il tuo ordine per';
        case 'vuoto':
            return 'Hola cicho non hai ordini nel carrello.';
        case 'aggiunta':
            return 'Hola cicho hai un ordine in corso, aggiungi i prodotti e invia';
        default:
            return 'Hola cicho non hai ordini nel carrello.';

    }
};

export const mapTitle = (stateOrderCode: StatusCartView): string => {

    switch (stateOrderCode) {
        case 'attesa':
            return 'In attesa';

        case 'accettato':
            return 'Confermato';
        case 'rifiutato':
            return 'Cancellato';
        case 'trattativa':
            return 'Trattativa';
        case 'vuoto':
            return 'Carrello vuoto';
        case 'aggiunta':
            return 'Ordine in creazione';
        default:
            return 'Carrello vuoto';

    }
};

export const mapStatusToState = (_status: StatusCartView): StateOrderCode | undefined  => {
    switch (_status) {
        case 'accettato':

            return 'ACCEPTED';
        case 'rifiutato':
            return 'REJECT';
        case 'aggiunta':
            return 'CART';
        case 'attesa':
            return 'SEND';
        case 'trattativa':
            return 'TRADE';
        default:
            return;
    }
};
