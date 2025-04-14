# Spotify Listening History Analyzer

A React application that analyzes your Spotify listening history data, providing insights and visualizations about your music listening habits.

## Overview
This application helps you understand your music preferences by analyzing the JSON files from Spotify's Extended Streaming History. It provides various statistics, charts, and filterable lists of your top tracks and artists.

## Features

- **Data Import and Analysis**: Automatically loads and processes your Spotify Extended Streaming History JSON files
- **Interactive Dashboard**: View comprehensive statistics about your listening history
- **Top Tracks Analysis**: See your most played tracks with filtering, sorting, and search capabilities
- **Artist Insights**: Explore your favorite artists with visual representations of listening patterns
- **Time-based Filtering**: Filter your data by specific years to see how your tastes have evolved
- **Search Functionality**: Quickly find specific tracks or artists across your listening history
- **Responsive Design**: Works on both desktop and mobile devices

## Project Structure
```
Spotify-Analyzer/
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
├── Spotify-Extended-Streaming-History/ # Directory for your Spotify data files
└── src/                # Source code
    ├── App.css         # Main application styles
    ├── App.tsx         # Main React component
    ├── index.css       # Global styles
    ├── main.tsx        # Application entry point
    ├── vite-env.d.ts   # Vite type declarations
    ├── assets/         # Project assets like images, icons, etc.
    └── components/     # React components
        ├── FileLoader.tsx       # Component for loading data files
        ├── SearchBar.tsx        # Reusable search component
        ├── StatsOverview.tsx    # Component for displaying stats summary
        ├── StatsView.tsx        # Detailed statistics view
        ├── TopArtistsView.tsx   # Artists analysis component
        ├── TopTracksView.tsx    # Tracks analysis component
        ├── types.ts             # TypeScript type definitions
        └── YearSelector.tsx     # Year filtering component
```

## Setup and Installation

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Your Spotify Extended Streaming History JSON files

### Getting Your Spotify Data
1. Request your data from Spotify by going to your account page on Spotify's website
2. Navigate to Privacy Settings and request a download of your data
3. Spotify will send you an email when your data is ready to download
4. Download and extract the files, focusing on the "Spotify-Extended-Streaming-History" folder

### Local Development
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Place your Spotify data files in the `/Spotify-Extended-Streaming-History/` directory
4. Start the development server:
   ```bash
   npm run dev
   ```
5. The application will be available at [http://localhost:5173](http://localhost:5173)

## Building for Production
```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory.

## Docker Deployment
This project includes Docker configuration for easy deployment.

### Building Docker Image
```bash
docker build -t spotify-analyzer .
```

### Running Docker Container
```bash
docker run -p 8080:80 spotify-analyzer
```
The application will be available at [http://localhost:8080](http://localhost:8080)

## Technologies Used
- React
- TypeScript
- Chart.js & react-chartjs-2 for visualizations
- Vite for fast development and building
- CSS for styling (no framework, custom designed)

## License
[MIT License]

---

# Analyseur d'Historique d'Écoute Spotify

Une application React qui analyse vos données d'historique d'écoute Spotify, fournissant des insights et des visualisations sur vos habitudes d'écoute musicale.

## Aperçu
Cette application vous aide à comprendre vos préférences musicales en analysant les fichiers JSON de l'historique d'écoute étendu de Spotify. Elle fournit diverses statistiques, graphiques et listes filtrables de vos morceaux et artistes préférés.

## Fonctionnalités

- **Importation et Analyse de Données** : Charge et traite automatiquement vos fichiers JSON d'historique d'écoute étendu Spotify
- **Tableau de Bord Interactif** : Visualisez des statistiques complètes sur votre historique d'écoute
- **Analyse des Morceaux Favoris** : Consultez vos morceaux les plus écoutés avec des capacités de filtrage, de tri et de recherche
- **Aperçu des Artistes** : Explorez vos artistes préférés avec des représentations visuelles de vos habitudes d'écoute
- **Filtrage Temporel** : Filtrez vos données par années spécifiques pour voir comment vos goûts ont évolué
- **Fonctionnalité de Recherche** : Trouvez rapidement des morceaux ou artistes spécifiques dans votre historique d'écoute
- **Design Responsive** : Fonctionne aussi bien sur ordinateur que sur mobile

## Structure du Projet
```
Spotify-Analyzer/
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
├── Spotify-Extended-Streaming-History/ # Répertoire pour vos fichiers de données Spotify
└── src/                # Code source
    ├── App.css         # Styles de l'application principale
    ├── App.tsx         # Composant React principal
    ├── index.css       # Styles globaux
    ├── main.tsx        # Point d'entrée de l'application
    ├── vite-env.d.ts   # Déclarations de types pour Vite
    ├── assets/         # Ressources du projet comme images, icônes, etc.
    └── components/     # Composants React
        ├── FileLoader.tsx       # Composant pour charger les fichiers de données
        ├── SearchBar.tsx        # Composant de recherche réutilisable
        ├── StatsOverview.tsx    # Composant pour afficher le résumé des statistiques
        ├── StatsView.tsx        # Vue détaillée des statistiques
        ├── TopArtistsView.tsx   # Composant d'analyse des artistes
        ├── TopTracksView.tsx    # Composant d'analyse des morceaux
        ├── types.ts             # Définitions de types TypeScript
        └── YearSelector.tsx     # Composant de filtrage par année
```

## Installation et Configuration

### Prérequis
- Node.js (v18 ou ultérieur)
- npm ou yarn
- Vos fichiers JSON d'historique d'écoute étendu Spotify

### Obtenir Vos Données Spotify
1. Demandez vos données à Spotify en allant sur la page de votre compte sur le site web de Spotify
2. Accédez aux paramètres de confidentialité et demandez un téléchargement de vos données
3. Spotify vous enverra un email lorsque vos données seront prêtes à être téléchargées
4. Téléchargez et extrayez les fichiers, en vous concentrant sur le dossier "Spotify-Extended-Streaming-History"

### Développement Local
1. Clonez le dépôt
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Placez vos fichiers de données Spotify dans le répertoire `/Spotify-Extended-Streaming-History/`
4. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```
5. L'application sera disponible à l'adresse [http://localhost:5173](http://localhost:5173)

## Construction pour la Production
```bash
npm run build
```
Les artefacts de build seront stockés dans le répertoire `dist/`.

## Déploiement Docker
Ce projet inclut une configuration Docker pour un déploiement facile.

### Construction de l'Image Docker
```bash
docker build -t spotify-analyzer .
```

### Exécution du Conteneur Docker
```bash
docker run -p 8080:80 spotify-analyzer
```
L'application sera disponible à l'adresse [http://localhost:8080](http://localhost:8080)

## Technologies Utilisées
- React
- TypeScript
- Chart.js & react-chartjs-2 pour les visualisations
- Vite pour un développement et une construction rapides
- CSS pour le style (pas de framework, design personnalisé)

## Licence
[Licence MIT]
