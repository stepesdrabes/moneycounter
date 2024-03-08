FROM node:20-alpine

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .

RUN npx prisma migrate dev --name init
RUN npx prisma generate

ENV GOAL=1000
ENV BASE=https://moneycounter.stepes.dev
ENV STRIPE_SECRET_KEY=sk_test_51OAIdaEe5fhFnrPogFyI38qqBofhu0hh1SpZ1F6pWtBfRy2tLqHdY3KGOlKivmYxIvpT53E2Gns63OHVWkzz56CD007q2Te1I5
ENV DATABASE_URL="file:./dev.db"

RUN npm run build

EXPOSE 3000
CMD ["node", "build"]