# Mafiahome Project Structure (Repository Root)

## English Overview

The repository now contains the complete Next.js 13 source tree inside the `mafia-home/` workspace alongside the existing
infrastructure assets. Root-level `package.json` exposes npm workspace scripts so day-to-day commands (`npm run dev`, `npm run build`,
`npm run deploy`) can be executed from the repository root while delegating to the application directory.

### Top-Level Layout

| Path | Description |
| --- | --- |
| `deployment-notes.txt` | Timestamped deployment log and operational checklist. |
| `docs/` | Living documentation covering structure, workflow status, and audits. |
| `etc/` | nginx configuration fragments mirrored from the production server. |
| `mafia-home/` | Full Next.js 13 project, including pages, components, lib helpers, Tailwind styles, and deployment scripts. |
| `mafiahome.conf` | Legacy nginx site definition retained for reference. |
| `mafiahome.zip` | Historical static export archive kept for comparison. |
| `named.conf.local` / `mafiahome.zone` | BIND DNS configuration. |
| `package.json` | Workspace manifest forwarding npm scripts into `mafia-home/`. |
| `var/` | Snapshot of the deployed static web root. |

### Application Workspace (`mafia-home/`)

```
mafia-home/
├── components/
│   └── Hero.tsx                # Shared hero banner used on the landing page
├── lib/
│   └── site.ts                 # Site metadata constants consumed across pages
├── pages/
│   ├── _app.tsx                # Custom App importing global Tailwind styles
│   └── index.tsx               # Primary landing page markup
├── public/
│   ├── favicon.svg             # Updated brand icon
│   └── manifest.json           # Progressive Web App metadata
├── scripts/
│   └── deploy.ps1              # Automated build/export/deploy workflow
├── styles/
│   └── globals.css             # Tailwind base, component, and utility layers
├── next.config.js              # Next.js configuration (lint skipping during CI builds)
├── package.json                # Application dependencies and scripts
├── postcss.config.js           # Tailwind/PostCSS integration
├── tailwind.config.js          # Tailwind content scan configuration
└── tsconfig.json               # TypeScript project configuration with `@/*` alias
```

The workspace includes `next-env.d.ts` and `.eslintrc.json` files created by Next.js for TypeScript and linting integration.

### Infrastructure Artifacts

The previously documented nginx configuration and deployed static snapshot remain unchanged under `etc/` and `var/`. They
serve as operational references while the new workspace handles day-to-day development and deployment.

---

## نمای کلی فارسی

این مخزن اکنون شامل کل کد منبع Next.js 13 داخل پوشهٔ `mafia-home/` است و در کنار دارایی‌های زیرساختی قبلی نگه‌داری می‌شود.
فایل `package.json` در ریشه به صورت npm workspace تنظیم شده تا بتوان همهٔ دستورات روزمره (`npm run dev`، `npm run build`، `npm run deploy`)
را از ریشه اجرا کرد و هم‌زمان کد برنامه در مسیر `mafia-home/` متمرکز بماند.

### چیدمان سطح بالا

| مسیر | توضیح |
| --- | --- |
| `deployment-notes.txt` | گزارش استقرار و چک‌لیست عملیاتی با برچسب زمانی. |
| `docs/` | مستندات به‌روز دربارهٔ ساختار، وضعیت گردش‌کارها و ممیزی‌ها. |
| `etc/` | قطعه‌کدهای پیکربندی nginx که از سرور تولیدی آینه شده‌اند. |
| `mafia-home/` | پروژهٔ کامل Next.js 13 شامل صفحات، کامپوننت‌ها، کتابخانه‌ها، استایل‌های Tailwind و اسکریپت‌های استقرار. |
| `mafiahome.conf` | پیکربندی قدیمی nginx برای مرجع. |
| `mafiahome.zip` | خروجی استاتیک قدیمی برای مقایسه. |
| `named.conf.local` / `mafiahome.zone` | تنظیمات BIND DNS. |
| `package.json` | مانیفست workspace که اسکریپت‌ها را به `mafia-home/` هدایت می‌کند. |
| `var/` | تصویر وضعیت وب‌سایت استاتیک در حالت استقرار. |

### فضای کاری برنامه (`mafia-home/`)

```
mafia-home/
├── components/
│   └── Hero.tsx                # هدر مشترک صفحهٔ فرود
├── lib/
│   └── site.ts                 # ثابت‌های متادیتای سایت برای استفاده در صفحات
├── pages/
│   ├── _app.tsx                # کامپوننت App برای بارگذاری استایل‌های سراسری
│   └── index.tsx               # صفحهٔ اصلی وب‌سایت
├── public/
│   ├── favicon.svg             # آیکون تازهٔ برند
│   └── manifest.json           # اطلاعات PWA
├── scripts/
│   └── deploy.ps1              # اسکریپت خودکارسازی بیلد/اِکسپورت/دیپلوی
├── styles/
│   └── globals.css             # لایه‌های Tailwind
├── next.config.js              # تنظیمات Next.js (غیرفعال‌سازی lint در بیلدهای CI)
├── package.json                # وابستگی‌ها و اسکریپت‌های برنامه
├── postcss.config.js           # پیکربندی Tailwind/PostCSS
├── tailwind.config.js          # پیکربندی اسکن محتوا برای Tailwind
└── tsconfig.json               # تنظیمات TypeScript با آدرس‌دهی `@/*`
```

فایل‌های `next-env.d.ts` و `.eslintrc.json` نیز به‌صورت خودکار ایجاد شده‌اند تا پشتیبانی TypeScript و lint حفظ شود.

### دارایی‌های زیرساختی

پوشه‌های `etc/` و `var/` بدون تغییر باقی مانده‌اند و به عنوان مرجع عملیاتی استفاده می‌شوند، در حالی‌که فضای کاری جدید مسئول
توسعه و استقرار روزمره است.
