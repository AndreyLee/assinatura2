# Estágio 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos de configuração do backend e instala as dependências
COPY backend/package.json backend/package-lock.json* ./backend/
RUN cd backend && npm install

# Copia todo o resto do código da aplicação
COPY . .

# Estágio 2: Produção
FROM node:18-alpine

WORKDIR /app

# Copia as dependências instaladas do estágio de build
COPY --from=builder /app/backend/node_modules ./backend/node_modules

# Copia os arquivos da aplicação
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend ./frontend
COPY --from=builder /app/assets ./assets

# Expõe a porta que o servidor vai usar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "backend/server.js"]
