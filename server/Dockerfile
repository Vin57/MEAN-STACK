
FROM node:alpine as express

WORKDIR /express

COPY package*.json ./

RUN npm install express && \
    npm install -g express-generator && \
    npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start"]
