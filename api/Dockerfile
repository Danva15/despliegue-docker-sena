# ---------- Etapa 1: construcción ----------

FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

# ---------- Etapa 2: ejecución ----------

FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src

EXPOSE 3000

USER node

CMD ["npm", "start"]
