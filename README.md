# 🎨 Portfolio William Peynichou

Portfolio personnel développé avec React + Vite, déployé sur O2Switch.

## 🚀 Démarrage rapide

### Installation
```bash
npm install
```

### Développement
```bash
npm run dev
```

### Build de production
```bash
npm run build
```

## 📦 Déploiement

Le projet est configuré pour un déploiement automatique via GitHub Actions vers O2Switch.

### Déploiement automatique
À chaque push sur `main`, GitHub Actions :
1. Build le projet
2. Déploie automatiquement sur O2Switch via FTP

### Déploiement manuel
```bash
npm run build
# Puis uploadez le contenu de dist/ vers votre serveur
```

## 📚 Documentation

Toute la documentation est disponible dans le dossier [`docs/`](./docs/) :

- **[README-DEPLOIEMENT.md](./docs/README-DEPLOIEMENT.md)** - Guide de démarrage rapide
- **[DEPLOIEMENT-O2SWITCH.md](./docs/DEPLOIEMENT-O2SWITCH.md)** - Guide complet O2Switch
- **[DEPLOIEMENT-GIT.md](./docs/DEPLOIEMENT-GIT.md)** - Déploiement via Git
- **[GUIDE-DEPLOIEMENT-COMPLET.md](./docs/GUIDE-DEPLOIEMENT-COMPLET.md)** - Comparaison des méthodes
- **[CHECKLIST-DEPLOIEMENT.md](./docs/CHECKLIST-DEPLOIEMENT.md)** - Checklist de vérification

## 🛠️ Scripts utiles

Les scripts de déploiement sont dans le dossier [`scripts/`](./scripts/) :

```bash
# Déploiement Git automatique
./scripts/deploy-git.sh

# Build et création d'archive
./scripts/deploy.sh
```

## 📁 Structure du projet

```
portfolio/
├── .github/          # Configuration GitHub Actions
├── docs/             # Documentation complète
├── public/           # Fichiers statiques
├── scripts/          # Scripts de déploiement
├── src/              # Code source React
│   ├── assets/       # Images et médias
│   ├── component/    # Composants React
│   ├── context/      # Contextes React
│   └── data/         # Données du portfolio
├── index.html        # Point d'entrée HTML
├── package.json      # Dépendances
└── vite.config.js    # Configuration Vite
```

## 🔧 Technologies

- **React 19** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Three.js** - Animations 3D
- **React Router** - Navigation

## 🌐 Déploiement

- **Hébergement** : O2Switch
- **CI/CD** : GitHub Actions
- **Protocole** : FTP

## 📄 Licence

© 2026 William Peynichou - Portfolio personnel
