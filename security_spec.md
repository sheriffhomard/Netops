# Security Specification for NetOps Academy Firestore

## 1. Data Invariants
1. A user profile document `/users/{userId}` can only be read, created, or updated by the authenticated user whose `request.auth.uid == userId`.
2. PII Isolation: Emails and profile data are stored in `/users/{userId}` and strictly restricted from public reads or blanket authenticated reads.
3. Subcollection containment: All student resources (`/users/{userId}/flashcards/{flashcardId}`, `/users/{userId}/examResults/{resultId}`, `/users/{userId}/notes/{noteId}`) are bound to `{userId}`.
4. Author & Owner Identity: The user can only create subcollection items where `incoming().userId == request.auth.uid == userId`.
5. Timestamps: `createdAt` is immutable after creation.
6. Email Verification: For data write operations, user must be authenticated with verified email when using Google provider.
7. Denial of Wallet: All IDs must pass `isValidId()` (size <= 128, matching '^[a-zA-Z0-9_\\-]+$'), strings must have bounded size (`.size() <= MAX`), and array size must be bounded (`.size() <= 10`).

## 2. Dirty Dozen Payloads (Rejection Targets)
1. **Unauthenticated Read of User Profile**: Anonymous or unauthenticated GET on `/users/usr_123` -> PERMISSION_DENIED.
2. **Cross-Tenant Profile Read**: User A (`usr_A`) attempting GET on `/users/usr_B` -> PERMISSION_DENIED.
3. **Ghost Field Injection on User Creation**: Injecting unexpected field `isAdmin: true` -> PERMISSION_DENIED.
4. **Identity Spoofing in Flashcards**: User A attempting to write `/users/usr_A/flashcards/fc_1` with `userId: "usr_B"` -> PERMISSION_DENIED.
5. **Cross-User Flashcard Creation**: User A writing directly to `/users/usr_B/flashcards/fc_99` -> PERMISSION_DENIED.
6. **Denial-of-Wallet Path Poisoning**: Document ID with 2KB payload or malicious chars -> PERMISSION_DENIED.
7. **Giant String Payload (Resource Exhaustion)**: Flashcard front with 50,000 characters -> PERMISSION_DENIED.
8. **Unbounded Array Injection**: Tags array with 500 items -> PERMISSION_DENIED.
9. **Exam Result Score Tampering (Negative or Non-number)**: Exam result with invalid score type or unowned UID -> PERMISSION_DENIED.
10. **Immutable Field Modification**: Attempting to alter `createdAt` on update -> PERMISSION_DENIED.
11. **Blanket Query Scraping**: Attempting a collectionGroup query across all users' flashcards -> PERMISSION_DENIED.
12. **Unauthenticated Write**: Writing notes without being signed in -> PERMISSION_DENIED.
