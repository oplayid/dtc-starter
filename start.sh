#!/bin/sh
cd /server/apps/backend

echo "Running database migrations..."
pnpm medusa db:migrate

echo "Starting Medusa backend..."
pnpm dev