# Mafiahome Next.js Application

This directory contains the full Next.js 13 project that powers the Mafiahome website. The repository root is configured as an
npm workspace so you can run all commands from the top level (`npm run dev`, `npm run build`, `npm run deploy`) while keeping the
application code isolated in `mafia-home/`.

## Available scripts

All scripts can be invoked from the repository root via `npm run <name>`.

- `dev` – Launches the Next.js development server on http://localhost:3000
- `build` – Produces the production build using `next build`
- `export` – Generates the static snapshot in `mafia-home/out`
- `start` – Runs the production server via `next start`
- `lint` – Executes the Next.js linting pipeline locally (lint is skipped automatically during CI builds until `eslint` is vendored)
- `deploy` – Calls `scripts/deploy.ps1` to build, export, compress, and deploy the static site to the production server

## Deployment workflow

1. Ensure `sshpass`, `rsync`, and the OpenSSH client are available on the machine executing the script.
2. Export `MAFIAHOME_SSH_PASSWORD` in your environment. This is consumed by `sshpass` inside the PowerShell script (set it
   persistently with `setx` on Windows if desired).
3. Run `npm run deploy` from the repository root. The command proxies to the workspace and executes `scripts/deploy.ps1`.
4. The script performs the following steps:
   - Installs dependencies (`npm install` within the workspace)
   - Runs `npm run build` and `npm run export`
   - Copies the static export into a timestamped folder under `dist/`
   - Compresses the folder and uploads it to `/var/www/mafiahome/releases/<timestamp>` via `scp`
   - Extracts the archive remotely, syncs the `out/` directory into `/var/www/mafiahome/html`, and records the active release
   - Leaves the uploaded archive on the server for rollback purposes

For a detailed, timestamped log of deployments, consult `deployment-notes.txt` at the repository root.
