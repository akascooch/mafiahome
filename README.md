# Mafia Home - برنامه توسعه

این مخزن شامل پیکربندی‌ها و منابع پروژه Mafia Home است. برای هماهنگی توسعه‌ی ویژگی‌های اصلی، برای هر ماژول یک Issue مستند شده در پوشه [`docs/issues/`](docs/issues/) وجود دارد.

## لینک Issueها و برنچ‌ها
| ماژول | سند Issue | برنچ پیشنهادی | دستور ایجاد برنچ |
| --- | --- | --- | --- |
| AUTH | [AUTH - سامانه احراز هویت و مدیریت حساب](docs/issues/auth.md) | `feature/auth-access` | `git checkout -b feature/auth-access` |
| LOBBY | [LOBBY - مدیریت لابی و تطبیق بازیکنان](docs/issues/lobby.md) | `feature/lobby-management` | `git checkout -b feature/lobby-management` |
| GAME CORE | [GAME CORE - منطق اصلی بازی مافیا](docs/issues/game-core.md) | `feature/game-core-loop` | `git checkout -b feature/game-core-loop` |
| REALTIME | [REALTIME - زیرساخت ارتباط بلادرنگ](docs/issues/realtime.md) | `feature/realtime-infra` | `git checkout -b feature/realtime-infra` |
| MATCH HISTORY & CLANS | [MATCH HISTORY & CLANS - تاریخچه بازی و انجمن‌ها](docs/issues/match-history-clans.md) | `feature/match-history-clans` | `git checkout -b feature/match-history-clans` |
| IN-APP SHOP | [IN-APP SHOP - فروشگاه درون برنامه‌ای](docs/issues/in-app-shop.md) | `feature/in-app-shop` | `git checkout -b feature/in-app-shop` |

برای مشاهده معیارهای پذیرش، Definition of Done، برآورد تلاش، و لینک‌های تکمیلی هر ویژگی به اسناد بالا یا [docs/product-roadmap.md](docs/product-roadmap.md) مراجعه کنید.

## قالب‌ها
- قالب PR: [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md)
- قالب Issueها: پوشه [.github/ISSUE_TEMPLATE/](.github/ISSUE_TEMPLATE/)
