#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "=== CRM Lite — Install ==="

# Ensure Node.js 20+ is installed (required by Angular 18)
NODE_VERSION=$(node --version 2>/dev/null | sed 's/v//' | cut -d. -f1)
if [ "${NODE_VERSION:-0}" -lt 18 ]; then
  echo "→ Installing Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt install nodejs -y
fi

echo "→ Installing dependencies..."
npm install --no-audit --no-fund

echo "→ Building application..."
npx ng build --configuration production

echo "=== Install complete ==="
echo "Run: npx ng serve --host 0.0.0.0 --port 4200 --disable-host-check"
