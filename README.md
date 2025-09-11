# BacarotruckMobileApp
Mobile App for Bacarotruck

# Mobile
App mobile in react-native [react-native](https://reactnative.dev/)

## Passi da seguire per avvio app
1. entrare nella cartella bacarotruckMobile
```
cd mobile/bacarotruckApp
```
2. avviare l'app 

per android:
```
npm run android
```
per ios: 
- ```npm run ios -- --simulator="iPhone SE (3rd generation)"```
- ```npm run ios -- --simulator="iPhone 15"```

## Prima installazione app
installare le dipendenze
```
npm install
```

# Backend
Backend node [node](https://nodejs.org/en)

## Passi da seguire per avvio

1. entrare nella cartella backend
```
cd backend
```

2. database

avvio docker compose
```
docker compose -f "backend\docker-compose.yml" up -d --build 
```

o installare il database postgres e avviare lo script init.sql

3. avvio del backend
```
npm start
```
## Prima installazione
installare le dipendenze
```
npm install
```
configurare il file di env (copiando dal .env.development di esempio)
```
cp .env.development .env
```

avviare docker compose o il database postgres e avviare lo script init.sql. Registrare 3 utenti da app o da api e configurare a mano i ruoli TRUCK e ADMIN.
Con il token dell'utente ADMIN generare il calendario con l'api 
```
POST /api/calendar/create
```
