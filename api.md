# ALTRO

<b>Context:</b>
/api/v1/bacarotruck/

## Cliente

## Login

Serve per fare la login
 - [x] A completed

Path: /login

Metodo: POST

Accessibilità: private


## Registrazione
Serve per fare la registrazione
- [x] A completed

Path: /registration

Metodo: POST 

Visibilità: private

## Cambio Password 

Serve per cambiare la password

- [ ] A completed

Path: /passwordReset

Metodo: POST

Visibiità: private

## Dove ci trovi

<b>Dove ci trovi oggi</b>

Serve per ottenere i posti dove sono i track oggi
- [x] A completed
    - [x] Controller
    - [x] Service

Path: /where/now

Metodo: GET

Visibilità: public

```json
    {
        "siteCode": "SITE_1",
        "siteName": "Camposampiero",
        "truckCode": "TRUCK_1",
        "truckName": "Taco Magico",
        "startAt": "19:00:00",
        "endAt": "20:00:00",
        "dayOfWeek": 0,
        "nameOfDay": "sunday"
    },
```

<b>Orari e luoghi del weekend</b>

Serve per ottenere gli orari e i luoghi della settimana
- [x] A completed
    - [x] Controller
    - [x] Service
Path: /whereWeek
Metodo: GET
public

```json
    {
        "siteCode": "SITE_1",
        "siteName": "Camposampiero",
        "truckCode": "TRUCK_1",
        "truckName": "Taco Magico",
        "startAt": "19:00:00",
        "endAt": "20:00:00",
        "dayOfWeek": 0,
        "nameOfDay": "sunday"
    },
```


### Piatti e prodotti

<b>Tutte le Categorie di piatti</b>
Serve per ottenere le categorie

- [x] A completed
    - [x] Controller
    - [x] Service
Path: /categories
Metodo: GET

public

Ordinato per il pdf del sito

<b>Lista di piatti per categoria</b>

Path: /dishes/category/{idCateogrie}

Serve per ottenere la lista dei piatti e prodotti

- [x] A completed
    - [x] Controller
    - [x] Service

Metodo: GET

public

```json
{
    id: number;
    code: string;
    name: string;
    description?: string;
    note?: string;
    price?: number;
    tags?: TagDTO[];
}
```

<b>Lista di tutti i Piatti</b>

Serve per ottenere la lista dei piatti e prodotti

- [x] A completed
    - [x] Controller
    - [x] Service

Path: /dishes

Metodo: GET

public

## Carrello

<b>Dettaglio Ultimo Ordine</b>

Serve per sapere i dettagli dell'ordine e lo stato dell'ordine

- [ ] A completed
    - [x] Controller
    - [ ] Service

Path: /order/last

Metodo: GET

Visibilità: private
```json
{
    id: number;
    statusCode: string;
    statusName: string
}
```


<b>Dettaglio Ordine</b>

Serve per sapere i dettagli dell'ordine e lo stato dell'ordine

- [ ] A completed
    - [x] Controller
    - [ ] Service

Path: /order/{id}

Metodo: GET

Visibilità: private

<b>Lista Ordini</b>

Serve per ottenere la lista degli ordini del giorno

- [ ] A completed
    - [x] Controller
    - [ ] Service

Path: /order/all

Metodo: GET

private

<b>Modifica e Salva Ordine</b>

Serve per creare l'ordine non confermato

- [ ] A completed
    - [x] Controller
    - [ ] Service

Path: /orders/cart

Metodo: POST

Serve per modificare l'ordine non confermato

- [ ] A completed
    - [x] Controller
    - [ ] Service

Path: /order/cart/{id}

Metodo: PUT

private
<b>Dettaglio Ordine Salvato non inviato</b>

Serve per sapere i dettagli dell'ordine non ancora inviato (Carrello)

- [ ] A completed
    - [x] Controller
    - [ ] Service

Path: /order/cart/{id}

Metodo: GET

Visibilità: private

<b>Conferma Ordine</b>

Serve per confermare l'ordine, dopo non si può più modificare

- [ ] A completed
    - [x] Controller
    - [ ] Service

Path: /order/send/{id}

Metodo: PUT

private


<b>Trattativa Carrello by Utente</b>
Serve per la trattativa da parte dell'utente

- [ ] A completed
    - [] Controller
    - [ ] Service

Path: /order/{id}/trade

Metodo: PUT

private

Request:

```json
{
    id: number;
    status: string;
    note?: string;
}
```

response: "CONFRIM" | "DENIED" ( | "TRATTATIVA_IN_CORSO")




## Track
### Login
- [ ] A completed
Serve per fare la login
/login
POST
private
### Registrazione
la registrazione si può fare solo sulla dashboard di keycloak per motivi di sicurezza
### Cambio Password 
Serve per cambiare la password
- [ ] A completed
/passwordReset
POST
private

#### Ordini del giorno
nel token ci sarà l'id dell'utente e una claim per sapere se è un utente di tipo track

Serve per ottenere la lista di TUTTI gli ordini del giorno di quel track
- [ ] A completed
/truck/{truck-id}/order/now
GET
private

Serve per sapere lo stato dell'ordine
- [ ] A completed
/truck/{truck-id}/order/{id}
GET
private

Serve per accettare/negare/posticipare
- [ ] A completed
Path: /truck/{truck-id}/order/{id}/trade
```json
{
    id: number;
    status: string;
    note?: string;
}
```

status: "CONFRIM" | "DENIED" ( | "TRATTATIVA_IN_CORSO")




# Altro

2. avviare l'emulatore/simulatore o collegare il dispositivo. Si può verificare che il device sia collegato con il comando adb. 
```
adb shell
```
adb deve essere configurato nelle variabili d'ambiente
3. collegamento: adb reverse tcp:3000 tcp:3000
4. per ios: 
    - npm run ios -- --simulator="iPhone SE (3rd generation)"
    - npm run ios -- --simulator="iPhone 15"

    ./gradlew assembleRelease

keytool -genkey -v -keystore bacarotruck_app.keystore -alias bacarotruck_app -keyalg RSA -keysize 2048 -validity 10000

apksigner sign --ks bacarotruck_app.keystore --ks-key-alias bacarotruck_app --out /Users/michelescarpa/Bacaro/BacarotruckMobileApp/mobile/bacarotruckApp/android/app/build/outputs/apk/release/signed-app-release.apk /Users/michelescarpa/Bacaro/BacarotruckMobileApp/mobile/bacarotruckApp/android/app/build/outputs/apk/release/app-release.apk

find ~/Library/Android/sdk -name apksigner

/Users/michelescarpa/Library/Android/sdk/build-tools/27.0.3/apksigner sign --ks bacarotruck_app.keystore --ks-key-alias bacarotruck_app --out signed-app-release.apk app-release.apk

$ java -jar pepk.jar --keystore=bacarotruck_app.keystore --alias=bacarotruck_app --output=output.zip --include-cert --rsa-aes-encryption --encryption-key-path=encryption_public_key.pem