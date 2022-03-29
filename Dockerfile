FROM node:16-alpine as base
WORKDIR /project
COPY . .
RUN npm ci
RUN npx nx run-many --target=build --prod --all --parallel

FROM nginx:alpine as app
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=base /project/dist/apps/urlshortener /usr/share/nginx/html/

FROM node:16-alpine as api
COPY --from=base /project/dist/apps/api .
RUN npm i --production
RUN npm i pg
CMD [ "node", "main.js" ]

FROM willfarrell/crontab as crontab
RUN apk update --no-cache && apk add nodejs npm
COPY crontab/config.json /opt/crontab/
# RUN mkdir /project
COPY --from=base /project/dist/apps/dbservice /project
RUN cd project && npm i --production && npm i pg
