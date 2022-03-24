FROM node:lts-alpine
WORKDIR /app
COPY . .
ENV PORT=9000
EXPOSE ${PORT}
RUN npm install --production
CMD node ./main.js