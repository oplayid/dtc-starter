FROM node:22-alpine
WORKDIR /app
RUN npm install pnpm@10.11.1 -g

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
RUN pnpm install --filter @dtc/backend --frozen-lockfile

COPY apps/backend ./apps/backend
WORKDIR /app/apps/backend

EXPOSE 9000
CMD ["npx", "medusa", "develop"]