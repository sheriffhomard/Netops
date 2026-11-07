# Manuel d'Exploitation & Suivi Opérationnel (Runbook) — NetOps Academy

Ce document fournit les procédures d'exploitation, de surveillance, de gestion des incidents et de retour arrière (rollback) pour **NetOps Academy**.

---

## 1. Surveillance & Métriques Clés (SLI / SLO)

### Indicateurs de Performance et de Santé
- **Disponibilité de l'application** : Cible SLO de `99.9%` de disponibilité mensuelle.
- **Latence de chargement initial (LCP)** : Cible `< 2.0s` sur réseau haut-débit et `< 3.5s` sur réseau mobile 4G.
- **Taux de succès des écritures Firestore** : Cible `> 99.95%` de requêtes d'enregistrement de résultats sans erreur de permissions.
- **Santé PWA** : Cache Service Worker à jour (`netops-v2.6.0`), vérification régulière de `version.json`.

---

## 2. Diagnostics des Erreurs Fréquentes

| Symptôme / Code Erreur | Cause Probable | Procédure de Résolution |
| :--- | :--- | :--- |
| `Missing or insufficient permissions` (Firestore) | L'utilisateur n'est pas connecté, son email n'est pas vérifié, ou il tente d'écrire hors de son `userId`. | Vérifier que l'utilisateur est authentifié avec Google et que `user.emailVerified === true`. Consulter les logs `handleFirestoreError`. |
| `Quota exceeded` (Firestore Free Tier) | Le quota journalier de lectures/écritures gratuites Spark a été dépassé. | Vérifier la console Firebase. Le quota se réinitialise à minuit UTC. Envisager le passage au plan Blaze si la volumétrie l'exige. |
| Décalage de version / Écran figé sur ancienne version | Ancien Service Worker en cache dans le navigateur. | Utiliser le bouton « Forcer la mise à jour » dans le menu Paramètres Système, qui purge `caches.delete()` et réenregistre le Service Worker. |
| Échec d'installation PWA sur iOS | Safari iOS ne supporte pas `beforeinstallprompt`. | Guider l'utilisateur vers le bouton « Partager » puis « Sur l'écran d'accueil » (instructions intégrées dans `InstallInstructionModal`). |

---

## 3. Procédure de Retour Arrière (Rollback)

En cas de régression majeure sur une nouvelle version en production :

1. **Rollback de l'hébergement Hosting** :
   ```bash
   # Lister les versions déployées
   firebase hosting:releases:list
   
   # Cloner/rebasculer sur la précédente version stable
   firebase hosting:clone <site-name>:<previous-version> <site-name>:live
   ```
2. **Rollback des règles Firestore (si impacté)** :
   ```bash
   git checkout tags/v2.5.0 -- firestore.rules
   firebase deploy --only firestore:rules
   ```
3. **Incrément de cache PWA** :
   Mettre à jour `public/sw.js` pour forcer les clients connectés à vider leur cache corrompu et recharger les assets intègres.

---

## 4. Gestion des Incidents P1 / P0

1. **Détection** : Alerte de crash ou indisponibilité Firestore.
2. **Confinement** : Activer le mode maintenance via un flag Firestore ou une page d'attente statique si nécessaire.
3. **Investigation** : Examiner la console Cloud Firestore et les logs client `console.error`.
4. **Correction** : Déployer le correctif via la chaîne CI/CD (`npm run typecheck`, `npm run test`, `npm run build`).
5. **Post-Mortem** : Rédiger un compte-rendu d'incident consignant la cause racine (RCA), la durée d'interruption et les actions correctives.
