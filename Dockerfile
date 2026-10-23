FROM node:22-alpine
WORKDIR /server

RUN npm install pnpm@10.11.1 -g

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/storefront/package.json ./apps/storefront/

RUN pnpm install --frozen-lockfile

COPY . .

# Tambahkan nilai environment sementara untuk build storefront
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://admin.oplay.id
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_dummy_build_key
ENV NEXT_PUBLIC_BASE_URL=https://store.oplay.id

# Build project
RUN pnpm build

RUN chmod +x start.sh start-storefront.sh

EXPOSE 9000 5173 8000

ENTRYPOINT ["sh", "./start.sh"]