// const topology =
//     {
//         status: 'aggiunta',
//         title: 'In attesa',
//         description: 'Hola cicho abbiamo ricevuto correttamente il tuo ordine.\n\nRimani in attesa che ti daremo risposta il prima possibile!',
//         place: 'Montebelluna',
//         oldHour: '20:00',
//         newHour: '20:30',
//     }
// );
// export interface TruckDTO {
//     cell?: string;
//     id?: number;
// }
export type StatusCartView =
    | 'vuoto'
    | 'aggiunta'
    | 'attesa'
    | 'accettato'
    | 'rifiutato'
    | 'ritirato'
    | 'trattativa';

/**
 * status
 * vuoto -> nessun prodotto aggiunto al carrello
 * aggiunta -> prodotto aggiunto al carrello
 * attesa -> attesa che il truck dia l'ok
 * accettato -> il truck ha accettato l'ordine
 * rifiutato -> il truck ha rifiutato l'ordine
 * trattativa -> il truck ha proposto una trattativa sull'orario
 */

export interface TopologyView {
    status: StatusCartView;
    statusCode?: string;
    title?: string;
    description?: string;
    place?: string;
    oldHour?: string;
    newHouer?: string;
    truckPhone?: string;
    address?: string
}

// const places =
//   {
//     day: "lunedì",
//     where: "chiuso"
//   },
//   {
//     day: "martedì",
//     where: "san vito di altivole\n18:15 - 20:45\ncastelfranco\n18:15 - 20:45"
//   }
// ])
export interface PlaceView {
    address: string;
    rangeTime: string;
}
export interface WhereWeekView {
    day: string;
    where: PlaceView[]
}
