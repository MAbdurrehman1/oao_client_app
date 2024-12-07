FROM node:20-alpine AS builder

WORKDIR /src

COPY package.json yarn.lock ./

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

ARG VITE_LLM_API_URL
ENV VITE_LLM_API_URL=${VITE_LLM_API_URL}

ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}

ARG VITE_APP_ENV
ENV VITE_APP_ENV=${VITE_APP_ENV}

ARG SENTRY_RELEASE_NAME
ENV SENTRY_RELEASE_NAME=${SENTRY_RELEASE_NAME}

ARG VITE_PANEL_APP_URL
ENV VITE_PANEL_APP_URL=${VITE_PANEL_APP_URL}

EXPOSE 3000

FROM builder AS dev
RUN yarn install --frozen-lockfile
# Start app in development mode
CMD ["yarn", "dev"]

FROM builder AS prod
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --no-cache --production
RUN yarn build
RUN yarn global add pm2 serve
RUN yarn cache clean

# Start app in production mode
CMD ["pm2-runtime", "ecosystem.config.cjs"]
