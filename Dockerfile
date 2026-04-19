# Этап 1: Сборка
FROM oven/bun:latest AS build
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install
COPY . .
RUN bun run build

# Этап 2: Продакшен (используем Bun как статический сервер)
FROM oven/bun:latest
WORKDIR /app
COPY --from=build /app/dist /app/dist
# Установите простой статический сервер, например, serve
RUN bun add -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
