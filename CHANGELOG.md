# 📝 Journal des Modifications (CHANGELOG) — NetOps Academy

Toutes les modifications notables apportées au projet sont documentées dans ce fichier.

---

## [2.6.0] — 2026-11-03

### 🌍 Internationalisation Intégrale Bilingue Français / Anglais
- **Moteur d'Internationalisation Moderne** (`i18next`, `react-i18next`, `/src/i18n/index.ts`) :
  - Support natif complet du Français (`fr`, langue par défaut) et de l'Anglais (`en`).
  - Basculement instantané sans rechargement de page (`zero page reload`) préservant le chronomètre des examens proctorisés, le bloc-notes, le terminal Cisco IOS-XE et la position des cartes SRS.
  - Persistance automatique du choix de langue dans `localStorage` (`netops_lang`) et mise à jour de `<html lang="...">`.
- **10 Espaces de Noms Modulaires Bilingues** (`/src/i18n/locales/{fr,en}/`) :
  - `common.json`, `navigation.json`, `dashboard.json`, `flashcards.json`, `exams.json`, `labs.json`, `terminal.json`, `encyclopedia.json`, `settings.json`, `errors.json`.
- **Composant Sélecteur de Langue Dédié** (`LanguageSwitcher.tsx`) :
  - 4 variantes ergonomiques (`header`, `menu`, `settings`, `compact`) intégrées dans l'en-tête, la barre latérale, le menu hamburger, les paramètres système, l'onboarding et le profil ingénieur.
- **Rigueur Technique & Données Réseau Inaltérées** :
  - Les commandes CLI exactes (`show ip interface brief`, `ping`, `ip route`, etc.) demeurent inchangées en français comme en anglais.
  - Stabilité absolue des identifiants (IDs) des 2 900+ flashcards, questions et ateliers, préservant la synchronisation Firestore et les boîtes Leitner.
  - Synthèse vocale adaptative (`utterance.lang = 'en-US'` en anglais et `'fr-FR'` en français).
  - Formatage localisé des dates et nombres avec `Intl.NumberFormat` et `Intl.DateTimeFormat`.
- **Localisation Complète des Composants & Vues** :
  - Fil d'Ariane (`Breadcrumbs.tsx`), barre latérale, palette de commandes (`Ctrl+K`), mentions légales complètes en 5 clauses, onboarding, simulateur d'examen et catalogue des certifications.

---

## [2.5.0] — 2026-11-02

### ✨ Ajouts Majeurs & Fonctionnalités Système
- **Menu Hamburger Catégorisé Multi-Niveaux** (`HamburgerMenuModal.tsx`) :
  - Regroupement des fonctionnalités par catégories : Accueil, Apprendre, Réviser, Pratiquer, Évaluer, Outils & Système.
  - Recherche et filtrage en temps réel dans le menu pour trouver un module ou une RFC.
  - Intégration sur mobile (barre inférieure et en-tête) et sur ordinateur (bouton dans l'en-tête).
- **Menu Paramètres Système & Cycle de Vie Logiciel** (`SystemSettingsModal.tsx`) :
  - Affichage de la **Date de sortie** (2 novembre 2026), de la **Date de la dernière vérification** horodatée en direct, et de la version `v2.5.0-PROD`.
  - Bouton interactif **« Vérifier les mises à jour »** avec indicateur animé.
  - Bouton **« Forcer la mise à jour »** avec purge complète des caches et réinitialisation propre du Service Worker.
- **Système de Mises à Jour Automatiques en Arrière-Plan** (`UpdateContext.tsx`) :
  - Contrôle périodique automatisé toutes les 15 minutes via `/public/version.json`.
  - Installation transparente en arrière-plan sans interruption des examens ou des labs en cours.
  - Notification non-intrusive informant l'utilisateur du déploiement de la nouvelle version.
- **Support Complet du Thème Clair** (`ThemeContext.tsx`, `index.css`) :
  - Nouveau thème clair haute lisibilité et contraste adapté aux environnements bureautiques lumineux.
  - Basculement instantané depuis l'en-tête, la barre latérale, le menu hamburger et les paramètres.
  - Mémorisation du choix utilisateur dans `localStorage`.
- **Onboarding Renforcé & Mentions Légales Dédiées** (`OnboardingModal.tsx`) :
  - Clause formelle et explicite d'**exonération de responsabilité** stipulant que l'éditeur/auteur n'est pas responsable des données, commandes et réponses fournies dans l'application.
  - Clause claire de **non-affiliation officielle** avec Cisco Systems, Palo Alto Networks, Fortinet, CompTIA, Juniper.
  - Double case d'engagement obligatoire pour finaliser l'onboarding.
- **Infobulles & Accompagnement des Utilisateurs Novices** (`Tooltip.tsx`, `FieldHelper`) :
  - Déploiement d'infobulles contextuelles explicatives sur les champs du calculateur CIDR/VLSM, les cartes du tableau de bord, les minuteurs d'examen et les boîtes Leitner des flashcards.
- **Bouton « Installer l'application » (PWA)** (`InstallAppButton.tsx`, `manifest.json`, `sw.js`) :
  - Prise en charge native de l'événement `beforeinstallprompt` pour installer l'application sur smartphone Android, iPhone/iPad (guide pas-à-pas Safari) et ordinateur de bureau (Chrome, Edge).
- **Ressources & Documentation** :
  - Intégration du logo officiel et de la capture d'écran du cockpit dans le `README.md`.
  - Création de `CONTEXT.md` et mise à jour de `CHANGELOG.md`.

---

## [2.4.0] — 2026-11-01

### 🎓 Contenu Pédagogique & Flashcards
- Ajout de 100 nouvelles Flashcards pour **Fortinet FCP FortiGate 7.4** (Domaines D1 à D4 : Système, Politiques UTM, ZTNA, VPN IPsec, Haute Disponibilité).
- Complétion à 100% de la banque de Flashcards **Palo Alto PCNSE** (600 Flashcards : Domaines D1 à D6).
- Complétion à 100% de la banque de Flashcards **Cisco CCNP Security SCOR 350-701** (600 Flashcards : Domaines D1 à D6).
- Total de fiches actives porté à **2 900+ flashcards professionnelles**.

---

## [2.3.0] — 2026-10-28

### 🧭 Navigation & Expérience Utilisateur
- Implémentation du fil d'Ariane dynamique (`Breadcrumbs.tsx`) avec retour au tableau de bord.
- Ajout du bouton de repli/déploiement de la barre latérale de bureau (mode compact 80px).
- Préservation stricte des sessions de travail dans le DOM : le simulateur d'examen et le lab terminal ne perdent plus leur état lors de la navigation entre modules.
- Intégration de la palette de commandes globale `Ctrl+K`.

---

## [2.0.0] — 2026-10-15

### 🚀 Architecture Fondatrice & Synchronisation Cloud
- Intégration de **Firebase Authentication** (Google Sign-In) et **Google Cloud Firestore**.
- Modèle de règles de sécurité ABAC Zero Trust (`firestore.rules`).
- Simulateur interactif de terminal Cisco IOS-XE avec topologie de laboratoire en temps réel.
- Moteur d'évaluation chronométré avec notation pondérée et calcul de score officiel (seuil 825/1000).
- Encyclopédie cloud et matrice d'équivalence multi-cloud AWS / Azure / GCP.
