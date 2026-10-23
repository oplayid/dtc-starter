FROM node:22-alpine
WORKDIR /app
RUN npm install pnpm@10.11.1 -g

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/storefront/package.json ./apps/storefront/
RUN pnpm install --filter @dtc/storefront --frozen-lockfile

COPY apps/storefront ./apps/storefront
WORKDIR /app/apps/storefront

EXPOSE 8000
CMD ["pnpm", "dev", "-p", "8000"]