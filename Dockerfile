FROM node:20-alpine

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .

RUN npx prisma migrate dev --name init
RUN npx prisma generate

RUN npm run build

EXPOSE 3000
CMD ["node", "build"]