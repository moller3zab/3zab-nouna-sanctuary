# 3zab ♡ Nouna — Private Sanctuary

A shared journal built with React, TypeScript, Vite, Tailwind, Firebase Authentication and Cloud Firestore.

## Run locally

Requires Node.js 20 or later.

```sh
npm ci
npm run dev
npm run build
```

The included package archives are local dependencies referenced by package.json and package-lock.json; keep them when cloning.

## Enable private access (required)

1. Open Firebase project `ahmedwanfal` → Authentication → Sign-in method. Enable Email/Password.
2. Create the two intended users. Their UIDs must match `src/config/access.ts` and `firestore.rules`.
3. In Firestore Database → Rules, paste the complete contents of `firestore.rules` and click Publish. The previous test rules expired on 2026-10-15; this change grants access only to the two configured UIDs.
4. Sign in with each account’s email and password. Never put account passwords, service-account files or admin credentials in this repository.

Alternatively, as a Firebase project administrator:

```sh
firebase login
firebase deploy --only firestore:rules --project ahmedwanfal
```

Changing rules does not delete, migrate or reseed existing documents. Existing images in `polaroids.imageUrl` remain unchanged. A successful Authentication login alone does not override expired Firestore rules: publish the rules before expecting shared data to load.

## Publish the updated website

```sh
npm ci
npm run build
firebase deploy --only hosting --project ahmedwanfal
```

The GitHub repository stores the source; pushing code does not automatically update Firebase Hosting. Configure your production hostname under Authentication → Settings → Authorized domains if Firebase reports an unauthorized-domain error.

## Login interactions

The guardian stands facing forward, follows email entry, covers both eyes with his hands during password entry, and gives a thumbs up after successful sign-in. Reduced-motion preferences disable animation. The 1.5-second welcome animation finishes before the journal mounts, so no Firestore subscriptions start before authorized login. Social sign-in and the old instant-access bypass are removed. Sign out using the header icon.

## Verification

Production build: `npm run build`.
Browser checks cover mobile sizing, password visibility, guardian states, rejection of invalid/non-member accounts, successful member login and logout. Automated sign-in tests use mocked Authentication responses in an isolated browser; no real passwords or journal writes are used. Actual shared-data retrieval must be checked after publishing rules with an administrator account and signing in with one of the two real users.
