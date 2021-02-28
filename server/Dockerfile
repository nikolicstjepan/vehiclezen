FROM node:latest

WORKDIR /usr/src/app

ENV NODE_ENV production
ENV PORT 80
ENV DB_NAME vehiclezen
ENV API_ROOT /api/v1
ENV SECRET vehiclezen

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD [ "node", "src/web/server.js" ]