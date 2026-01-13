# 🚀 Déploiement via Git sur O2Switch

Guide complet pour déployer votre portfolio automatiquement via Git sur O2Switch.

---

## 📋 Table des matières

1. [Pourquoi Git ?](#pourquoi-git)
2. [Méthode 1 : GitHub Actions (Recommandé)](#méthode-1-github-actions)
3. [Méthode 2 : Git Push Direct](#méthode-2-git-push-direct)
4. [Configuration initiale](#configuration-initiale)
5. [Utilisation quotidienne](#utilisation-quotidienne)
6. [Dépannage](#dépannage)

---

## 💡 Pourquoi Git ?

### Avantages

✅ **Déploiement en 1 commande** : `./deploy-git.sh` ou `git push`  
✅ **Automatique** : Build et déploiement sans intervention  
✅ **Versionné** : Historique complet, retour en arrière facile  
✅ **Professionnel** : Workflow moderne et standard  
✅ **Synchronisé** : GitHub + O2Switch toujours à jour  

### Inconvénients

⚠️ Configuration initiale un peu technique  
⚠️ Nécessite SSH activé sur O2Switch  

---

## 🎯 Méthode 1 : GitHub Actions (Recommandé)

**La méthode la plus simple et automatique !**

### Principe

1. Vous poussez sur GitHub : `git push`
2. GitHub Actions build automatiquement
3. Les fichiers sont déployés sur O2Switch via FTP

### Configuration

#### Étape 1 : Créer le workflow GitHub Actions

Créez le fichier `.github/workflows/deploy.yml` :

```yaml
name: Déploiement O2Switch

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: 📦 Checkout du code
        uses: actions/checkout@v4
      
      - name: 🔧 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: 📥 Installation des dépendances
        run: npm ci
      
      - name: 🔨 Build du projet
        run: npm run build
      
      - name: 📤 Déploiement FTP vers O2Switch
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/
          server-dir: ./public_html/
          dangerous-clean-slate: false
```

#### Étape 2 : Configurer les secrets GitHub

1. Allez sur votre repository GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Cliquez sur **New repository secret**
4. Ajoutez 3 secrets :

| Nom | Valeur |
|-----|--------|
| `FTP_SERVER` | `ftp.votredomaine.com` |
| `FTP_USERNAME` | Votre username cPanel |
| `FTP_PASSWORD` | Votre mot de passe cPanel |

#### Étape 3 : Push et c'est fini !

```bash
git add .
git commit -m "Setup GitHub Actions deployment"
git push
```

✅ **C'est tout !** À chaque push, votre site sera automatiquement déployé.

### Vérification

1. Allez dans l'onglet **Actions** de votre repo GitHub
2. Vous verrez le workflow en cours d'exécution
3. Attendez quelques minutes
4. Votre site est à jour ! 🎉

---

## 🎯 Méthode 2 : Git Push Direct

**Pour un contrôle total avec SSH**

### Prérequis

- SSH activé sur votre compte O2Switch
- Accès terminal SSH au serveur

### Configuration sur O2Switch

#### Étape 1 : Connexion SSH

```bash
ssh votre_username@votreserveur.o2switch.net
```

#### Étape 2 : Créer le repository Git bare

```bash
# Créer le dossier pour les repos Git
mkdir -p ~/git/portfolio.git
cd ~/git/portfolio.git

# Initialiser un repo bare (sans fichiers de travail)
git init --bare
```

#### Étape 3 : Créer le hook post-receive

```bash
# Créer le hook
nano ~/git/portfolio.git/hooks/post-receive
```

Copiez le contenu de `post-receive-hook.sh` fourni dans le projet.

**Important** : Modifiez ces lignes dans le hook :

```bash
TARGET_DIR="/home/VOTRE_USERNAME/public_html"
GIT_DIR="/home/VOTRE_USERNAME/git/portfolio.git"
```

Remplacez `VOTRE_USERNAME` par votre vrai username cPanel.

Rendez le hook exécutable :

```bash
chmod +x ~/git/portfolio.git/hooks/post-receive
```

#### Étape 4 : Installer Node.js sur O2Switch

```bash
# Vérifier si Node.js est installé
node -v

# Si non installé, utilisez nvm (recommandé)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

### Configuration locale (sur votre Mac)

#### Étape 1 : Ajouter le remote O2Switch

```bash
cd /Users/williampeynichou/Portfolio/portfolio

# Ajouter le remote
git remote add o2switch ssh://votre_username@votreserveur.o2switch.net/~/git/portfolio.git

# Vérifier
git remote -v
```

Vous devriez voir :
```
origin    git@github.com:WilliamPeynichou/Portfolio_.git (fetch)
origin    git@github.com:WilliamPeynichou/Portfolio_.git (push)
o2switch  ssh://votre_username@votreserveur.o2switch.net/~/git/portfolio.git (fetch)
o2switch  ssh://votre_username@votreserveur.o2switch.net/~/git/portfolio.git (push)
```

#### Étape 2 : Premier déploiement

```bash
# Push vers O2Switch
git push o2switch main
```

Le hook post-receive va :
1. ✅ Checkout le code
2. ✅ Installer les dépendances
3. ✅ Builder le projet
4. ✅ Copier les fichiers de production
5. ✅ Nettoyer les fichiers de dev

---

## 🚀 Utilisation quotidienne

### Avec GitHub Actions (Méthode 1)

```bash
# Faire vos modifications...

# Commit et push
git add .
git commit -m "Votre message"
git push

# ✅ C'est tout ! GitHub Actions s'occupe du reste
```

### Avec Git Push Direct (Méthode 2)

#### Option A : Script automatique (Recommandé)

```bash
./deploy-git.sh
```

Ce script va :
- ✅ Builder le projet localement
- ✅ Commiter et pusher vers GitHub
- ✅ Pusher vers O2Switch
- ✅ Le hook fera le build sur le serveur

#### Option B : Commandes manuelles

```bash
# Build local
npm run build

# Commit
git add .
git commit -m "Mise à jour du portfolio"

# Push vers GitHub
git push origin main

# Push vers O2Switch (déploiement)
git push o2switch main
```

### Push vers GitHub ET O2Switch en même temps

Ajoutez cette configuration à votre `.git/config` :

```ini
[remote "all"]
    url = git@github.com:WilliamPeynichou/Portfolio_.git
    url = ssh://votre_username@votreserveur.o2switch.net/~/git/portfolio.git
```

Puis utilisez :

```bash
git push all main  # Push vers les 2 en même temps !
```

---

## 🔄 Workflow complet recommandé

### Développement quotidien

```bash
# 1. Travailler sur votre code
npm run dev

# 2. Tester vos modifications
# ...

# 3. Déployer
./deploy-git.sh

# Le script fait tout automatiquement :
# - Build
# - Commit
# - Push GitHub
# - Déploiement O2Switch
```

---

## 🔒 Configuration SSH avancée

Pour éviter de taper votre mot de passe à chaque fois :

### Générer une clé SSH

```bash
# Si vous n'avez pas encore de clé SSH
ssh-keygen -t ed25519 -C "votre.email@example.com"

# Copier la clé publique vers O2Switch
ssh-copy-id votre_username@votreserveur.o2switch.net
```

### Configurer SSH config

Éditez `~/.ssh/config` :

```
Host o2switch
    HostName votreserveur.o2switch.net
    User votre_username
    IdentityFile ~/.ssh/id_ed25519
    Port 22
```

Maintenant vous pouvez utiliser :

```bash
ssh o2switch  # Au lieu de ssh votre_username@votreserveur...
```

Et dans votre remote Git :

```bash
git remote set-url o2switch ssh://o2switch/~/git/portfolio.git
```

---

## 📊 Comparaison des méthodes

| Critère | GitHub Actions | Git Push Direct |
|---------|----------------|-----------------|
| **Facilité setup** | ⭐⭐⭐ Facile | ⭐⭐ Moyen |
| **Déploiement** | ⭐⭐⭐ Automatique | ⭐⭐⭐ Automatique |
| **Vitesse** | ⭐⭐ ~2-5 min | ⭐⭐⭐ ~30 sec |
| **Logs** | ⭐⭐⭐ Interface GitHub | ⭐⭐ Terminal |
| **Build location** | ☁️ GitHub | 🖥️ O2Switch |
| **SSH requis** | ❌ Non | ✅ Oui |
| **Gratuit** | ✅ Oui | ✅ Oui |

**Recommandation** : 
- 👍 **GitHub Actions** si vous préférez la simplicité
- 👍 **Git Push Direct** si vous voulez plus de contrôle

---

## 🐛 Dépannage

### GitHub Actions

#### Le workflow ne se déclenche pas

**Solution** :
1. Vérifiez que le fichier est bien dans `.github/workflows/deploy.yml`
2. Allez dans **Actions** → Activez les workflows si désactivés
3. Push un nouveau commit pour déclencher

#### Erreur FTP

**Solution** :
1. Vérifiez vos secrets GitHub (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD)
2. Testez la connexion FTP manuellement avec FileZilla
3. Vérifiez que le dossier `public_html` existe

### Git Push Direct

#### `Permission denied (publickey)`

**Solution** :
```bash
# Vérifier que votre clé SSH est ajoutée
ssh-add -l

# Ajouter votre clé si nécessaire
ssh-add ~/.ssh/id_ed25519

# Tester la connexion
ssh votre_username@votreserveur.o2switch.net
```

#### Le hook ne s'exécute pas

**Solution** :
```bash
# Sur le serveur O2Switch
cd ~/git/portfolio.git/hooks/

# Vérifier les permissions
ls -la post-receive

# Doit être exécutable (x)
chmod +x post-receive

# Tester manuellement
./post-receive
```

#### Node.js non trouvé sur le serveur

**Solution** :
```bash
# Se connecter au serveur
ssh o2switch

# Vérifier Node.js
which node
node -v

# Ajouter au PATH dans le hook si nécessaire
export PATH=$PATH:$HOME/.nvm/versions/node/v20.x.x/bin
```

#### Build échoue sur le serveur

**Solution** :
```bash
# Se connecter au serveur
ssh o2switch

# Aller dans public_html
cd ~/public_html

# Vérifier les logs
cat error_log

# Tester le build manuellement
npm run build
```

---

## 📈 Optimisations avancées

### Cache des dépendances

Dans le hook post-receive, ajoutez :

```bash
# Au lieu de npm install à chaque fois
if [ -f "package-lock.json" ]; then
    if [ -d "../.npm-cache/node_modules" ]; then
        cp -r ../.npm-cache/node_modules ./
    fi
    npm ci --cache ../.npm-cache
    cp -r node_modules ../.npm-cache/
fi
```

### Build conditionnel

Ne rebuild que si nécessaire :

```bash
# Dans le hook
if git diff-tree --name-only --no-commit-id $newrev | grep -qE "src/|package.json"; then
    echo "📝 Changements détectés, rebuild nécessaire"
    npm run build
else
    echo "⚡ Pas de changements, skip build"
fi
```

### Notifications

Recevez un email après chaque déploiement :

```bash
# À la fin du hook post-receive
echo "Déploiement réussi à $(date)" | mail -s "Portfolio déployé" votre.email@example.com
```

---

## 📝 Commandes utiles

### Voir l'historique des déploiements

```bash
# Sur le serveur O2Switch
cd ~/git/portfolio.git
git log --oneline -10
```

### Rollback à une version précédente

```bash
# Trouver le commit
git log --oneline

# Rollback localement
git reset --hard COMMIT_HASH

# Force push vers O2Switch
git push o2switch main --force
```

### Vérifier le statut du déploiement

```bash
# Local
git log origin/main..o2switch/main  # Voir les différences

# Sur le serveur
ssh o2switch "cd ~/public_html && ls -la && git log -1"
```

---

## 🔐 Sécurité

### Ne jamais commiter

Ajoutez à `.gitignore` :

```gitignore
# Fichiers sensibles
.env
.env.local
.env.production
*.key
*.pem

# Fichiers de config avec mots de passe
deploy-config.sh

# Node modules
node_modules/
dist/
```

### Variables d'environnement

Pour les secrets, utilisez des variables d'environnement :

```bash
# Sur le serveur, créez un fichier ~/.env-portfolio
export API_KEY="votre_clé_secrète"

# Dans le hook, chargez-le
source ~/.env-portfolio
```

---

## 🎉 Conclusion

Avec Git, vous avez maintenant un workflow professionnel :

```
Code → Commit → Push → Build automatique → Déploiement → ✅ En ligne !
```

**Une seule commande** : `./deploy-git.sh` ou `git push`

---

## 📚 Ressources

- [Documentation Git](https://git-scm.com/doc)
- [GitHub Actions](https://docs.github.com/en/actions)
- [O2Switch SSH](https://faq.o2switch.fr/hebergement-mutualise/acces-ssh)
- [Git Hooks](https://git-scm.com/book/fr/v2/Personnalisation-de-Git-Crochets-Git)

---

**Dernière mise à jour** : Janvier 2026  
**Auteur** : Configuration pour O2Switch
