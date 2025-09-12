# BacarotruckMobileApp

[ITA]
***Mobile App for Bacarotruck** 
è l'applicazione ufficiale sviluppata per supportare il progetto *Bacarotruck*.  
L’app nasce con l’obiettivo di offrire agli utenti un’esperienza semplice e intuitiva, permettendo loro di interagire con i servizi del Bacarotruck direttamente dal proprio smartphone. 

BacarotruckMobileApp è un’app mobile sviluppata in 
- React Native *Compatibilità multipiattaforma* (iOS e Android) 
- Backend Node.js e database PostgreSQL questo ci ha permesso di creare un servizio API snello ma robusto
- L’app consente la gestione di utenti, ruoli (TRUCK e ADMIN) e la creazione di calendari tramite API.

---

## ✨ Caratteristiche Principali
- 📍 Accesso rapido alle funzionalità del Bacarotruck
- 📲 Interfaccia semplice, intuitiva e responsive
- 🔔 Notifiche in tempo reale

---

---

## ⚙️ Stack Tecnologico
- *React Native* → framework per lo sviluppo mobile multipiattaforma  
- *JavaScript/TypeScript* → linguaggio di sviluppo  
- *API REST* → integrazione con il backend del Bacarotruck  

---

## 🚀 Installazione e Avvio

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

## 📬 Contatti
- 🌳 [Link Tree Homemade](https://bacarotech.github.io/)
- 📷 [Instagram](https://www.instagram.com/bacarotechofficial/)
- 🎵 [TikTok](https://www.tiktok.com/@bacarotech)
- 🎥 [Youtube](https://www.youtube.com/@Bacarotech)
- 📫 Email: **bacarotech@gmail.com**

## 🤝 Contributi

Se vuoi contribuire al progetto, sentiti libero di aprire una issue o inviare una pull request.

[ENG]
**Mobile App for Bacarotruck** is the official application developed to support the **Bacarotruck** project.

The app was created with the goal of providing users with a simple and intuitive experience, allowing them to interact with Bacarotruck's services directly from their smartphone.

The **BacarotruckMobileApp** is a mobile application developed with:

  * **React Native** for cross-platform compatibility (iOS and Android).
  * A **Node.js backend** and a **PostgreSQL database**, which allowed us to create a lean but robust API service.
  * The app enables the management of users, roles (TRUCK and ADMIN), and the creation of calendars via API.

-----

## ✨ Key Features

  * 📍 Quick access to Bacarotruck's features
  * 📲 Simple, intuitive, and responsive interface
  * 🔔 Real-time notifications

-----

## ⚙️ Tech Stack

  * **React Native**: A framework for cross-platform mobile development.
  * **JavaScript/TypeScript**: The development language.
  * **REST API**: Integration with the Bacarotruck backend.

-----

## 🚀 Installation and Startup

Folder: `mobile/bacarotruckApp`

[react-native](https://reactnative.dev/)

### Start the App

1.  Navigate to the app folder:

<!-- end list -->

```bash
   cd mobile/bacarotruckApp
```

2.  Start the app:

<!-- end list -->

  * **Android**

<!-- end list -->

```bash
  npm run android
```

  * **iOS** (select your simulator)

<!-- end list -->

```bash
  npm run ios -- --simulator="iPhone SE (3rd generation)"
  npm run ios -- --simulator="iPhone 15"
```

### First-time Installation

Install dependencies:

```bash
npm install
```

-----

## 🔧 Backend

Folder: `backend`
Developed with **Node.js** and a **PostgreSQL** database.

### Start the Backend

1.  Navigate to the backend folder:

<!-- end list -->

```bash
cd backend
```

2.  Start the database:

<!-- end list -->

  * With **Docker Compose**:

<!-- end list -->

```bash
docker compose -f "backend/docker-compose.yml" up -d --build
```

  * Or, manually install PostgreSQL and run the script:

<!-- end list -->

```bash
psql -f init.sql
```

3.  Start the backend server:

<!-- end list -->

```bash
npm start
```

### First-time Installation

1.  Install dependencies:

<!-- end list -->

```bash
npm install
```

2.  Configure the `.env` file by copying the example:

<!-- end list -->

```bash
cp .env.development .env
```

3.  Start the database as instructed above and initialize the data:

<!-- end list -->

  * Register **3 users** (from the app or via API).
  * Manually assign `TRUCK` and `ADMIN` roles.
  * With the `ADMIN` user's token, create the calendar:

<!-- end list -->

```bash
POST /api/calendar/create
```

## 📬 Contacts

  * 🌳 [Link Tree Homemade](https://bacarotech.github.io/)
  * 📷 [Instagram](https://www.instagram.com/bacarotechofficial/)
  * 🎵 [TikTok](https://www.tiktok.com/@bacarotech)
  * 🎥 [Youtube](https://www.youtube.com/@Bacarotech)
  * 📫 Email: **bacarotech@gmail.com**

## 🤝 Contributions

If you'd like to contribute to the project, feel free to open an issue or submit a pull request.