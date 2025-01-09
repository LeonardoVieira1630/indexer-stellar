FROM node:18-alpine

WORKDIR /app

# Instalar dependências necessárias para compilação
RUN apk add --no-cache python3 make g++ gcc

COPY package*.json ./

# Instalar dependências do projeto
RUN npm install

COPY . .

RUN npm run build

# Instalar globalmente as dependências necessárias
RUN npm install -g stellar-sdk soroban-client @subql/node-stellar

EXPOSE 3000

CMD ["npm", "run", "start:docker"] 