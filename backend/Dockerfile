# base stage
ARG NODE_VERSION=21.7.2

FROM node:${NODE_VERSION}-alpine as base

# install python
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python && \
    apk add --update --no-cache py3-pip
FROM base as dev
ENV NODE_ENV development
WORKDIR /opt/dev/backend
COPY package*.json ./
RUN npm ci
COPY . ./

CMD [ "npm", "run", "dev"]

FROM base as prod
ENV NODE_ENV production

WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD node src/index.js

