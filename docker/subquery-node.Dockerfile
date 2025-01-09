FROM subquerynetwork/subql-node-stellar:latest

# Mudar para usuário root para instalação
USER root

# Instalar curl para healthcheck
RUN apk add --no-cache curl

# Instalar dependências globais
RUN npm install -g stellar-sdk soroban-client @subql/node-stellar

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências do projeto
RUN npm install

# Copiar o resto dos arquivos
COPY . .

# Construir o projeto
RUN npm run build

# Mudar permissões do diretório
RUN chown -R node:node /app

# Habilitar modo unsafe para permitir imports nativos
ENV SANDBOX_UNSAFE=1

# Voltar para o usuário node
USER node 