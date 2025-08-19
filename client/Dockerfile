### client/Dockerfile

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# The "--host" flag is needed to expose the Vite dev server correctly
CMD ["npm", "run", "dev", "--", "--host"]