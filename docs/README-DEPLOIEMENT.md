# 🚀 Déploiement Rapide sur O2Switch

## Démarrage rapide en 3 étapes

### 1️⃣ Préparer le déploiement
```bash
./deploy.sh
```

### 2️⃣ Se connecter à O2Switch
- cPanel : `https://votredomaine.com:2083`
- FTP : `ftp.votredomaine.com`

### 3️⃣ Upload des fichiers
- **Via cPanel** : Uploadez `portfolio-deploy.zip` dans `public_html/` et extrayez
- **Via FTP** : Transférez le contenu de `dist/` vers `public_html/`

---

## 📚 Documentation complète

Pour des instructions détaillées, consultez : **[DEPLOIEMENT-O2SWITCH.md](./DEPLOIEMENT-O2SWITCH.md)**

---

## 📦 Fichiers créés pour le déploiement

- ✅ `public/.htaccess` - Configuration Apache pour React Router
- ✅ `deploy.sh` - Script de build automatique
- ✅ `dist/` - Dossier de production (créé après build)
- ✅ `portfolio-deploy.zip` - Archive prête à uploader

---

## 🔄 Mises à jour

Pour mettre à jour votre site :
```bash
./deploy.sh  # Rebuild et recrée l'archive
# Puis re-upload sur O2Switch
```

---

## 🆘 Besoin d'aide ?

Consultez la section [Dépannage](./DEPLOIEMENT-O2SWITCH.md#dépannage) dans le guide complet.
