FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn

CMD ["yarn", "dev"]