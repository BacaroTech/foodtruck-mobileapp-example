# BacarotruckMobileApp

**BacarotruckMobileApp [ITA]:**
BacarotruckMobileApp è un’app mobile sviluppata in React Native con backend Node.js e database PostgreSQL. L’app consente la gestione di utenti, ruoli (TRUCK e ADMIN) e la creazione di calendari tramite API.

**BacarotruckMobileApp [ENG]:**
BacarotruckMobileApp is a mobile app built with React Native, featuring a Node.js backend and PostgreSQL database. It enables user management, role configuration (TRUCK and ADMIN), and calendar creation via API.



## 📱 Mobile App

Cartella: `mobile/bacarotruckApp`

[react-native](https://reactnative.dev/)

### Avvio app

1. Entrare nella cartella dell’app:
```bash
   cd mobile/bacarotruckApp
````

2. Avviare l’app:

* **Android**

```bash
  npm run android
```

* **iOS** (scegliere il simulatore)

```bash
  npm run ios -- --simulator="iPhone SE (3rd generation)"
  npm run ios -- --simulator="iPhone 15"
```

### Prima installazione

Installare le dipendenze:

```bash
npm install
```

---

## 🔧 Backend

Cartella: `backend`
Sviluppato in **Node.js** con database **PostgreSQL**.

### Avvio backend

1. Entrare nella cartella backend:

```bash
cd backend
```

2. Avviare il database:

* Con **Docker Compose**:

```bash
docker compose -f "backend/docker-compose.yml" up -d --build
```

* Oppure installare PostgreSQL manualmente ed eseguire lo script:

```bash
psql -f init.sql
```

3. Avviare il server backend:

```bash
npm start
```

### Prima installazione

1. Installare le dipendenze:

```bash
npm install
```

2. Configurare il file `.env` copiandolo da quello di esempio:

```bash
cp .env.development .env
```

3. Avviare il database come indicato sopra e inizializzare i dati:

   * Registrare **3 utenti** (da app o da API).
   * Assegnare manualmente i ruoli `TRUCK` e `ADMIN`.
   * Con il token dell’utente `ADMIN`, creare il calendario:

```bash
POST /api/calendar/create
```

## Link and Social
- 🌳 [Link Tree Homemade](https://bacarotech.github.io/)
- 📷 [Instagram](https://www.instagram.com/bacarotechofficial/)
- 🎵 [TikTok](https://www.tiktok.com/@bacarotech)
- 🎥 [Youtube](https://www.youtube.com/@Bacarotech)
- 📫 Email: **bacarotech@gmail.com**