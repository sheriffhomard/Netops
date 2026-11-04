<p align="center">
  <img src="/logo.jpg" alt="NetOps Academy Logo" width="128" style="border-radius: 28px; box-shadow: 0 0 30px rgba(0, 229, 255, 0.45);" />
</p>

<h1 align="center">🌐 NetOps Academy — Enterprise NOC Engine</h1>

<p align="center">
  <strong>Console d'ingénierie réseau, simulateur d'examens officiels et laboratoire virtuel d'entraînement aux certifications techniques.</strong>
</p>

<p align="center">
  <strong>🇫🇷 Version Française</strong> | <a href="README.en.md"><strong>🇬🇧 English Documentation (README.en.md)</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-v2.6.0--PROD-00e5ff?style=for-the-badge&logo=fastapi&logoColor=black" alt="Version 2.6.0" />
  <img src="https://img.shields.io/badge/Langues-FR%20%F0%9F%87%AB%F0%9F%87%B7%20%7C%20EN%20%F0%9F%87%AC%F0%9F%87%A7-00daf3?style=for-the-badge&logo=google-translate&logoColor=black" alt="Bilingual FR EN" />
  <img src="https://img.shields.io/badge/PWA-Installable-4edea3?style=for-the-badge&logo=pwa&logoColor=black" alt="PWA Ready" />
  <img src="https://img.shields.io/badge/Theme-Dark%20%7C%20Light-ffd700?style=for-the-badge&logo=color-switch&logoColor=black" alt="Dark and Light Theme" />
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase Firestore" />
</p>

---

## 📸 Capture d'Écran — Cockpit & Console de Supervision NOC

<p align="center">
  <img src="/screenshot.jpg" alt="NetOps Academy Dashboard Preview" width="100%" style="border-radius: 16px; border: 1px solid #334155; box-shadow: 0 12px 35px rgba(0,0,0,0.6);" />
</p>

---

## 📑 Sommaire

- [🌟 Présentation Générale](#-présentation-générale)
- [🌍 Nouveautés v2.6.0 : Internationalisation Bilingue Intégrale (FR / EN)](#-nouveautés-v260--internationalisation-bilingue-intégrale-fr--en)
- [📱 Nouveautés v2.5.0 : Ergonomie & Mises à Jour](#-nouveautés-v250--ergonomie--mises-à-jour)
- [📦 Installation PWA 1-Clic](#-installation-pwa-1-clic)
- [✨ Architecture & Navigation Catégorisée](#-architecture--navigation-catégorisée)
- [⚖️ Cadre Légal, Non-Affiliation & Exonération](#-cadre-légal-non-affiliation--exonération)
- [💡 Infobulles & Accompagnement Contextuel](#-infobulles--accompagnement-contextuel)
- [🏆 Cursus & Certifications Pris en Charge](#-cursus--certifications-pris-en-charge)
- [🧠 Moteur Flashcards SRS & Leitner 5 Boîtes](#-moteur-flashcards-srs--leitner-5-boîtes)
- [🔬 Simulateur d'Examen & Lab Terminal IOS-XE](#-simulateur-dexamen--lab-terminal-ios-xe)
- [🛠️ Stack Technique & Déploiement](#️-stack-technique--déploiement)

---

## 🌟 Présentation Générale

**NetOps Academy** est une plateforme complète et immersive d'ingénierie et de préparation aux certifications réseau et cybersécurité de référence mondiale (**Cisco CCNA / CCNP, Palo Alto PCNSE, Fortinet FCP FortiGate, CompTIA Security+ / Network+, Juniper JNCIA-Junos**).

L'application allie deux vocations complémentaires :
1. **Console Opérationnelle NOC (Network Operations Center)** : télémétrie en direct, radar des faiblesses techniques, métriques de session et simulateur CLI interactif Cisco IOS-XE.
2. **Moteur Pédagogique Avancé** : 2 900+ flashcards haute fidélité avec algorithme de répétition espacée (SRS Leitner), simulateurs d'examens proctorisés et matrice comparative multi-cloud (AWS vs Azure vs GCP vs On-Prem).

---

## 🌍 Nouveautés v2.6.0 : Internationalisation Bilingue Intégrale (FR / EN)

NetOps Academy est désormais **entièrement bilingue** (Français 🇫🇷 et Anglais 🇬🇧) à travers l'ensemble de ses modules, sans compromis sur l'expérience technique ni sur la rigueur opérationnelle.

### 1. 🔄 Basculement Instantané Réactif (Zero-Reload)
- **Préservation intégrale des états de travail** : Changer de langue ne recharge pas la page et n'interrompt jamais :
  - Le chronomètre d'examen officiel et les réponses cochées.
  - Le bloc-notes d'examen (scratchpad).
  - La session CLI interactive du terminal Cisco IOS-XE.
  - La position actuelle dans la pile de flashcards SRS Leitner.
- **Sélecteur de langue unifié** (`LanguageSwitcher.tsx`) :
  - Accessible directement dans la barre d'en-tête supérieure (Header).
  - Accessible dans la barre latérale rétractable (Sidebar).
  - Accessible dans le menu hamburger catégorisé (HamburgerMenu).
  - Accessible dans les paramètres système (SystemSettings) et la gestion de profil ingénieur.
- **Persistance locale** : Choix mémorisé dans `localStorage` (`netops_lang`) avec synchronisation automatique de `<html lang="...">`.

### 2. 📚 Architecture des Espaces de Noms i18n
Le système repose sur `i18next` et `react-i18next` avec 10 dictionnaires modulaires distincts par langue (`/src/i18n/locales/{fr,en}/`) :
- `common.json` : Actions universelles, statuts, niveaux de certification, métriques d'unités, thèmes et PWA.
- `navigation.json` : Catégories hiérarchiques, labels de modules, descriptions et fil d'Ariane.
- `dashboard.json` : Métriques de session, radar de faiblesse, boîtes Leitner et défi Chrono Blitz.
- `flashcards.json` : Modes d'étude 3D, filtres de maîtrise, lecteur audio TTS et algorithme d'espacement.
- `exams.json` : Proctorat, chronomètre, validation de questions et diagnostic de score officiel.
- `labs.json` : Validation syntaxique, étapes séquentielles et console de dépannage.
- `terminal.json` : Invites de commande, statuts de session et aides d'auto-complétion TAB.
- `encyclopedia.json` : Topologies hybrides, schémas ASCII et comparatif multi-cloud.
- `settings.json` : Paramètres système, mentions légales en 5 clauses et calculateur CIDR/VLSM.
- `errors.json` : Diagnostic réseau et codes d'erreur RFC.

### 3. 🎯 Précision Opérationnelle & Données Techniques
- **Commandes CLI inchangées** : Les syntaxes exactes Cisco IOS-XE (`show ip interface brief`, `ip route 0.0.0.0 0.0.0.0`, `ping`), Palo Alto PAN-OS et Fortinet FortiOS restent strictement conformes aux normes industrielles dans les deux langues.
- **Stabilité absolue des identifiants (IDs)** : Les identifiants des 2 900+ flashcards, des questions et des topologies restent immuables pour garantir l'intégrité de la persistance Firestore et de l'algorithme Leitner.
- **Formatage localisé des nombres et dates** : Utilisation systématique de `Intl.NumberFormat` et `Intl.DateTimeFormat` (`fr-FR` et `en-US`).
- **Synthèse Vocale Adaptative (TTS)** : L'énonciation audio des flashcards configure automatiquement `utterance.lang = 'en-US'` en anglais et `'fr-FR'` en français.

---

## 📱 Nouveautés v2.5.0 : Ergonomie & Mises à Jour

### 1. 🍔 Menu Hamburger Catégorisé Multi-Niveaux
- Accessible sur **ordinateur**, **tablette** et **mobile**.
- Regroupement logique des modules par intention d'apprentissage :
  - 🏠 **Accueil & Cockpit** : Tableau de bord et métriques de readiness.
  - 🎓 **Apprendre & Se Former** : Parcours certifiants et Encyclopédie Cloud.
  - 📑 **Réviser & Mémoriser** : Flashcards Leitner et Banque de Questions blueprint.
  - 🛠️ **Pratiquer & Ingénierie** : Ateliers de saisie exacte et Terminal virtuel Cisco IOS-XE.
  - 📊 **Évaluer & Mesurer** : Simulateur d'examen chronométré et Radar de progression.
  - ⚙️ **Outils & Système** : Calculateur CIDR/VLSM, Paramètres système, Thème clair/sombre, PWA.
- Barre de filtre instantanée intégrée dans le tiroir de navigation.

### 2. ⚙️ Menu Paramètres Système & Mises à Jour en Arrière-Plan
- **Informations système complètes** :
  - 📅 **Date de sortie officielle** : 2 novembre 2026.
  - 🕒 **Date de la dernière vérification** : Horodatage précis en français (ex : *2 nov. 2026 à 18:45:10*).
  - 🏷️ **Version active** : `v2.5.0-PROD (Enterprise NOC)`.
- **Bouton « Vérifier les mises à jour »** : Déclenche un contrôle immédiat auprès du serveur d'assets et rafraîchit la date de contrôle.
- **Bouton « Forcer la mise à jour »** : Purge l'ensemble des caches Service Worker / CacheStorage et actualise l'application sans données résiduelles.
- **Système de mises à jour automatiques en arrière-plan** : Un service périodique interroge le manifest de version toutes les 15 minutes. Dès qu'un nouveau build est détecté, les assets sont mis en cache silencieusement en arrière-plan et l'utilisateur est notifié sans coupure de session.

### 3. ☀️ Thème Clair Haute Visibilité & 🌙 Mode Sombre NOC
- Basculement instantané 1-clic via le bouton d'en-tête, le menu hamburger ou les paramètres.
- Persistance locale du choix utilisateur dans `localStorage` (`netops_theme`).
- Palette optimisée :
  - **Mode Sombre** : Fond cyber NOC profond `#0f131c` avec contrastes cyan `#00daf3`.
  - **Mode Clair** : Fond papier/ardoise net `#f8fafc` / `#ffffff` avec typographie `#0f172a` et bordures douces `#cbd5e1`.

---

## 📦 Installation PWA 1-Clic

Grâce au support **Progressive Web App (PWA)** natif :
- 📲 **Sur Mobile (Android / iOS)** : Ajoutez l'application sur l'écran d'accueil pour une expérience plein écran sans barre d'URL.
- 💻 **Sur Ordinateur (Chrome / Edge / Safari / Arc)** : Installez NetOps Academy comme application de bureau native avec icône dans la barre des tâches et démarrage instantané hors-ligne.
- 🚀 **Bouton Dédié « Installer l'application »** disponible dans la barre supérieure, le menu hamburger, la barre latérale et les paramètres système.

---

## ⚖️ Cadre Légal, Non-Affiliation & Exonération

NetOps Academy intègre un module d'onboarding obligatoire garantissant une totale clarté juridique :

1. **Absence d'affiliation officielle** : NetOps Academy est une création indépendante n'ayant aucun lien, agrément, sponsor ni affiliation avec **Cisco Systems, Inc.**, **Palo Alto Networks, Inc.**, **Fortinet, Inc.**, **CompTIA** ou **Juniper Networks**.
2. **Propriété intellectuelle & Fair Use** : Toutes les marques et dénominations d'examens (200-301 CCNA, 350-401 ENCOR, 350-701 SCOR, PCNSE, FortiGate 7.4) appartiennent à leurs propriétaires respectifs et sont mentionnées uniquement à titre descriptif pédagogique.
3. **Exonération totale de responsabilité quant aux données** : L'auteur et l'application déclinent expressément toute responsabilité relative à l'exactitude, l'exhaustivité ou l'utilisation opérationnelle des configurations, topologies, commandes CLI ou questions fournies. Celles-ci sont fournies « en l'état » à des fins d'entraînement personnel.

---

## 💡 Infobulles & Accompagnement Contextuel

Pour faciliter la prise en main par les **utilisateurs novices**, chaque écran et chaque champ technique disposent d'infobulles explicatives (`<Tooltip>` et `<FieldHelper>`) :
- **Calculateur CIDR / VLSM** : Définition pédagogique du masque réseau, du masque inversé (wildcard pour ACL/OSPF), de l'adresse réseau et du broadcast.
- **Simulateur d'examen** : Explication du barème officiel (seuil 825/1000), du marquage des questions et du bloc-notes d'examen.
- **Flashcards** : Explication des boîtes de répétition espacée Leitner (intervalles 10 min, 1 jour, 4 jours).
- **Terminal interactif** : Rôles des équipements (Routeur sub-interfaces, Switch trunk 802.1Q, hôtes VLAN).

---

## 🏆 Cursus & Certifications Pris en Charge

| Certification | Éditeur | Code Examen | Nombre de Flashcards | Domaines Bleusprints |
| :--- | :---: | :---: | :---: | :--- |
| **Cisco CCNA** | Cisco | 200-301 | **600 Flashcards** | D1 à D6 (Réseau, Accès, Routage, Services, Sécurité, Auto) |
| **Cisco CCNP Enterprise Core** | Cisco | 350-401 ENCOR | **600 Flashcards** | D1 à D6 (Architecture, SD-Access, Routage, Assurance, Sécurité, NetDevOps) |
| **Cisco CCNP Enterprise Routing** | Cisco | 300-410 ENARSI | **400 Flashcards** | D1 à D4 (L3 Avancé, VPN/DMVPN, Sécurité, Services) |
| **Cisco CCNP Security Core** | Cisco | 350-701 SCOR | **600 Flashcards** | D1 à D6 (Concepts, Firewalls/VPN, Cloud, Content, EDR, ISE) |
| **Palo Alto PCNSE** | Palo Alto | PAN-OS 11.x | **600 Flashcards** | D1 à D6 (Architecture SP3, Composants, Politiques, GlobalProtect, Tshoot, Panorama) |
| **Fortinet FCP FortiGate** | Fortinet | FortiOS 7.4 | **100 Flashcards** | D1 à D4 (Système, Politiques UTM, VPN IPsec/ZTNA, HA) |
| **CompTIA Security+ / Net+** | CompTIA | SY0-701 / N10-008 | Mémos ciblés | Authentification SAML/OIDC, Modèle OSI, Protocoles |
| **Juniper JNCIA-Junos** | Juniper | JN0-104 | Mémos ciblés | Architecture RE vs PFE, CLI syntaxe commit confirmed |

---

## 🛠️ Stack Technique & Déploiement

- **Frontend** : React 19, TypeScript 5.8, Vite 6.2, Tailwind CSS v4.
- **Persistance & Données** : Firebase Firestore SDK v12, Firebase Authentication.
- **PWA** : Web App Manifest, Service Worker avec stratégie Cache-First / Network-First.
- **Audio & Animations** : Web Speech API (TTS), Canvas-Confetti, Material Symbols.

---

<p align="center">
  <strong>NetOps Academy — Développé pour l'excellence opérationnelle réseau & cybersécurité.</strong>
</p>
