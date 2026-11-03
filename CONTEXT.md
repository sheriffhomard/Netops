# 📐 Architecture & Contexte Technique — NetOps Academy

## 1. Vision & Double Vocation

NetOps Academy est construite autour de deux axes interconnectés mais strictement délimités pour garantir clarté et efficacité :

1. **Cockpit NOC (Network Operations Center)** :
   - Écran de pilotage en direct de la préparation (`/tableau-de-bord`).
   - Radar visuel des domaines de faiblesse technique (BGP, IPsec, VXLAN, Zero Trust).
   - Métriques d'endurance : Streak quotidien, temps de session en direct, readiness score global (84.5%).
   - Accès rapide aux outils de diagnostic : Calculatrice de sous-réseaux CIDR / VLSM, terminal Cisco IOS-XE.

2. **Moteur Pédagogique & d'Évaluation (Academy)** :
   - Parcours complets de certifications (**Cisco CCNA, CCNP ENCOR, CCNP ENARSI, CCNP SCOR, Palo Alto PCNSE, Fortinet FCP FortiGate, CompTIA, Juniper**).
   - **2 900+ fiches de révision actives** synchronisées avec les blueprints officiels.
   - Algorithme de répétition espacée (SRS) basé sur les **5 boîtes de Leitner**.
   - Simulateur d'examen officiel chronométré avec surveillance proctorisée et seuil à 825/1000 points.
   - Encyclopédie multi-cloud comparative (AWS Direct Connect, Azure ExpressRoute, GCP Cloud Interconnect).

---

## 2. Système de Navigation & Composants Majeurs

L'arborescence est désormais catégorisée et accessible par trois points d'entrée unifiés :

- **Barre Latérale Rétractable (Sidebar Desktop)** :
  - Mode développé (largeur 288px) et mode replié iconique (largeur 80px) pour libérer l'espace sur terminal et examens.
  - Catégorisation hiérarchique : Accueil, Apprendre, Réviser, Pratiquer, Évaluer, Utilitaires.
- **Menu Hamburger Catégorisé (HamburgerMenuModal)** :
  - Modal/tiroir plein écran accessible sur mobile (via le bouton Menu du bas et l'en-tête) ainsi que sur desktop via le bouton de l'en-tête.
  - Recherche instantanée par mots-clés (RFC, CLI, domaine).
  - Accès direct au Calculateur CIDR, Paramètres Système, Thèmes et installation PWA.
- **Barre Inférieure Mobile (MobileBottomNav)** :
  - Ergonomie tactile pouce avec accès direct Accueil, Flashcards, Examens, Labs et tiroir complet Menu.

---

## 3. Mises à Jour Automatiques & Gestion des Versions

Le système de cycle de vie logiciel est orchestré par `src/context/UpdateContext.tsx` et `/public/version.json` :

- **Métadonnées Système** :
  - `releaseDate` : 2 novembre 2026.
  - `version` : 2.5.0-PROD.
  - `lastCheckedDate` : Horodatage dynamique français mémorisé dans le stockage local.
- **Mises à Jour en Arrière-Plan (Background Worker)** :
  - Intervalle périodique toutes les 15 minutes vérifiant la disponibilité d'une nouvelle version sans perturber un examen ou une session de terminal active.
  - Cache purge et rafraîchissement transparent des assets statiques via `sw.js`.
- **Commandes Manuelles** :
  - « Vérifier les mises à jour » : interrogation immédiate et confirmation visuelle.
  - « Forcer la mise à jour » : purge des caches `CacheStorage`, `skipWaiting` sur le Service Worker et actualisation propre.

---

## 4. Gestion du Thème & Accessibilité

- `src/context/ThemeContext.tsx` gère l'état `'dark' | 'light'`.
- Synchronisation avec la classe `.dark` / `.light` sur la balise racine `<html>` et la balise `<meta name="theme-color">`.
- Préservation de la sélection dans `localStorage.getItem('netops_theme')`.
- Mode Sombre NOC : palette cyber sombre `#0f131c`, contrastes `#00daf3` et `#00e5ff`.
- Mode Clair : palette haute lisibilité `#f8fafc`, cartes `#ffffff`, bordures `#cbd5e1`, texte `#0f172a`.

---

## 5. Cadre Légal & Décharge de Responsabilité

- **Modal d'Onboarding** : affichée automatiquement à la première visite et réouvrable à tout moment.
- **Clauses juridiques explicites** :
  - Non-affiliation stricte avec Cisco Systems, Palo Alto Networks, Fortinet, CompTIA, Juniper.
  - Usage nominatif loyal des marques (Nominative Fair Use).
  - Politique Anti-Dump : questions et flashcards rédigées originalement à partir des standards RFC publics.
  - **Clause formelle d'exonération de responsabilité** : l'auteur décline toute responsabilité quant à l'exactitude des données techniques, commandes CLI ou questions fournies.

---

## 6. Persistance des Données & Firestore

- **Firebase Authentication** : Google Sign-In avec profil utilisateur (nom, avatar, rôle).
- **Google Cloud Firestore** :
  - `/users/{userId}` : profil utilisateur, streak, examen cible, précision globale.
  - `/users/{userId}/flashcards` : flashcards personnalisées rédigées par l'utilisateur.
  - `/users/{userId}/exam_results` : historique des examens blancs avec scores et date.
- **Règles de sécurité Firestore (firestore.rules)** :
  - Modèle ABAC Zero Trust limitant la lecture et l'écriture strictement aux données du propriétaire authentifié (`request.auth.uid == userId`).
