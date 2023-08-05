FROM node:18 as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
EXPOSE 5173
CMD bash -c "npm run dev"