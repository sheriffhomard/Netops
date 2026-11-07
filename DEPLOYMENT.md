# Guide de Déploiement — NetOps Academy

Ce document décrit les prérequis, la procédure d'installation, la gestion des variables d'environnement, la compilation et le déploiement en production de **NetOps Academy** (`v2.6.0-PROD`).

---

## 1. Prérequis Système

- **Runtime** : Node.js `>= 20.12.0` (recommandé LTS) ou Bun `>= 1.1.0`.
- **Gestionnaire de paquets** : `npm` (`v10+`) ou `bun`.
- **Projet Cloud** : Projet Firebase avec Cloud Firestore en mode natif et Firebase Authentication (fournisseur Google Sign-In activé).
- **Navigateurs cibles (PWA)** : Chrome `>= 110`, Edge `>= 110`, Safari `>= 16.4` (iOS/macOS), Firefox `>= 115`.

---

## 2. Variables d'Environnement

Le fichier `.env.example` liste les variables supportées. En environnement client Vite, toutes les variables exposées au navigateur doivent obligatoirement commencer par `VITE_`.

| Variable | Description | Obligatoire | Valeur par défaut / Exemple |
| :--- | :--- | :---: | :--- |
| `VITE_FIREBASE_API_KEY` | Clé d'API publique Firebase Web | Non (si applet config présent) | `AIzaSy...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Domaine d'authentification Auth | Non | `<project-id>.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Identifiant du projet Google Cloud | Oui | `ai-studio-netopsacademy-...` |
| `VITE_FIREBASE_STORAGE_BUCKET`| Bucket de stockage Cloud Storage | Non | `<project-id>.appspot.com` |
| `VITE_FIREBASE_APP_ID` | App ID client Web Firebase | Non | `1:156395491783:web:...` |

*Note de sécurité :* La configuration Firebase pour navigateur Web (`firebase-applet-config.json`) ne contient aucun secret de service. La sécurité des données est assurée par le moteur `firestore.rules`.

---

## 3. Installation et Validation Locale

```bash
# 1. Cloner le dépôt
git clone https://github.com/sheriffhomard/Netops.git
cd Netops

# 2. Installer les dépendances
npm install

# 3. Exécuter les contrôles de qualité et de bilinguisme
npm run typecheck
npm run lint
npm run test
npm run test:i18n

# 4. Lancer le serveur de développement local
npm run dev
```

Le serveur écoute par défaut sur `http://localhost:3000`.

---

## 4. Compilation de Production

```bash
# Compilation du bundle de production
npm run build
```

Le résultat est généré dans le répertoire `dist/` avec :
- Découpage optimisé des bundles (`vendor`, `lucide`, `react`, `firebase`).
- Service Worker PWA (`public/sw.js`) et manifeste W3C (`public/manifest.json`).
- Assets statiques compressés et versionnés.

---

## 5. Déploiement Firebase & Publication des Règles

### Publication des règles de sécurité Firestore
Les règles de sécurité se trouvent dans `firestore.rules`. Pour les déployer via la CLI Firebase officielle :

```bash
# Connexion Firebase
firebase login

# Sélection du projet cible
firebase use <firebase-project-id>

# Déploiement exclusif des règles Firestore
firebase deploy --only firestore:rules
```

### Déploiement de l'hébergement Web (Firebase Hosting ou Cloud Run)
```bash
firebase deploy --only hosting
```

---

## 6. Vérifications Post-Déploiement

Après déploiement, exécuter la checklist de validation :
1. **Health Check** : Ouvrir `/` et vérifier le document `/test/connection` dans la console Firestore.
2. **Authentification** : Tester une connexion Google Sign-In avec un compte vérifié.
3. **Bilinguisme** : Basculer de `FR` à `EN` via le sélecteur d'en-tête et vérifier la persistance après rafraîchissement (`localStorage.getItem('netops_lang')`).
4. **PWA** : Vérifier que le manifeste est servi avec le statut 200 sur `/manifest.json` et que le Service Worker s'enregistre sur `/sw.js`.
5. **Simulateur d'Examen** : Lancer un examen blanc de 102 questions et vérifier le décompte du chronomètre.
