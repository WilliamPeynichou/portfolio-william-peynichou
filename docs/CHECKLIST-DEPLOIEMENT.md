# ✅ Checklist de Déploiement O2Switch

Utilisez cette checklist pour vous assurer que tout est prêt avant le déploiement.

---

## 📋 Avant le Déploiement

### Informations O2Switch
- [ ] J'ai mes identifiants cPanel (username + mot de passe)
- [ ] Je connais mon URL cPanel (`https://votredomaine.com:2083`)
- [ ] Je connais mon serveur FTP (`ftp.votredomaine.com`)
- [ ] Mon domaine est configuré et pointe vers O2Switch

### Environnement Local
- [ ] Node.js et npm sont installés (`node -v` et `npm -v`)
- [ ] J'ai cloné/téléchargé le projet
- [ ] Les dépendances sont installées (`npm install`)
- [ ] Le projet fonctionne en local (`npm run dev`)

---

## 🔨 Préparation des Fichiers

### Build du Projet
```bash
cd /Users/williampeynichou/Portfolio/portfolio
npm run build
```

- [ ] Le build s'est terminé sans erreur
- [ ] Le dossier `dist/` a été créé
- [ ] Le fichier `.htaccess` est présent dans `dist/`

### Vérification du Contenu
Vérifiez que `dist/` contient :
- [ ] `index.html`
- [ ] `.htaccess`
- [ ] Dossier `assets/` (avec CSS, JS, images)
- [ ] Autres fichiers statiques

---

## 📤 Méthode de Déploiement Choisie

Cochez la méthode que vous allez utiliser :

### Option A : cPanel (Recommandé pour débutants)
- [ ] Je me connecte à cPanel : `https://votredomaine.com:2083`
- [ ] J'ouvre le Gestionnaire de fichiers
- [ ] Je navigue vers `public_html/`
- [ ] J'uploade `portfolio-deploy.zip` (créé par `./deploy.sh`)
- [ ] J'extrais l'archive dans `public_html/`
- [ ] Je supprime le fichier .zip après extraction

### Option B : FTP (Recommandé pour régulièrement)
- [ ] J'ai installé FileZilla/Cyberduck
- [ ] J'ai configuré ma connexion FTP
  - Hôte : `ftp.votredomaine.com`
  - User : mon username cPanel
  - Pass : mon mot de passe
- [ ] Je me connecte au serveur
- [ ] Je navigue vers `public_html/` côté serveur
- [ ] Je sélectionne TOUT le contenu de `dist/` (pas le dossier)
- [ ] Je glisse-dépose vers `public_html/`
- [ ] J'attends la fin du transfert

### Option C : SSH (Avancé)
- [ ] SSH est activé sur mon compte O2Switch
- [ ] J'ai configuré `deploy-ssh.sh` avec mes identifiants
- [ ] J'exécute `./deploy-ssh.sh`
- [ ] Le déploiement s'est terminé sans erreur

---

## 🔍 Vérification Post-Déploiement

### Test Fonctionnel
- [ ] Mon site s'affiche : `http://votredomaine.com`
- [ ] La page d'accueil se charge correctement
- [ ] Les images sont visibles
- [ ] Les styles CSS sont appliqués
- [ ] Les animations fonctionnent

### Test Navigation
- [ ] Les liens de navigation fonctionnent
- [ ] Je peux naviguer entre les pages
- [ ] Rafraîchir une page interne (F5) fonctionne ← Important !
- [ ] Les liens externes s'ouvrent correctement

### Test Responsive
- [ ] Le site s'affiche bien sur mobile
- [ ] Le site s'affiche bien sur tablette
- [ ] Le site s'affiche bien sur desktop

### Test Performance
- [ ] Le site se charge rapidement (< 3 secondes)
- [ ] Pas d'erreur dans la console du navigateur (F12)
- [ ] Test PageSpeed : https://pagespeed.web.dev/

---

## 🔒 Configuration SSL (HTTPS)

- [ ] Je me connecte à cPanel
- [ ] Je vais dans "SSL/TLS Status"
- [ ] J'active AutoSSL pour mon domaine
- [ ] J'attends la génération du certificat (quelques minutes)
- [ ] Mon site est accessible en HTTPS : `https://votredomaine.com`
- [ ] J'ai configuré la redirection HTTP → HTTPS dans `.htaccess`

### Test HTTPS
- [ ] `https://votredomaine.com` fonctionne
- [ ] Le cadenas de sécurité s'affiche dans le navigateur
- [ ] Pas d'avertissement de sécurité
- [ ] `http://votredomaine.com` redirige vers HTTPS

---

## 🎨 Optimisations (Optionnel)

- [ ] J'ai compressé mes images avec TinyPNG ou similaire
- [ ] J'ai testé la performance avec GTmetrix
- [ ] J'ai configuré Google Analytics (si souhaité)
- [ ] J'ai ajouté un favicon personnalisé
- [ ] J'ai configuré les meta tags pour le SEO
- [ ] J'ai testé le partage sur les réseaux sociaux (Open Graph)

---

## 📊 SEO et Analytics (Optionnel)

- [ ] Google Search Console configuré
- [ ] Sitemap.xml créé et soumis
- [ ] Robots.txt configuré
- [ ] Meta descriptions ajoutées
- [ ] Balises Open Graph configurées
- [ ] Google Analytics installé

---

## 🚨 En Cas de Problème

### Si le site ne s'affiche pas
1. [ ] Vérifier que les fichiers sont dans `public_html/` (pas dans un sous-dossier)
2. [ ] Vérifier que `index.html` existe à la racine
3. [ ] Vider le cache du navigateur (Ctrl+Shift+R)
4. [ ] Attendre 5-10 minutes pour la propagation DNS

### Si les routes React ne fonctionnent pas
1. [ ] Vérifier que `.htaccess` est bien présent
2. [ ] Vérifier que les fichiers cachés sont visibles
3. [ ] Vérifier le contenu de `.htaccess`
4. [ ] Contacter le support O2Switch si nécessaire

### Si les images ne s'affichent pas
1. [ ] Vérifier que le dossier `assets/` a été uploadé
2. [ ] Ouvrir la console du navigateur (F12) pour voir les erreurs
3. [ ] Vérifier les permissions des fichiers (755 pour dossiers, 644 pour fichiers)

---

## 📝 Notes Personnelles

Espace pour vos notes :

```
Date du premier déploiement : _______________
URL du site : _______________
Serveur O2Switch : _______________
Problèmes rencontrés : 


Solutions appliquées :


```

---

## 🎉 Déploiement Réussi !

Félicitations ! Votre portfolio est maintenant en ligne sur O2Switch.

### Prochaines étapes recommandées :
1. ✅ Partager votre site sur les réseaux sociaux
2. ✅ Ajouter l'URL à votre CV
3. ✅ Tester régulièrement les mises à jour
4. ✅ Surveiller les performances
5. ✅ Faire des sauvegardes régulières

### Pour les mises à jour futures :
```bash
# 1. Faire vos modifications en local
# 2. Tester avec npm run dev
# 3. Builder : npm run build
# 4. Déployer avec la même méthode
```

---

**Besoin d'aide ?** Consultez [DEPLOIEMENT-O2SWITCH.md](./DEPLOIEMENT-O2SWITCH.md) pour plus de détails.
