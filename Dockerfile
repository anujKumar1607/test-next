FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

RUN npm install -g pm2

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

COPY ecosystem.config.js .

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]