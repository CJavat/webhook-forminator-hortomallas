FROM node:18.19.1-alpine3.18 AS deps
WORKDIR /app
COPY package.json ./
RUN npm install --frozen-lockfile

FROM node:18.19.1-alpine3.18 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18.19.1-alpine3.18 AS prod
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY . .

ENV PORT=${PORT}
ENV MAILER_HOST=${MAILER_HOST}
ENV MAILER_PORT=${MAILER_PORT}
ENV MAILER_SERVICE=${MAILER_SERVICE}
ENV MAILER_EMAIL=${MAILER_EMAIL}
ENV MAILER_PASSWORD=${MAILER_PASSWORD}
ENV MAILER_NAME_EMAIL=${MAILER_NAME_EMAIL}

EXPOSE ${PORT}
CMD [ "npm", "run", "start:prod" ]