# 🚀 Guide de Déploiement sur O2Switch

Ce guide vous accompagne étape par étape pour héberger votre portfolio React sur O2Switch.

---

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Méthode Automatique (Recommandée)](#méthode-automatique)
3. [Méthode Manuelle - Via cPanel](#méthode-1-via-cpanel)
4. [Méthode Manuelle - Via FTP](#méthode-2-via-ftp)
5. [Méthode Avancée - Via SSH](#méthode-3-via-ssh)
6. [Configuration SSL](#configuration-ssl)
7. [Vérification](#vérification)
8. [Mises à jour futures](#mises-à-jour-futures)
9. [Dépannage](#dépannage)

---

## 🔧 Prérequis

- ✅ Un compte O2Switch actif
- ✅ Node.js et npm installés localement
- ✅ Vos identifiants cPanel (reçus par email lors de l'inscription)

### Informations de connexion O2Switch

Vous devriez avoir reçu un email contenant :
- **URL cPanel** : `https://votredomaine.com:2083` ou `https://cpanel.o2switch.net`
- **Nom d'utilisateur** : votre username cPanel
- **Mot de passe** : votre mot de passe cPanel
- **Serveur FTP** : `ftp.votredomaine.com` ou `votreserveur.o2switch.net`

---

## 🎯 Méthode Automatique (Recommandée)

### Étape 1 : Préparer le déploiement

Dans votre terminal, exécutez simplement :

```bash
./deploy.sh
```

Ce script va :
- ✅ Vérifier les dépendances
- ✅ Builder le projet avec optimisations
- ✅ Créer une archive `portfolio-deploy.zip` prête à l'emploi

### Étape 2 : Upload sur O2Switch

Vous avez maintenant deux fichiers importants :
- `portfolio-deploy.zip` : Archive de tous vos fichiers
- `dist/` : Dossier contenant les fichiers de production

Choisissez l'une des méthodes ci-dessous pour uploader ces fichiers.

---

## 📤 Méthode 1 : Via cPanel

### Avantages
- ✅ Pas besoin d'installer de logiciel
- ✅ Interface intuitive
- ✅ Idéal pour les débutants

### Étapes

1. **Connexion à cPanel**
   - Rendez-vous sur `https://votredomaine.com:2083`
   - Connectez-vous avec vos identifiants

2. **Ouvrir le Gestionnaire de fichiers**
   - Dans cPanel, cherchez "Gestionnaire de fichiers" (File Manager)
   - Cliquez dessus

3. **Naviguer vers public_html**
   - Double-cliquez sur le dossier `public_html`
   - C'est le dossier racine de votre site web

4. **Upload de l'archive**
   - Cliquez sur le bouton "Télécharger" (Upload) en haut
   - Sélectionnez `portfolio-deploy.zip` depuis votre ordinateur
   - Attendez la fin de l'upload (une barre de progression s'affiche)

5. **Extraction de l'archive**
   - Faites un clic droit sur `portfolio-deploy.zip`
   - Sélectionnez "Extraire" (Extract)
   - Confirmez l'extraction dans le dossier actuel
   - Une fois terminé, vous pouvez supprimer l'archive .zip

6. **Vérifier les fichiers**
   - Vous devriez voir dans `public_html` :
     - `index.html`
     - `.htaccess`
     - Dossier `assets/`
     - Et d'autres fichiers...

✅ **C'est terminé !** Votre site est en ligne.

---

## 📤 Méthode 2 : Via FTP

### Avantages
- ✅ Transfert de fichiers rapide
- ✅ Gestion de plusieurs sites facilitée
- ✅ Synchronisation automatique possible

### Prérequis
Installez un client FTP comme :
- [FileZilla](https://filezilla-project.org/) (Windows, Mac, Linux)
- [Cyberduck](https://cyberduck.io/) (Mac, Windows)
- [Transmit](https://panic.com/transmit/) (Mac)

### Configuration FileZilla

1. **Ouvrir FileZilla**

2. **Créer une nouvelle connexion**
   - Fichier → Gestionnaire de sites → Nouveau site

3. **Paramètres de connexion**
   ```
   Hôte : ftp.votredomaine.com
   Port : 21
   Protocole : FTP - File Transfer Protocol
   Chiffrement : Utiliser FTP explicite sur TLS si disponible
   Type d'authentification : Normal
   Identifiant : votre_username_cpanel
   Mot de passe : votre_mot_de_passe
   ```

4. **Se connecter**
   - Cliquez sur "Connexion"
   - Acceptez le certificat si demandé

5. **Navigation**
   - Côté gauche : votre ordinateur
   - Côté droit : le serveur O2Switch
   - Naviguez vers `public_html` côté serveur

6. **Transfert des fichiers**
   - Sur votre ordinateur, naviguez vers le dossier `dist/`
   - **Sélectionnez TOUT le contenu du dossier dist** (pas le dossier lui-même)
   - Glissez-déposez vers `public_html` côté serveur
   - Attendez la fin du transfert (peut prendre quelques minutes)

✅ **Terminé !** Votre site est déployé.

---

## 📤 Méthode 3 : Via SSH (Avancé)

### Avantages
- ✅ Le plus rapide
- ✅ Automatisable
- ✅ Contrôle total

### Prérequis
- Activation SSH sur votre compte O2Switch (contactez le support si nécessaire)
- Terminal avec SSH installé

### Étapes

1. **Build local**
   ```bash
   npm run build
   ```

2. **Upload via SCP**
   ```bash
   scp -r dist/* votre_username@votreserveur.o2switch.net:~/public_html/
   ```

3. **Ou via rsync (recommandé pour les mises à jour)**
   ```bash
   rsync -avz --delete dist/ votre_username@votreserveur.o2switch.net:~/public_html/
   ```

### Script de déploiement automatisé

Créez un fichier `deploy-ssh.sh` :

```bash
#!/bin/bash

# Variables
SERVER="votre_username@votreserveur.o2switch.net"
REMOTE_DIR="~/public_html/"

echo "🔨 Build du projet..."
npm run build

echo "📤 Upload vers O2Switch..."
rsync -avz --delete dist/ $SERVER:$REMOTE_DIR

echo "✅ Déploiement terminé !"
```

Rendez-le exécutable :
```bash
chmod +x deploy-ssh.sh
```

Utilisez-le :
```bash
./deploy-ssh.sh
```

---

## 🔒 Configuration SSL (HTTPS)

O2Switch offre des certificats SSL gratuits via Let's Encrypt.

### Étapes

1. **Connexion à cPanel**
   - Allez sur votre cPanel

2. **SSL/TLS Status**
   - Cherchez "SSL/TLS Status" dans les outils
   - Cliquez dessus

3. **Activer SSL**
   - Trouvez votre domaine dans la liste
   - Cliquez sur "Exécuter AutoSSL" ou "Run AutoSSL"
   - Attendez quelques minutes

4. **Redirection HTTPS automatique**
   
   Le fichier `.htaccess` créé inclut déjà la protection, mais vous pouvez ajouter une redirection HTTP → HTTPS :

   Dans `public_html/.htaccess`, ajoutez au début :

   ```apache
   # Redirection HTTP vers HTTPS
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

✅ Votre site est maintenant sécurisé avec HTTPS !

---

## ✅ Vérification

### Checklist de vérification

1. **Page d'accueil**
   - [ ] Visitez `https://votredomaine.com`
   - [ ] La page s'affiche correctement

2. **Navigation**
   - [ ] Testez les liens de navigation
   - [ ] Les routes React Router fonctionnent
   - [ ] Rafraîchissez une page interne (F5) → devrait fonctionner grâce au `.htaccess`

3. **Ressources**
   - [ ] Les images se chargent
   - [ ] Les styles CSS sont appliqués
   - [ ] Les animations fonctionnent

4. **Mobile**
   - [ ] Testez sur mobile ou avec les outils de développement
   - [ ] Le design responsive fonctionne

5. **Performance**
   - [ ] Testez la vitesse sur [PageSpeed Insights](https://pagespeed.web.dev/)
   - [ ] Testez sur [GTmetrix](https://gtmetrix.com/)

---

## 🔄 Mises à jour futures

Pour mettre à jour votre site après des modifications :

### Méthode rapide

```bash
# 1. Build
npm run build

# 2. Upload (choisissez votre méthode préférée)

# Via script automatique
./deploy.sh

# Via FTP : reconnectez-vous et transférez le nouveau contenu de dist/

# Via SSH
rsync -avz --delete dist/ votre_username@votreserveur.o2switch.net:~/public_html/
```

### Conseil pour éviter les caches

Après une mise à jour, si vous ne voyez pas les changements :
- Videz le cache de votre navigateur (Ctrl+Shift+R ou Cmd+Shift+R)
- Attendez quelques minutes pour la propagation des CDN

---

## 🔧 Dépannage

### Problème : "Page blanche" ou erreur 404

**Cause** : Le `.htaccess` n'est pas configuré correctement ou absent.

**Solution** :
1. Vérifiez que `.htaccess` est bien dans `public_html/`
2. Vérifiez le contenu du fichier (voir `public/.htaccess` dans le projet)
3. Assurez-vous que les fichiers cachés sont visibles (commence par un point)

### Problème : Les images ne s'affichent pas

**Cause** : Chemins incorrects ou fichiers non uploadés.

**Solution** :
1. Vérifiez que le dossier `assets/` a bien été uploadé
2. Ouvrez la console du navigateur (F12) pour voir les erreurs
3. Vérifiez les chemins dans le code

### Problème : Styles CSS manquants

**Cause** : Fichiers CSS non uploadés ou chemins incorrects.

**Solution** :
1. Vérifiez que tous les fichiers `.css` du dossier `assets/` ont été uploadés
2. Videz le cache du navigateur

### Problème : "Connection failed" en FTP

**Cause** : Identifiants incorrects ou pare-feu.

**Solution** :
1. Vérifiez vos identifiants (email de O2Switch)
2. Essayez le mode passif dans FileZilla
3. Vérifiez que votre pare-feu autorise la connexion
4. Essayez SFTP (port 22) au lieu de FTP

### Problème : Le site est lent

**Solutions** :
1. Optimisez les images (compressez-les avec TinyPNG)
2. Activez la compression dans `.htaccess` (déjà fait)
3. Utilisez le cache du navigateur (déjà configuré)
4. Envisagez un CDN comme Cloudflare

### Problème : Erreur 500

**Cause** : Problème serveur ou `.htaccess` invalide.

**Solution** :
1. Renommez temporairement `.htaccess` en `htaccess.bak`
2. Si le site fonctionne, il y a un problème dans `.htaccess`
3. Contactez le support O2Switch pour activer les modules nécessaires

---

## 📞 Support

### O2Switch
- **Support** : https://www.o2switch.fr/support/
- **Documentation** : https://faq.o2switch.fr/
- **Téléphone** : Consultez votre espace client

### Ressources utiles
- [Documentation Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [O2Switch FAQ](https://faq.o2switch.fr/)

---

## 🎉 Félicitations !

Votre portfolio est maintenant en ligne ! 

N'oubliez pas de :
- ✅ Configurer SSL/HTTPS
- ✅ Sauvegarder régulièrement votre code
- ✅ Tester votre site sur différents navigateurs
- ✅ Optimiser pour le SEO

---

**Dernière mise à jour** : Janvier 2026
