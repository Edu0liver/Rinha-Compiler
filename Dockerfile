FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000

# Run the app
CMD [ "npm", "run", "start" ]
