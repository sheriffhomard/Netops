# Security Specification for NetOps Academy Firestore

## 1. Data Invariants & Zero-Trust Matrix

1. **User Profile Isolation**: A user profile document `/users/{userId}` can only be read by the owner user (`request.auth.uid == userId`) or an authorized administrator (`isAdmin()`). Blanket collection reads are restricted exclusively to administrators.
2. **PII Protection**: Personal student data (email, displayName, progress) is stored exclusively under `/users/{userId}` and never exposed publicly.
3. **Subcollection Containment**: All student learning artifacts (`/users/{userId}/flashcards/{flashcardId}`, `/users/{userId}/examResults/{resultId}`, `/users/{userId}/notes/{noteId}`) are strictly bound to `{userId}`.
4. **Author & Owner Identity**: Users can only create or update subcollection documents where `incoming().userId == request.auth.uid == userId`. Cross-tenant writing is rejected at the rule engine level.
5. **Immutable Integrity**: Timestamps (`createdAt`) and owner IDs (`id`, `userId`) cannot be modified after initial creation. Exam results (`/users/{userId}/examResults/{resultId}`) are strictly immutable (`allow update: if false;`).
6. **Mandatory Email Verification**: Enforced on all mutating operations (`create`, `update`, `delete`) via `isVerifiedOwner(userId)`. Unverified accounts cannot perform mutations, closing the account spoofing vulnerability.
7. **Denial of Wallet Protection**: All IDs are validated with `isValidId()` (size <= 128, matching `^[a-zA-Z0-9_\-]+$`), string lengths are strictly bounded (e.g., front <= 2000 chars, back <= 4000 chars, notes <= 10000 chars), and arrays are bounded to <= 10 items.

---

## 2. Access Control Matrix (RBAC & ABAC)

| Role / State | Read Profile | Write Profile | Read Own Subcollections | Write Own Subcollections | Read Others' Data |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Unauthenticated** | ❌ DENY | ❌ DENY | ❌ DENY | ❌ DENY | ❌ DENY |
| **Auth (Email Unverified)** | ❌ DENY | ❌ DENY | ❌ DENY | ❌ DENY | ❌ DENY |
| **Verified Student (Owner)** | ✅ ALLOW | ✅ ALLOW | ✅ ALLOW | ✅ ALLOW | ❌ DENY |
| **Cross-Tenant Attacker** | ❌ DENY | ❌ DENY | ❌ DENY | ❌ DENY | ❌ DENY |
| **Administrator (`isAdmin`)** | ✅ ALLOW | ✅ ALLOW | ✅ ALLOW | ✅ ALLOW | ✅ ALLOW (Audit) |

---

## 3. Administrator Role Architecture

The `isAdmin()` primitive uses a multi-tiered authorization model:
1. **Firebase Auth Custom Claims**: Evaluates `request.auth.token.admin == true && request.auth.token.email_verified == true`. This is the production standard for enterprise RBAC.
2. **Trusted Admin Directory**: Evaluates `exists(/databases/$(database)/documents/admins/$(request.auth.uid))` allowing document-based administrative assignment without re-issuing tokens.
3. **Bootstrapped Super-Admin**: Evaluates `request.auth.token.email == 'sheriffhomard@gmail.com' && request.auth.token.email_verified == true` to ensure continuous zero-downtime maintenance and initialization.

---

## 4. The "Dirty Dozen" Threat Payloads (Tested Rejection Targets)

1. **Unauthenticated Read of User Profile**: Anonymous or unauthenticated `GET /users/usr_123` -> `PERMISSION_DENIED`.
2. **Cross-Tenant Profile Read**: User A (`usr_A`) attempting `GET /users/usr_B` -> `PERMISSION_DENIED`.
3. **Ghost Field Injection on User Creation**: Injecting unexpected field `role: "admin"` -> `PERMISSION_DENIED`.
4. **Unverified Email Mutation**: User attempting to create flashcards while `email_verified == false` -> `PERMISSION_DENIED`.
5. **Identity Spoofing in Flashcards**: User A attempting to write `/users/usr_A/flashcards/fc_1` with `userId: "usr_B"` -> `PERMISSION_DENIED`.
6. **Cross-User Flashcard Creation**: User A writing directly to `/users/usr_B/flashcards/fc_99` -> `PERMISSION_DENIED`.
7. **Denial-of-Wallet Path Poisoning**: Document ID with 2KB payload or directory traversal characters -> `PERMISSION_DENIED`.
8. **Giant String Payload (Resource Exhaustion)**: Flashcard front with 50,000 characters -> `PERMISSION_DENIED`.
9. **Unbounded Array Injection**: Tags array with 500 items -> `PERMISSION_DENIED`.
10. **Exam Result Score Tampering**: Submitting invalid score (negative or > 1000) or altering result after submission -> `PERMISSION_DENIED`.
11. **Immutable Field Modification**: Attempting to alter `createdAt` on profile update -> `PERMISSION_DENIED`.
12. **Blanket Query Scraping**: Attempting a collectionGroup query across all users' flashcards -> `PERMISSION_DENIED`.
