# 🚀 Déploiement Git - Démarrage Rapide

Guide ultra-rapide pour déployer via Git sur O2Switch.

---

## 🎯 Méthode Recommandée : GitHub Actions

### ⚡ Setup en 5 minutes

#### 1. Configurer les secrets GitHub

Allez sur GitHub → Votre repo → **Settings** → **Secrets** → **New secret**

Ajoutez 3 secrets :

| Nom | Valeur |
|-----|--------|
| `FTP_SERVER` | `ftp.votredomaine.com` |
| `FTP_USERNAME` | Votre username cPanel O2Switch |
| `FTP_PASSWORD` | Votre mot de passe cPanel |

#### 2. Push le workflow

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment"
git push
```

#### 3. C'est tout ! ✅

À chaque `git push`, votre site sera automatiquement déployé !

---

## 🔄 Utilisation Quotidienne

### Méthode Simple (Recommandée)

```bash
# 1. Faites vos modifications...

# 2. Déployez !
./deploy-git.sh
```

Le script s'occupe de tout :
- ✅ Build du projet
- ✅ Commit et push vers GitHub
- ✅ GitHub Actions déploie sur O2Switch

### Méthode Manuelle

```bash
# 1. Build
npm run build

# 2. Commit
git add .
git commit -m "Mise à jour"

# 3. Push (déploiement automatique)
git push
```

---

## 📊 Vérifier le Déploiement

1. Allez sur GitHub → **Actions**
2. Vous verrez le workflow en cours
3. Attendez 2-5 minutes
4. Visitez votre site ! 🎉

---

## 🐛 Problèmes ?

### Le workflow ne se lance pas

✅ Vérifiez que le fichier est dans `.github/workflows/deploy.yml`  
✅ Activez les Actions dans les paramètres du repo  

### Erreur FTP

✅ Vérifiez vos secrets GitHub  
✅ Testez la connexion FTP avec FileZilla  

### Build échoue

✅ Testez en local : `npm run build`  
✅ Consultez les logs dans l'onglet Actions  

---

## 📚 Documentation Complète

Pour plus de détails : **[DEPLOIEMENT-GIT.md](./DEPLOIEMENT-GIT.md)**

- Configuration SSH avancée
- Git Push Direct (sans GitHub Actions)
- Optimisations et astuces
- Troubleshooting détaillé

---

## 🎉 Workflow Idéal

```
📝 Coder → 💾 git push → 🤖 GitHub Actions → ✅ Déployé !
```

**Une seule commande** pour tout mettre à jour ! 🚀

---

## 📞 Liens Utiles

- [GitHub Actions](https://docs.github.com/fr/actions)
- [Support O2Switch](https://www.o2switch.fr/support/)
- [Documentation Git](https://git-scm.com/doc)
