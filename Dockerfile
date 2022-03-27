FROM node:16-alpine as base
WORKDIR /project
COPY . .
RUN npm i

FROM base as build
RUN npx nx build api --prod
RUN npx nx build urlshortener --prod


FROM nginx:alpine as app
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /project/dist/apps/urlshortener /usr/share/nginx/html/

FROM node:16-alpine as api
WORKDIR /project
COPY --from=build /project/dist/apps/api .
RUN npm i --production
RUN npm i pg
EXPOSE 9000
CMD [ "node", "main.js" ]
