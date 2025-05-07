# Установка зависимостей
FROM node:20.11-alpine AS dependencies
WORKDIR /app

# Устанавливаем pnpm через Corepack (рекомендуемый способ)
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Билд приложения
FROM node:20.11-alpine AS builder
WORKDIR /app

# Копируем зависимости и pnpm
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/pnpm-lock.yaml ./
COPY . .

# Устанавливаем pnpm через Corepack и билдим
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm build:production

# Финальный рантайм
FROM node:20.11-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Копируем только необходимое
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next

# Настраиваем pnpm через Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

EXPOSE 3000
CMD ["pnpm", "start"]