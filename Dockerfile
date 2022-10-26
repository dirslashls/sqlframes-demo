FROM node:16
WORKDIR /usr/src/sqlframes-demo
COPY package*.json ./
RUN npm install

COPY src ./src
COPY index.html ./

EXPOSE 8080

CMD [ "npm", "run", "serve" ]
