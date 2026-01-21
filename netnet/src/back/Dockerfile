FROM node:20-alpine

WORKDIR /app

# (optionnel) utile si tu fais des healthchecks HTTP depuis le container
RUN apk add --no-cache wget

# Installer les dépendances (couche cache efficace)
COPY package*.json ./
RUN npm ci --omit=dev

# Copier le code
COPY . .

# Documentaire : le backend écoute sur 3000
EXPOSE 3000

# Lancement
CMD ["node", "app.js"]
