#!/bin/bash

# Hook post-receive pour O2Switch
# Ce fichier doit être placé sur le serveur O2Switch dans :
# ~/git/portfolio.git/hooks/post-receive

# Configuration
TARGET_DIR="/home/votre_username/public_html"
GIT_DIR="/home/votre_username/git/portfolio.git"
WORK_TREE="$TARGET_DIR"
BRANCH="main"

# Vérifier quelle branche est poussée
while read oldrev newrev ref
do
    # On ne traite que la branche main
    if [[ $ref =~ .*/main$ ]]; then
        echo "───────────────────────────────────────────────────"
        echo "🚀 Déploiement de la branche main"
        echo "───────────────────────────────────────────────────"
        
        # Checkout du code
        echo "📦 Checkout du code..."
        git --work-tree="$WORK_TREE" --git-dir="$GIT_DIR" checkout -f "$BRANCH"
        
        # Aller dans le répertoire de travail
        cd "$WORK_TREE"
        
        # Vérifier si package.json existe (projet Node.js)
        if [ -f "package.json" ]; then
            echo "📥 Installation des dépendances..."
            npm install --production
            
            echo "🔨 Build du projet..."
            npm run build
            
            # Déplacer les fichiers du build vers la racine
            if [ -d "dist" ]; then
                echo "📁 Copie des fichiers de production..."
                cp -r dist/* .
                
                # Nettoyer les fichiers de dev
                echo "🧹 Nettoyage..."
                rm -rf node_modules src dist *.config.js package*.json
            fi
        fi
        
        # S'assurer que .htaccess est présent
        if [ ! -f ".htaccess" ]; then
            echo "⚠️  .htaccess manquant, création..."
            cat > .htaccess << 'HTACCESS'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
HTACCESS
        fi
        
        echo "───────────────────────────────────────────────────"
        echo "✅ Déploiement terminé avec succès !"
        echo "───────────────────────────────────────────────────"
        echo "🌐 Votre site est maintenant à jour"
        echo ""
    fi
done
