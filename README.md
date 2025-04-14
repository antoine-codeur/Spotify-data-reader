# Portfolio Project

This portfolio project showcases web development skills using React, TypeScript, and Vite, containerized with Docker and deployed with CI/CD automation.

## Overview
This document provides essential information about the Portfolio project, its structure, setup, and deployment processes.

## Project Structure
```
Portfolio/
├── Dockerfile          # Docker configuration for containerization
├── eslint.config.js    # ESLint configuration for code quality
├── index.html          # Main HTML entry point
├── nginx.conf          # Nginx configuration for serving in production
├── package.json        # NPM dependencies and scripts
├── README.md           # Project overview and basic instructions
├── tsconfig*.json      # TypeScript configuration files
├── vite.config.ts      # Vite bundler configuration
├── docs/               # Documentation files
├── public/             # Static assets served as-is
└── src/                # Source code
    ├── App.css         # Main application styles
    ├── App.tsx         # Main React component
    ├── index.css       # Global styles
    ├── main.tsx        # Application entry point
    ├── vite-env.d.ts   # Vite type declarations
    └── assets/         # Project assets like images, icons, etc.
```

## Setup and Installation

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Docker (for containerization)

### Local Development
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The application will be available at [http://localhost:5173](http://localhost:5173)

## Building for Production
```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory.

## Docker Deployment
This project includes Docker configuration for easy deployment.

### Building Docker Image
```bash
docker build -t portfolio .
```

### Running Docker Container
```bash
docker run -p 8080:80 portfolio
```
The application will be available at [http://localhost:8080](http://localhost:8080)

## Continuous Integration/Deployment
This project uses GitHub Actions for CI/CD. The workflow is defined in `.github/workflows/docker-image.yml`.

The CI/CD pipeline will:
1. Build the Docker image
2. Push it to Docker Hub (when merged to main)

### Required Secrets for CI/CD
- `DOCKERHUB_USERNAME`: Your Docker Hub username
- `DOCKERHUB_TOKEN`: Docker Hub access token

## Project Conventions
- We use the [Gitmoji convention](docs/gitmoji-convention.md) for commit messages
- TypeScript for type safety
- ESLint for code quality

## License
[License information]

---

# Projet Portfolio

Ce projet de portfolio met en valeur les compétences de développement web utilisant React, TypeScript et Vite, conteneurisé avec Docker et déployé avec une automatisation CI/CD.

## Aperçu
Ce document fournit des informations essentielles sur le projet Portfolio, sa structure, sa configuration et ses processus de déploiement.

## Structure du Projet
```
Portfolio/
├── Dockerfile          # Configuration Docker pour la conteneurisation
├── eslint.config.js    # Configuration ESLint pour la qualité du code
├── index.html          # Point d'entrée HTML principal
├── nginx.conf          # Configuration Nginx pour la production
├── package.json        # Dépendances NPM et scripts
├── README.md           # Aperçu du projet et instructions de base
├── tsconfig*.json      # Fichiers de configuration TypeScript
├── vite.config.ts      # Configuration du bundler Vite
├── docs/               # Fichiers de documentation
├── public/             # Ressources statiques servies telles quelles
└── src/                # Code source
    ├── App.css         # Styles de l'application principale
    ├── App.tsx         # Composant React principal
    ├── index.css       # Styles globaux
    ├── main.tsx        # Point d'entrée de l'application
    ├── vite-env.d.ts   # Déclarations de types pour Vite
    └── assets/         # Ressources du projet comme images, icônes, etc.
```

## Installation et Configuration

### Prérequis
- Node.js (v18 ou ultérieur)
- npm ou yarn
- Docker (pour la conteneurisation)

### Développement Local
1. Cloner le dépôt
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Démarrer le serveur de développement :
   ```bash
   npm run dev
   ```
4. L'application sera disponible à l'adresse [http://localhost:5173](http://localhost:5173)

## Construction pour la Production
```bash
npm run build
```
Les artéfacts de build seront stockés dans le répertoire `dist/`.

## Déploiement Docker
Ce projet inclut une configuration Docker pour un déploiement facile.

### Construction de l'Image Docker
```bash
docker build -t portfolio .
```

### Exécution du Conteneur Docker
```bash
docker run -p 8080:80 portfolio
```
L'application sera disponible à l'adresse [http://localhost:8080](http://localhost:8080)

## Intégration/Déploiement Continu
Ce projet utilise GitHub Actions pour CI/CD. Le workflow est défini dans `.github/workflows/docker-image.yml`.

Le pipeline CI/CD va :
1. Construire l'image Docker
2. La pousser vers Docker Hub (lors de la fusion avec main)

### Secrets Requis pour CI/CD
- `DOCKERHUB_USERNAME` : Votre nom d'utilisateur Docker Hub
- `DOCKERHUB_TOKEN` : Token d'accès Docker Hub

## Conventions du Projet
- Nous utilisons la [convention Gitmoji](docs/gitmoji-convention.md) pour les messages de commit
- TypeScript pour la sécurité des types
- ESLint pour la qualité du code

## Licence
[Informations sur la licence]
