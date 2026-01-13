#!/bin/bash

# Script de déploiement pour O2Switch
# Ce script build le projet et le prépare pour le déploiement

echo "🚀 Démarrage du déploiement..."

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé. Veuillez installer Node.js et npm.${NC}"
    exit 1
fi

# Installer les dépendances si nécessaire
echo -e "${BLUE}📦 Vérification des dépendances...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📥 Installation des dépendances...${NC}"
    npm install
fi

# Build du projet
echo -e "${BLUE}🔨 Build du projet...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erreur lors du build${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build réussi !${NC}"

# Créer une archive pour faciliter l'upload
echo -e "${BLUE}📦 Création de l'archive de déploiement...${NC}"
cd dist
zip -r ../portfolio-deploy.zip . > /dev/null 2>&1
cd ..

echo -e "${GREEN}✅ Archive créée : portfolio-deploy.zip${NC}"

# Instructions
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Déploiement préparé avec succès !${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}📋 Prochaines étapes :${NC}"
echo ""
echo "1️⃣  Connectez-vous à votre cPanel O2Switch"
echo "    → https://votredomaine.com:2083"
echo ""
echo "2️⃣  Ouvrez le Gestionnaire de fichiers (File Manager)"
echo ""
echo "3️⃣  Allez dans le dossier 'public_html'"
echo ""
echo "4️⃣  Uploadez l'archive 'portfolio-deploy.zip'"
echo ""
echo "5️⃣  Extrayez l'archive dans public_html"
echo ""
echo "6️⃣  Visitez votre site : https://votredomaine.com"
echo ""
echo -e "${BLUE}📝 Alternative FTP :${NC}"
echo "   - Utilisez FileZilla ou Cyberduck"
echo "   - Uploadez le contenu du dossier 'dist/' vers 'public_html/'"
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
