# Atlas Workspace

> Calm Productivity Workspace — local-first personal workspace for notes, Kanban, reminders, and structured thinking.

## Overview

Atlas Workspace, formerly **Ruang Kerja**, is a lightweight local-first productivity workspace inspired by Notion, Linear, Trello, and Google Keep.

The project is designed as a **Personal Workspace OS** that is fast, offline-friendly, static-hosted, Firebase-enabled, easy to deploy, and simple to maintain.

## Live Demo

**Firebase Hosting**

- https://atlas-workspace-af04b.web.app/
- https://atlas-workspace-af04b.firebaseapp.com/

**GitHub Repository**

- https://github.com/fermantonoihsan/Ruang-Kerja

## Features

### Workspace Core

- Markdown notes editor
- Live markdown preview
- Kanban board with drag and drop
- Reminder management
- Tags and filtering
- Search system
- Dashboard overview
- Empty states
- Dark mode
- Responsive layout

### Local-First Behavior

- Works without login
- Instant localStorage persistence
- Offline-friendly behavior
- Progressive enhancement with cloud sync

### Firebase Integration

- Firebase Authentication
- Firestore cloud backup and sync
- User-isolated workspace storage
- Firestore security rules

### PWA Support

- Service Worker
- Installable web app
- Cached application shell

## Product Direction

Atlas Workspace is positioned as a:

```text
Personal Workspace OS
```

The goal is not to build a heavy admin dashboard, but a calm and focused workspace that feels modern, readable, and easy to use every day.

Design direction:

- Calm
- Spacious
- Rounded
- Modern
- Readable
- Low cognitive load

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla JavaScript |
| Styling | Modular CSS Architecture |
| State | Local State + localStorage |
| Cloud | Firebase Firestore |
| Auth | Firebase Authentication |
| Hosting | Firebase Hosting |
| PWA | Service Worker |
| Icons | Lucide Icons |

## Project Structure

```text
Ruang-Kerja/
├── index.html
├── app.js
├── manifest.webmanifest
├── service-worker.js
├── firebase.json
├── .firebaserc
├── firestore.rules
├── firestore.indexes.json
├── package.json
├── src/
│   ├── main.js
│   ├── services/
│   ├── state/
│   ├── ui/
│   └── features/
├── styles/
│   ├── main.css
│   ├── 00-tokens.css
│   ├── 01-reset.css
│   ├── 02-base.css
│   ├── 03-layout.css
│   ├── 04-components.css
│   ├── 05-features.css
│   ├── 06-utilities.css
│   └── 07-responsive.css
└── .github/
    └── workflows/
```

## CSS Architecture

```text
00-tokens.css      Design tokens: color, spacing, radius, shadow, typography
01-reset.css       Box sizing and default normalization
02-base.css        Body, typography, forms, buttons, focus state
03-layout.css      App shell, sidebar, topbar, workspace grid
04-components.css  Buttons, chips, cards, modals, toast, badges
05-features.css    Dashboard, notes, Kanban, reminders
06-utilities.css   Helper classes
07-responsive.css  Mobile, tablet, and desktop breakpoints
```

## Firebase Security Rules

Each authenticated user can only access their own workspace document.

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/private/{documentId} {
      allow read, write: if request.auth != null
        && request.auth.uid == userId;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/fermantonoihsan/Ruang-Kerja.git
cd Ruang-Kerja
```

### 2. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 3. Login Firebase

```bash
firebase login
```

### 4. Run Local Server

```bash
firebase serve
```

### 5. Deploy to Firebase

```bash
firebase deploy
```

Or deploy hosting only:

```bash
firebase deploy --only hosting
```

## Suggested `package.json` Scripts

```json
{
  "scripts": {
    "dev": "firebase serve",
    "serve": "firebase serve",
    "deploy": "firebase deploy",
    "deploy:hosting": "firebase deploy --only hosting",
    "deploy:rules": "firebase deploy --only firestore:rules"
  }
}
```

## Development Status

```text
[x] Workspace layout
[x] Sidebar
[x] Notes
[x] Kanban
[x] Reminders
[x] Firebase Settings
[x] Topbar command/search bar
[x] Settings modal
[x] Sync badge
[x] Dark mode
[x] Empty states
[~] Dashboard refinement
[~] Sidebar restructuring
[~] JavaScript modularization
[ ] Full production refactor
```

## Roadmap

### Phase 1 — Deployable Baseline

- Firebase Hosting configuration
- Firestore rules
- Deployment scripts
- README deployment guide

### Phase 2 — Design System Foundation

- Layered CSS architecture
- Design tokens
- Modern card, chip, button, and modal system
- Improved visual hierarchy

### Phase 3 — Product UI Refresh

- Dashboard landing page
- Sidebar restructure
- Topbar as command/search bar
- Notes, Kanban, and reminders redesign
- Empty states

### Phase 4 — JavaScript Modularization

- Split `app.js` into smaller modules
- Move storage logic into services
- Move Firebase logic into services
- Move markdown renderer into services
- Move dashboard, notes, Kanban, and reminders into feature views

### Phase 5 — State and Sync Improvement

- Schema versioning
- Local data migration
- Debounced autosave
- Debounced Firestore sync
- Improved sync status

### Phase 6 — QA and Accessibility

- Mobile testing
- Keyboard navigation
- Focus states
- Contrast validation
- Service worker cache testing
- Firestore rules testing

## Planned Features

- Multi-workspace support
- Command palette
- Favorites or pinned pages
- Workspace templates
- Import and export workspace JSON
- Offline sync conflict viewer
- Better mobile gestures
- Keyboard-first workflow

## Design Principles

- Local-first by default
- Fast interaction over complexity
- Minimal cognitive friction
- Clear visual hierarchy
- Calm modern UI
- Offline-friendly workflow
- Progressive enhancement

## Author

**Ihsan Fermantono**  
Atlas Workspace / Ruang Kerja Project

## License

MIT License
