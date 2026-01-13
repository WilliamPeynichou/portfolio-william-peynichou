#!/bin/bash

# Script de déploiement Git vers O2Switch
# Ce script push vers GitHub et déploie automatiquement sur O2Switch

set -e  # Arrêter en cas d'erreur

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}🚀 Déploiement Git vers O2Switch${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Vérifier si on est dans un repository Git
if [ ! -d .git ]; then
    echo -e "${RED}❌ Erreur : Ce n'est pas un repository Git${NC}"
    exit 1
fi

# Vérifier s'il y a des changements
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  Aucun changement détecté${NC}"
    read -p "Voulez-vous quand même déployer ? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}Déploiement annulé${NC}"
        exit 0
    fi
else
    echo -e "${BLUE}📝 Changements détectés :${NC}"
    git status --short
    echo ""
fi

# Build du projet
echo -e "${BLUE}🔨 Build du projet...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erreur lors du build${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build réussi !${NC}"
echo ""

# Demander un message de commit si nécessaire
if [ ! -z "$(git status --porcelain)" ]; then
    echo -e "${BLUE}💬 Message de commit :${NC}"
    read -p "Entrez un message de commit (ou appuyez sur Entrée pour 'Update portfolio'): " COMMIT_MSG
    
    if [ -z "$COMMIT_MSG" ]; then
        COMMIT_MSG="Update portfolio"
    fi
    
    echo ""
    echo -e "${BLUE}📦 Commit et push vers GitHub...${NC}"
    
    # Ajouter tous les fichiers
    git add .
    
    # Commit
    git commit -m "$COMMIT_MSG"
    
    # Push vers GitHub
    git push origin main
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erreur lors du push vers GitHub${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Push vers GitHub réussi !${NC}"
else
    echo -e "${YELLOW}⚠️  Aucun changement à commiter${NC}"
fi

echo ""
echo -e "${BLUE}📤 Déploiement sur O2Switch...${NC}"

# Vérifier si le remote o2switch existe
if git remote | grep -q "o2switch"; then
    echo -e "${BLUE}Pushing vers O2Switch...${NC}"
    git push o2switch main --force
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erreur lors du push vers O2Switch${NC}"
        echo -e "${YELLOW}💡 Assurez-vous d'avoir configuré le remote 'o2switch'${NC}"
        echo -e "${YELLOW}   Voir : cat DEPLOIEMENT-GIT.md${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Déploiement O2Switch réussi !${NC}"
else
    echo -e "${YELLOW}⚠️  Remote 'o2switch' non configuré${NC}"
    echo -e "${YELLOW}📖 Pour configurer le déploiement Git automatique :${NC}"
    echo -e "${YELLOW}   → cat DEPLOIEMENT-GIT.md${NC}"
fi

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Déploiement terminé avec succès !${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}🌐 Votre site devrait être mis à jour dans quelques instants${NC}"
echo ""
