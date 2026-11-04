<p align="center">
  <img src="/logo.jpg" alt="NetOps Academy Logo" width="128" style="border-radius: 28px; box-shadow: 0 0 30px rgba(0, 229, 255, 0.45);" />
</p>

<h1 align="center">🌐 NetOps Academy — Enterprise NOC Engine</h1>

<p align="center">
  <strong>Network engineering cockpit, official exam simulator, and virtual hands-on lab training platform for industry certifications.</strong>
</p>

<p align="center">
  <strong>🇬🇧 English Documentation</strong> | <a href="README.md"><strong>🇫🇷 Documentation en Français (README.md)</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-v2.6.0--PROD-00e5ff?style=for-the-badge&logo=fastapi&logoColor=black" alt="Version 2.6.0" />
  <img src="https://img.shields.io/badge/Languages-EN%20%F0%9F%87%AC%F0%9F%87%A7%20%7C%20FR%20%F0%9F%87%AB%F0%9F%87%B7-00daf3?style=for-the-badge&logo=google-translate&logoColor=black" alt="Bilingual EN FR" />
  <img src="https://img.shields.io/badge/PWA-Installable-4edea3?style=for-the-badge&logo=pwa&logoColor=black" alt="PWA Ready" />
  <img src="https://img.shields.io/badge/Theme-Dark%20%7C%20Light-ffd700?style=for-the-badge&logo=color-switch&logoColor=black" alt="Dark and Light Theme" />
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase Firestore" />
</p>

---

## 📸 Screen Preview — NOC Cockpit & Telemetry Console

<p align="center">
  <img src="/screenshot.jpg" alt="NetOps Academy Dashboard Preview" width="100%" style="border-radius: 16px; border: 1px solid #334155; box-shadow: 0 12px 35px rgba(0,0,0,0.6);" />
</p>

---

## 📑 Table of Contents

- [🌟 General Overview](#-general-overview)
- [🌍 Release v2.6.0: Complete Bilingual Internationalization (FR / EN)](#-release-v260-complete-bilingual-internationalization-fr--en)
- [📱 Release v2.5.0: Navigation & Background Updates](#-release-v250-navigation--background-updates)
- [📦 1-Click PWA Desktop & Mobile Installation](#-1-click-pwa-desktop--mobile-installation)
- [✨ Architecture & Categorized Navigation](#-architecture--categorized-navigation)
- [⚖️ Legal Framework, Non-Affiliation & Data Disclaimer](#-legal-framework-non-affiliation--data-disclaimer)
- [💡 Contextual Tooltips & Beginner Guidance](#-contextual-tooltips--beginner-guidance)
- [🏆 Supported Certification Tracks & Blueprint Scope](#-supported-certification-tracks--blueprint-scope)
- [🧠 Leitner SRS Flashcards Engine](#-leitner-srs-flashcards-engine)
- [🔬 Proctor Exam Simulator & Cisco IOS-XE Virtual Lab](#-proctor-exam-simulator--cisco-ios-xe-virtual-lab)
- [🛠️ Tech Stack & Deployment](#️-tech-stack--deployment)

---

## 🌟 General Overview

**NetOps Academy** is an immersive engineering cockpit and study platform dedicated to world-class network and cybersecurity certifications (**Cisco CCNA / CCNP, Palo Alto PCNSE, Fortinet FCP FortiGate, CompTIA Security+ / Network+, and Juniper JNCIA-Junos**).

The application combines two complementary operational purposes:
1. **Network Operations Center (NOC) Console**: Live telemetry, domain readiness radar, exam analytics, and an interactive simulated Cisco IOS-XE terminal.
2. **Advanced Learning Engine**: 2,900+ high-fidelity technical flashcards powered by the Leitner 5-box Spaced Repetition System (SRS), proctored exam simulator, and multi-cloud architectural topology matrix (AWS vs Azure vs GCP vs On-Premises).

---

## 🌍 Release v2.6.0: Complete Bilingual Internationalization (FR / EN)

NetOps Academy is now **fully bilingual** (French 🇫🇷 and English 🇬🇧) across all modules, preserving operational technical rigor and zero user-state friction.

### 1. 🔄 Instant Reactive Switching (Zero-Reload)
- **Zero workflow loss**: Switching between French and English occurs in-place without reloading the browser and never resets:
  - Official timed exam sessions, marked answers, and flagged items.
  - Exam scratchpad and notepad notes.
  - Active Cisco IOS-XE CLI terminal session logs and command history.
  - Spaced repetition Leitner card index and review queues.
- **Unified Language Switcher** (`LanguageSwitcher.tsx`):
  - Accessible from the top header bar.
  - Accessible from the retractable navigation sidebar.
  - Accessible from the multi-level hamburger menu.
  - Accessible in System Settings and Engineer Profile Modal.
- **Persistent Preferences**: Language selection is saved to `localStorage` (`netops_lang`) and synchronizes `<html lang="...">`.

### 2. 📚 Modular i18n Architecture
Built on `i18next` and `react-i18next` with 10 dedicated domain namespaces per language (`/src/i18n/locales/{fr,en}/`):
- `common.json`: Universal actions, badges, certification tracks, metric units, themes, and PWA prompts.
- `navigation.json`: Categorized navigation tabs, tooltips, and breadcrumbs.
- `dashboard.json`: Session telemetry, readiness radar, Leitner stats, and analytics metrics.
- `flashcards.json`: 3D card controls, SRS Leitner ratings, audio TTS speech, and custom card creation.
- `exams.json`: Proctoring rules, countdown timer, question validation, and blueprint scoring.
- `labs.json`: Syntax validation criteria, step-by-step verification, and troubleshooting console.
- `terminal.json`: CLI device prompts, session badges, and TAB autocomplete helpers.
- `encyclopedia.json`: Hybrid cloud topologies, ASCII routing diagrams, and cloud matrix comparison.
- `settings.json`: System release metadata, background updater, 5-clause legal disclaimers, and CIDR/VLSM calculator.
- `errors.json`: Network diagnostics and RFC error status messages.

### 3. 🎯 Technical Content Standard & Fallback Strategy
- **Exact Industry CLI Commands**: Official syntax for Cisco IOS-XE (`show ip interface brief`, `ip route 0.0.0.0 0.0.0.0`, `ping`), Palo Alto PAN-OS, and Fortinet FortiOS remains strictly uncompromised.
- **Bilingual Exam Simulator**: Questions dynamically toggle between English statements (`generateFullExamQuestions('en')`) and French statements (`generateFullExamQuestions('fr')`) without resetting elapsed time or scores.
- **Transparent Source Content Language Indicator**: Flashcard and Cloud Encyclopedia cards prominently display a source language badge (`🌐 Content: FR (RFC & CLI in EN)`), ensuring users are informed while maintaining Leitner SRS progression.
- **Localized Numbers and Dates**: Formatted with standard `Intl.NumberFormat` and `Intl.DateTimeFormat` (`en-US` and `fr-FR`).
- **Adaptive Speech Synthesis (TTS)**: Voice reads in `en-US` when English is active and `fr-FR` when French is active.

---

## 📱 Release v2.5.0: Navigation & Background Updates

### 1. 🍔 Categorized Multi-Level Hamburger Menu
- Optimized for **Desktop**, **Tablet**, and **Mobile** viewports.
- Logical organization according to user intent:
  - 🏠 **Home & Cockpit**: NOC Dashboard, Readiness Radar, and quick telemetry.
  - 🎓 **Learn & Explore**: Certification blueprints and Enterprise Cloud Encyclopedia.
  - 📑 **Review & Memorize**: SRS Leitner Flashcards and Blueprint Question Bank.
  - 🛠️ **Hands-on & Labs**: Command Line Typing Drills and Simulated IOS-XE Terminal.
  - 📊 **Assess & Measure**: Timed Exam Simulator and Progression Analytics.
  - ⚙️ **Tools & System**: CIDR/VLSM Subnet Calculator, System Settings, Light/Dark Theme, PWA.
- Quick search filter built into the drawer.

### 2. ⚙️ System Settings & Automated Background Updates
- **Full Release Metadata**:
  - 📅 **Official Release Date**: November 2, 2026.
  - 🕒 **Last Checked Timestamp**: Formatted dynamically (e.g., *Nov 2, 2026, 6:45:10 PM*).
  - 🏷️ **Active Build**: `v2.6.0-PROD (Enterprise NOC)`.
- **"Check for updates" Button**: Triggers an asset manifest check and updates verification timestamps.
- **"Force update" Button**: Flushes all CacheStorage and Service Worker instances and refreshes pristine assets.
- **Background Auto-Updater Service**: Periodic background service checks for new versions every 15 minutes, caches assets silently, and informs the engineer without disrupting active exams.

### 3. ☀️ High-Visibility Light Theme & 🌙 Deep NOC Dark Theme
- 1-click instant switch via header icon, hamburger menu, or settings.
- Stored in `localStorage` (`netops_theme`).
- **Dark Theme**: Deep cyber `#0f131c` canvas with cyan `#00daf3` contrast.
- **Light Theme**: Crisp slate/paper `#f8fafc` canvas with `#0f172a` typography and soft borders.

---

## 📦 1-Click PWA Desktop & Mobile Installation

With native **Progressive Web App (PWA)** capabilities:
- 📲 **On Mobile (iOS / Android)**: Add to Home Screen for a dedicated app experience with no URL bar.
- 💻 **On Desktop (Chrome, Edge, Safari, Arc)**: Install as an operating-system desktop application with taskbar shortcut and instant offline launch.
- 🚀 **"Install App" Button**: Available in header bar, sidebar, hamburger menu, and system settings.

---

## ⚖️ Legal Framework, Non-Affiliation & Data Disclaimer

NetOps Academy features a mandatory onboarding and legal disclosure banner:

1. **No Official Affiliation**: NetOps Academy is an independent educational tool with no endorsement, partnership, sponsorship, or affiliation with **Cisco Systems, Inc.**, **Palo Alto Networks, Inc.**, **Fortinet, Inc.**, **CompTIA**, or **Juniper Networks**.
2. **Trademarks & Fair Use**: All trademarks, vendor names, and exam codes (200-301 CCNA, 350-401 ENCOR, 350-701 SCOR, PCNSE, FortiGate 7.4) belong exclusively to their respective owners and are mentioned strictly for descriptive educational purposes.
3. **Data Disclaimer**: The author and platform provide technical configurations, network topologies, CLI commands, and practice items "as-is" for personal training. No liability is assumed for production network implementations.

---

## 💡 Contextual Tooltips & Beginner Guidance

Every technical field and action features explanatory micro-tooltips (`<Tooltip>` and `<FieldHelper>`):
- **CIDR / VLSM Calculator**: Clear definitions of subnet masks, wildcard masks (for ACLs and OSPF), network IDs, and broadcast addresses.
- **Exam Simulator**: Proctoring threshold rules (825/1000 passing score), question flagging, and scratchpad usage.
- **Flashcards Cockpit**: Leitner review queues (10-minute short interval, tomorrow, and 4-day mastery).
- **Interactive Lab Terminal**: Equipment roles (sub-interfaces, 802.1Q trunks, VLAN hosts).

---

## 🏆 Supported Certification Tracks & Blueprint Scope

| Certification | Vendor | Exam Code | Flashcard Deck | Blueprint Coverage |
| :--- | :---: | :---: | :---: | :--- |
| **Cisco CCNA** | Cisco | 200-301 | **600 Cards** | D1 to D6 (Fundamentals, Access, IP Connectivity, Services, Security, Automation) |
| **Cisco CCNP Enterprise Core** | Cisco | 350-401 ENCOR | **600 Cards** | D1 to D6 (Architecture, SD-Access, Routing, Assurance, Security, NetDevOps) |
| **Cisco CCNP Enterprise Routing** | Cisco | 300-410 ENARSI | **400 Cards** | D1 to D4 (Advanced L3, VPN/DMVPN, Infrastructure Security, Services) |
| **Cisco CCNP Security Core** | Cisco | 350-701 SCOR | **600 Cards** | D1 to D6 (Threat Defense, Firewalls/VPNs, Cloud Security, Content, EDR, ISE) |
| **Palo Alto PCNSE** | Palo Alto | PAN-OS 11.x | **600 Cards** | D1 to D6 (SP3 Architecture, Core Components, Security Policies, GlobalProtect, Panorama) |
| **Fortinet FCP FortiGate** | Fortinet | FortiOS 7.4 | **100 Cards** | D1 to D4 (System & Network, UTM Policies, IPsec/ZTNA, HA Diagnostics) |
| **CompTIA Security+ / Net+** | CompTIA | SY0-701 / N10-008 | Targeted Decks | SAML/OIDC Auth, OSI Model, Transport & Security |
| **Juniper JNCIA-Junos** | Juniper | JN0-104 | Targeted Decks | RE vs PFE Engine Architecture, commit confirmed CLI syntax |

---

## 🛠️ Tech Stack & Deployment

- **Frontend**: React 19, TypeScript 5.8, Vite 6.2, Tailwind CSS v4.
- **Internationalization**: i18next & react-i18next with 10 modular domain namespaces per locale (`common`, `dashboard`, `encyclopedia`, `errors`, `exams`, `flashcards`, `labs`, `navigation`, `settings`, `terminal`).
- **Persistence & Cloud**: Firebase Firestore SDK v12, Firebase Authentication.
- **PWA**: Web App Manifest, Service Worker with Cache-First asset strategy.
- **Audio & Visuals**: Web Speech API (TTS), Canvas-Confetti, Material Symbols.

---

## 🌐 i18n Contribution Guide & Pedagogical Policy

### 1. Strict 1:1 Parity Rule
Any translation key added to `src/i18n/locales/fr/*.json` must have an identical counterpart in `src/i18n/locales/en/*.json`, preserving all interpolation variables (`{{count}}`, etc.).
Run the automated CI parity check anytime:
```bash
npm run test:i18n
```

### 2. Industry CLI & Technical Command Integrity
Official network CLI syntax (**Cisco IOS-XE**, **Palo Alto PAN-OS**, **Fortinet FortiOS**), IETF RFC standard references, and IEEE protocol acronyms remain untranslated to accurately reflect real production environments and vendor exam formats.

### 3. Pedagogical Content Localization Standards
- **Exam Simulator**: 102 questions dynamically localized in French and English via `generateFullExamQuestions(lang)`.
- **Question Bank**: Synchronized bilingual practice question sets (`bankQuestionsFr` / `bankQuestionsEn`).
- **Virtual Hands-on Lab**: Step-by-step tasks and criteria localized via `getLocalizedLabScenario(lang)`.
- **Flashcards & Cloud Encyclopedia**: The foundational body of technical articles is preserved with explicit source language transparency badges (`🌐 Content: FR (RFC & CLI in EN)`), protecting Spaced Repetition (SRS) Leitner progress from artificial machine translation drift.

---

<p align="center">
  <strong>NetOps Academy — Engineered for operational excellence in network engineering & cybersecurity.</strong>
</p>
