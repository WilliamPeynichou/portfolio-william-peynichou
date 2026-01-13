# 📦 Guide de Déploiement Complet - O2Switch

Récapitulatif de toutes les méthodes de déploiement disponibles pour votre portfolio.

---

## 🎯 Quelle méthode choisir ?

| Méthode | Difficulté | Temps | Automatisation | Recommandé pour |
|---------|------------|-------|----------------|-----------------|
| **GitHub Actions** | ⭐ Facile | 5 min setup | ✅ 100% | Tout le monde |
| **Git Push Direct** | ⭐⭐ Moyen | 15 min setup | ✅ 100% | Utilisateurs SSH |
| **FTP** | ⭐⭐ Moyen | 10 min | ⚠️ Manuel | Usage régulier |
| **cPanel** | ⭐ Facile | 5 min | ❌ Manuel | Première fois |
| **Script deploy.sh** | ⭐ Facile | 2 min | ⚠️ Semi-auto | Build local |

---

## 🚀 Méthode 1 : GitHub Actions (Recommandé)

### ✅ Avantages
- Configuration en 5 minutes
- Automatique à 100%
- Pas besoin de SSH
- Interface visuelle sur GitHub
- Build sur GitHub (ne consomme pas vos ressources)

### 📖 Documentation
→ **[README-GIT.md](./README-GIT.md)** - Démarrage rapide  
→ **[DEPLOIEMENT-GIT.md](./DEPLOIEMENT-GIT.md)** - Guide complet

### ⚡ Démarrage rapide

1. **Configurer les secrets GitHub**
   - Repo GitHub → Settings → Secrets → New secret
   - Ajouter : `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`

2. **Push le workflow**
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add deployment workflow"
   git push
   ```

3. **C'est fini !**
   - À chaque `git push`, déploiement automatique
   - Suivi dans l'onglet "Actions"

---

## 🚀 Méthode 2 : Git Push Direct

### ✅ Avantages
- Déploiement ultra-rapide (~30 sec)
- Contrôle total
- Build sur le serveur O2Switch
- Pas de services tiers

### ⚠️ Prérequis
- SSH activé sur O2Switch
- Node.js installé sur le serveur

### 📖 Documentation
→ **[DEPLOIEMENT-GIT.md](./DEPLOIEMENT-GIT.md)** - Section "Git Push Direct"

---

## 📤 Méthode 3 : FTP

### ✅ Avantages
- Contrôle visuel des fichiers
- Pas de configuration complexe
- Idéal pour les mises à jour régulières

### 📖 Documentation
→ **[DEPLOIEMENT-O2SWITCH.md](./DEPLOIEMENT-O2SWITCH.md)** - Section "Via FTP"

### ⚡ Démarrage rapide

1. **Build local**
   ```bash
   npm run build
   ```

2. **Installer FileZilla**
   - Télécharger : https://filezilla-project.org/

3. **Connecter et transférer**
   - Hôte : `ftp.votredomaine.com`
   - User : votre username cPanel
   - Transférer le contenu de `dist/` vers `public_html/`

---

## 🖥️ Méthode 4 : cPanel

### ✅ Avantages
- Le plus simple pour la première fois
- Interface web intuitive
- Pas besoin d'installer de logiciel

### 📖 Documentation
→ **[DEPLOIEMENT-O2SWITCH.md](./DEPLOIEMENT-O2SWITCH.md)** - Section "Via cPanel"

### ⚡ Démarrage rapide

1. **Créer l'archive**
   ```bash
   ./deploy.sh
   ```

2. **Upload sur cPanel**
   - Se connecter : `https://votredomaine.com:2083`
   - Gestionnaire de fichiers → public_html
   - Upload `portfolio-deploy.zip`
   - Extraire l'archive

---

## 🔧 Méthode 5 : Script deploy.sh

### ✅ Avantages
- Build automatique
- Archive ZIP créée
- Prêt pour upload manuel

### 📖 Documentation
→ **[README-DEPLOIEMENT.md](./README-DEPLOIEMENT.md)**

### ⚡ Utilisation

```bash
./deploy.sh
```

Puis uploadez l'archive créée via cPanel ou FTP.

---

## 📊 Comparaison Complète

### Pour le setup initial

**1er choix** : GitHub Actions  
**2ème choix** : cPanel avec deploy.sh  
**3ème choix** : FTP  

### Pour les mises à jour quotidiennes

**1er choix** : GitHub Actions (juste `git push`)  
**2ème choix** : Git Push Direct  
**3ème choix** : FTP avec FileZilla  

### Pour les urgences

**1er choix** : FTP (changement immédiat)  
**2ème choix** : Git Push Direct  
**3ème choix** : cPanel  

---

## 🔄 Workflow Recommandé

### Setup (une seule fois)

```bash
# 1. Configurer GitHub Actions
→ Voir README-GIT.md

# 2. Premier déploiement
git add .
git commit -m "Initial deployment setup"
git push
```

### Usage quotidien

```bash
# Faire vos modifications...
npm run dev  # Tester

# Déployer
git add .
git commit -m "Update portfolio"
git push  # → Déploiement automatique !
```

**C'est tout !** 🎉

---

## 📁 Structure des Fichiers de Déploiement

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml              ← GitHub Actions workflow
│
├── public/
│   └── .htaccess                   ← Config React Router
│
├── deploy.sh                       ← Script build + archive
├── deploy-git.sh                   ← Script Git complet
├── deploy-ssh.sh.example           ← Template SSH
├── post-receive-hook.sh            ← Hook serveur Git
│
├── README-GIT.md                   ← Démarrage rapide Git
├── README-DEPLOIEMENT.md           ← Démarrage rapide général
├── DEPLOIEMENT-GIT.md              ← Guide Git complet
├── DEPLOIEMENT-O2SWITCH.md         ← Guide O2Switch complet
├── CHECKLIST-DEPLOIEMENT.md        ← Liste de vérification
└── GUIDE-DEPLOIEMENT-COMPLET.md    ← Ce fichier
```

---

## 🎯 Mes Recommandations

### Pour un débutant
1. Commencer avec **cPanel** pour comprendre
2. Passer à **GitHub Actions** pour automatiser
3. Utiliser **FTP** pour les urgences

### Pour un développeur
1. Setup **GitHub Actions** dès le début
2. Garder **FTP** en backup
3. Utiliser `git push` uniquement

### Pour un expert
1. **Git Push Direct** avec SSH
2. **GitHub Actions** pour la CI/CD complète
3. Scripts personnalisés selon les besoins

---

## 🆘 Dépannage Rapide

### Le site ne s'affiche pas
```bash
# Vérifier que .htaccess est présent
ls -la public_html/.htaccess

# Vider le cache du navigateur
Ctrl+Shift+R (ou Cmd+Shift+R sur Mac)
```

### GitHub Actions échoue
```bash
# Vérifier les secrets
GitHub → Settings → Secrets

# Tester le build en local
npm run build
```

### Routes React ne fonctionnent pas
```bash
# Vérifier .htaccess dans dist/
cat public/.htaccess

# Rebuild
npm run build
```

---

## 📚 Tous les Guides

| Fichier | Contenu | Temps de lecture |
|---------|---------|------------------|
| **README-GIT.md** | Git démarrage rapide | 2 min |
| **README-DEPLOIEMENT.md** | Démarrage rapide général | 2 min |
| **DEPLOIEMENT-GIT.md** | Git guide complet | 15 min |
| **DEPLOIEMENT-O2SWITCH.md** | O2Switch guide complet | 20 min |
| **CHECKLIST-DEPLOIEMENT.md** | Liste de vérification | 5 min |
| **RESUME-DEPLOIEMENT.txt** | Résumé visuel | 1 min |

---

## 🎉 Conclusion

Vous avez maintenant **5 méthodes** de déploiement :

1. ✅ **GitHub Actions** - Automatique, recommandé
2. ✅ **Git Push Direct** - Rapide, pour experts
3. ✅ **FTP** - Visuel, pour régulier
4. ✅ **cPanel** - Simple, pour débuter
5. ✅ **Scripts** - Flexible, pour automatiser

**Choisissez celle qui vous convient le mieux !**

---

**Mon conseil** : Commencez avec **GitHub Actions**. C'est le plus moderne et le plus simple à utiliser au quotidien.

```bash
# Setup une fois
→ Configurer les secrets GitHub (2 min)
→ Push le workflow (1 min)

# Ensuite, à chaque mise à jour
→ git push
→ ✅ C'est tout !
```

Bon déploiement ! 🚀

---

**Dernière mise à jour** : Janvier 2026  
**Support** : Consultez les guides ou le support O2Switch
