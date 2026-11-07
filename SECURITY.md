# Politique de Sécurité — NetOps Academy

Ce document détaille le modèle de sécurité en couches, les règles Firestore durcies, le contrôle d'accès basé sur les rôles (RBAC), la protection des données personnelles (RGPD/PII) et la politique de divulgation responsable des vulnérabilités de **NetOps Academy**.

---

## 1. Modèle de Sécurité Zero-Trust

La sécurité de NetOps Academy repose sur le principe du moindre privilège appliqué au niveau de la couche base de données (Cloud Firestore) :

1. **Défaut de Rejet Absolu (Default-Deny)** :
   La racine de la base de données interdit systématiquement toutes les lectures et écritures non autorisées explicitement :
   ```javascript
   match /{document=**} {
     allow read, write: if false;
   }
   ```
2. **Cloisonnement Strict par Utilisateur (Tenancy Isolation)** :
   Toutes les données étudiantes (profils, flashcards personnalisées, résultats d'examens, bloc-notes) sont stockées dans l'arbre hiérarchique `/users/{userId}/*`. Aucun utilisateur ne peut accéder ou modifier les données d'un autre utilisateur.
3. **Vérification Obligatoire de l'Adresse E-mail** :
   Toute opération d'écriture (`create`, `update`, `delete`) exige un compte Google vérifié (`request.auth.token.email_verified == true`). Cela prévient le spoofing d'identité et les écritures par des comptes non authentifiés.
4. **Immutabilité des Résultats d'Examens** :
   Les sessions d'examen certifiantes enregistrées sous `/users/{userId}/examResults/{resultId}` sont immuables dès leur soumission (`allow update: if false;`).

---

## 2. Gestion des Rôles & Administrateurs

Le rôle administrateur (`isAdmin()`) est évalué selon une architecture à trois niveaux :
- **Firebase Auth Custom Claims** : `request.auth.token.admin == true && request.auth.token.email_verified == true`.
- **Collection d'autorisation de confiance** : `exists(/databases/$(database)/documents/admins/$(request.auth.uid))`.
- **Propriétaire vérifié** : `request.auth.token.email == 'sheriffhomard@gmail.com' && request.auth.token.email_verified == true`.

### Attribution et Révocation d'un Rôle Administrateur
- **Attribution via Firebase Admin SDK** (exécutable depuis un backend ou script de maintenance sécurisé) :
  ```javascript
  import { getAuth } from 'firebase-admin/auth';
  await getAuth().setCustomUserClaims(targetUid, { admin: true });
  ```
- **Révocation** :
  ```javascript
  await getAuth().setCustomUserClaims(targetUid, { admin: false });
  ```
- **Règle absolue** : Les clients Web front-end ne peuvent en aucun cas s'attribuer ou modifier leur propre rôle. Le champ `role` dans le profil utilisateur est un libellé d'affichage et n'accorde aucun privilège dans `firestore.rules`.

---

## 3. Protection contre les Attaques "Denial of Wallet"

Pour protéger l'infrastructure contre les abus volumétriques et l'épuisement des quotas Firestore :
- **Validation des Identifiants** : `isValidId(id)` limite la taille des identifiants à 128 caractères et force le motif `^[a-zA-Z0-9_\-]+$`.
- **Limites de Taille des Champs** : Les questions de flashcard sont limitées à 2 000 caractères, les réponses à 4 000 caractères, et les notes de cours à 10 000 caractères.
- **Limites sur les Tableaux** : Les listes de tags sont bornées à 10 éléments maximum.

---

## 4. Signalement d'une Vulnérabilité

Si vous découvrez une faille de sécurité dans NetOps Academy :
1. Envoyez un rapport détaillé par e-mail à : `sheriffhomard@gmail.com`.
2. Ne divulguez pas publiquement la vulnérabilité avant sa correction.
3. Incluez les étapes de reproduction (PoC) et le périmètre impacté.
4. Une réponse et prise en charge interviennent sous 48 heures ouvrées.
