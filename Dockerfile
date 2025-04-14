FROM node:22-alpine as build

WORKDIR /app

# Installation des dépendances
COPY package.json package-lock.json* ./
RUN npm ci

# Copie des fichiers sources
COPY . .

# Build de l'application
RUN npm run build

# Étape de production avec Nginx
FROM nginx:alpine

# Mise à jour des packages pour résoudre les vulnérabilités
RUN apk update && \
    apk upgrade

# Copie de la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers buildés depuis l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

# Exposition du port 80
EXPOSE 80

# Démarrage de Nginx
CMD ["nginx", "-g", "daemon off;"]