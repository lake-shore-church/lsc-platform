#!/usr/bin/env bash
# Deploy production to Vercel from apps/web (requires: npx vercel login)
set -euo pipefail
cd "$(dirname "$0")/../apps/web"
echo "→ Linking / deploying from apps/web (production)…"
npx vercel@41 --prod "$@"
