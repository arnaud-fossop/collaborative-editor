# base stage
ARG NODE_VERSION=21.7.2

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /opt/dev/frontend
COPY package*.json ./
RUN npm ci
COPY . ./

FROM base as dev
CMD ["npm", "start"]

FROM base as build
RUN npm run build

# production env
FROM nginx:stable-alpine as prod
COPY --from=build /opt/dev/frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]