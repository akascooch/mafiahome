# GitHub Actions Status – Mafiahome

## English Summary (2025-11-12)

The repository includes the reinstated Next.js source tree (`mafia-home/`) together with a PowerShell deployment helper. Root-level
npm commands proxy to the workspace, so `npm run build`, `npm run export`, and `npm run deploy` all execute successfully from the
repository root.

### GitHub Actions

- A `.github/workflows/` directory is still absent. CI/CD automation has not yet been reintroduced. Recreating workflows remains a
  follow-up task once secrets for SSH deployment are available.

### Verification Notes

- `CI=1 npm run build` completes successfully, generating static assets in `mafia-home/.next` and `mafia-home/out`.
- `mafia-home/scripts/deploy.ps1` is present and orchestrates install, build, export, packaging, upload, and activation against
  `/var/www/mafiahome/releases/<timestamp>` on the remote server.
- Documentation (`mafia-home/README.md`, `docs/project-structure.md`, `deployment-notes.txt`) reflects the updated workflow.

### Outstanding Items

1. Configure GitHub Actions once deployment secrets (SSH password or key) can be stored securely.
2. Re-enable linting in CI after provisioning `eslint` (the build currently skips lint during automation via `next.config.js`).
3. Restore network access to confirm the PowerShell deploy script against the live server.

---

## خلاصه فارسی (۱۲ نوامبر ۲۰۲۵)

اکنون درخت کامل کد Next.js داخل مسیر `mafia-home/` موجود است و اسکریپت PowerShell برای استقرار نیز در همان‌جا نگه‌داری می‌شود.
فرمان‌های npm در ریشه (مانند `npm run build`، `npm run export` و `npm run deploy`) مستقیماً به workspace هدایت شده و بدون خطا اجرا می‌شوند.

### وضعیت GitHub Actions

- هنوز پوشه‌ای با نام `.github/workflows/` وجود ندارد؛ خطوط لولهٔ CI/CD باید بعداً و پس از آماده شدن secretهای اتصال SSH ساخته شوند.

### نکات تأیید

- اجرای `CI=1 npm run build` با موفقیت به پایان رسید و خروجی استاتیک در مسیرهای `mafia-home/.next` و `mafia-home/out` تولید شد.
- فایل `mafia-home/scripts/deploy.ps1` مراحل نصب، بیلد، اکسپورت، بسته‌بندی، آپلود و فعال‌سازی روی مسیر `/var/www/mafiahome/releases/<timestamp>` را خودکار می‌کند.
- مستندات (`mafia-home/README.md`، `docs/project-structure.md` و `deployment-notes.txt`) فرآیند جدید را توضیح می‌دهند.

### موارد باقی‌مانده

1. پس از فراهم شدن امکان نگه‌داری امن رمز عبور یا کلید SSH، پوشهٔ `.github/workflows/` و خطوط لولهٔ CI را ایجاد کنید.
2. پس از افزودن بستهٔ `eslint`، مرحلهٔ lint را دوباره در بیلدهای CI فعال کنید (فعلاً lint در زمان بیلد نادیده گرفته می‌شود).
3. با برقرار شدن دسترسی شبکه، اسکریپت استقرار PowerShell را روی سرور واقعی آزمایش و اعتبارسنجی کنید.
