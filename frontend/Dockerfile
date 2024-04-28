FROM node:18.20

WORKDIR app/frontend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]