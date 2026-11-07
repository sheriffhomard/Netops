# Stratégie de Sauvegarde & Procédure de Restauration — NetOps Academy

Ce document décrit la stratégie de sauvegarde des données Cloud Firestore de **NetOps Academy**, la périodicité recommandée, les contrôles d'intégrité et la procédure de restauration.

---

## 1. Périmètre des Données & Stratégie

Les données de NetOps Academy stockées dans Cloud Firestore comprennent :
- Les profils des étudiants (`/users/{userId}`).
- Les flashcards personnalisées (`/users/{userId}/flashcards/*`).
- Les historiques d'examens officiels passés (`/users/{userId}/examResults/*`).
- Les notes d'ingénierie (`/users/{userId}/notes/*`).

Le corpus pédagogique officiel (2 900+ flashcards, scénarios de lab virtuels, questions d'examen) est versionné dans le dépôt Git et ne requiert pas de sauvegarde dynamique en base.

---

## 2. Sauvegarde Automatisée Firestore

### A. Export Programmé via Cloud Firestore & Google Cloud Storage
L'export automatique de la base Firestore s'effectue via Google Cloud Managed Export vers un bucket de stockage Cloud Storage dédié (`gs://<project-id>-firestore-backups/`).

```bash
# Exemple d'export ponctuel complet
gcloud firestore export gs://<project-id>-firestore-backups/$(date +%Y%m%d_%H%M%S) --async
```

### B. Planification Quotidienne via Cloud Scheduler
Il est recommandé de configurer un job Cloud Scheduler déclenchant une fonction Cloud Function ou un appel direct à l'API Firestore chaque nuit à 02:00 UTC :
- **Fréquence recommandée** : Quotidienne (`0 2 * * *`).
- **Rétention** :
  - Sauvegardes quotidiennes conservées pendant 30 jours.
  - Sauvegardes hebdomadaires conservées pendant 12 semaines.
  - Sauvegardes mensuelles conservées pendant 1 an (Cycle Lifecycle Management du bucket GCS).

---

## 3. Contrôle d'Intégrité des Sauvegardes

Après chaque export :
1. Vérifier la présence du fichier de métadonnées `output_metadata` dans le bucket GCS cible.
2. S'assurer que le code de sortie de l'opération Firestore affiche `SUCCESS` :
   ```bash
   gcloud firestore operations list
   ```
3. Exécuter un audit mensuel de volume pour vérifier que la taille de l'archive est cohérente avec la croissance de la base.

---

## 4. Procédure de Restauration

En cas de corruption de données ou de sinistre majeur :

1. **Isolement** : Révoquer temporairement les accès en écriture dans `firestore.rules` pour figer l'état :
   ```javascript
   match /{document=**} { allow read, write: if false; }
   ```
2. **Identification de la sauvegarde cible** :
   ```bash
   gsutil ls gs://<project-id>-firestore-backups/
   ```
3. **Exécution de l'import Firestore** :
   ```bash
   gcloud firestore import gs://<project-id>-firestore-backups/<backup-folder>/
   ```
4. **Vérification post-restauration** :
   - Vérifier le compte d'utilisateurs restauré via la console Firebase.
   - Effectuer un test de lecture sur un profil étudiant.
5. **Rétablissement** : Redéployer les règles `firestore.rules` officielles pour réactiver le service.
