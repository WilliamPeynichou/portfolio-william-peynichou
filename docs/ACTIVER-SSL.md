# 🔒 Activer SSL sur O2Switch

Guide pour activer le certificat SSL gratuit (Let's Encrypt) sur votre domaine williampeynichou.fr.

---

## 📋 Prérequis

- ✅ Domaine `williampeynichou.fr` configuré et pointant vers O2Switch
- ✅ Site déployé et accessible en HTTP
- ✅ Compte cPanel O2Switch actif

---

## 🚀 Étape 1 : Vérifier que le domaine est actif

### Vérification
1. Allez sur : `http://williampeynichou.fr`
2. Votre site doit s'afficher correctement

⚠️ **Important** : Le domaine doit être accessible en HTTP avant de configurer SSL !

---

## 🔐 Étape 2 : Activer SSL dans cPanel

### Méthode 1 : AutoSSL (Automatique - Recommandé)

1. **Connexion à cPanel**
   - URL : `https://votredomaine.com:2083`
   - Ou : `https://cpanel.o2switch.net`
   - Entrez vos identifiants O2Switch

2. **Chercher "SSL/TLS Status"**
   - Dans la barre de recherche cPanel, tapez : "SSL"
   - Cliquez sur **"SSL/TLS Status"**

3. **Activer AutoSSL**
   - Trouvez `williampeynichou.fr` dans la liste
   - Cliquez sur **"Run AutoSSL"**
   - Attendez 2-5 minutes

4. **Vérification**
   - Le statut doit passer à **"Certificate installed"** avec une coche verte ✅
   - Le certificat est valide pour 90 jours et se renouvelle automatiquement

---

### Méthode 2 : Let's Encrypt manuel

1. **Aller dans "SSL/TLS"**
   - Dans cPanel, cherchez **"SSL/TLS"**

2. **Installer un certificat SSL**
   - Cliquez sur **"Installer les certificats SSL"**

3. **Let's Encrypt (Gratuit)**
   - Sélectionnez votre domaine : `williampeynichou.fr`
   - Cliquez sur **"Issue"** ou **"Installer"**
   - Attendez la génération du certificat

---

## ⏰ Temps d'activation

- **AutoSSL** : 2-5 minutes
- **Propagation complète** : Jusqu'à 24 heures (généralement 1-2 heures)

---

## ✅ Étape 3 : Vérifier que SSL fonctionne

### Test 1 : Accès HTTPS
```
https://williampeynichou.fr
```
- Vous devriez voir un **cadenas vert 🔒** dans la barre d'adresse
- Pas d'avertissement de sécurité

### Test 2 : Vérifier le certificat
1. Cliquez sur le **cadenas** dans la barre d'adresse
2. Cliquez sur **"Certificat"**
3. Vérifiez :
   - Émis par : Let's Encrypt
   - Valide pour : williampeynichou.fr
   - Date d'expiration : Dans ~90 jours

### Test 3 : Test en ligne
Allez sur : https://www.ssllabs.com/ssltest/
- Entrez : `williampeynichou.fr`
- Cliquez sur **"Submit"**
- Vous devriez obtenir une note A ou A+

---

## 🔄 Étape 4 : Activer les redirections HTTPS

Une fois SSL activé et fonctionnel, activez les redirections dans `.htaccess` :

### Dans le fichier `public/.htaccess`, décommentez ces lignes :

```apache
# Décommenter ces lignes après activation SSL :

# Redirection HTTP vers HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirection www vers non-www
RewriteCond %{HTTP_HOST} ^www\.williampeynichou\.fr$ [NC]
RewriteRule ^(.*)$ https://williampeynichou.fr/$1 [L,R=301]

# HSTS (sécurité renforcée)
Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

### Dans `index.html`, changez le canonical :

```html
<!-- Avant -->
<link rel="canonical" href="http://williampeynichou.fr" />

<!-- Après (une fois SSL actif) -->
<link rel="canonical" href="https://williampeynichou.fr" />
```

### Puis redéployez :

```bash
git add .
git commit -m "Enable HTTPS redirects after SSL activation"
git push
```

---

## 🎯 Checklist complète

Avant activation SSL :
- [ ] Domaine actif et accessible en HTTP
- [ ] DNS configuré correctement

Activation SSL :
- [ ] Se connecter à cPanel
- [ ] Lancer AutoSSL ou Let's Encrypt
- [ ] Attendre l'installation (2-5 min)

Après activation SSL :
- [ ] Tester https://williampeynichou.fr
- [ ] Vérifier le cadenas vert 🔒
- [ ] Décommenter les redirections HTTPS dans .htaccess
- [ ] Changer http en https dans index.html
- [ ] Redéployer le site
- [ ] Tester que HTTP redirige vers HTTPS

---

## 🐛 Problèmes courants

### Erreur "Certificate not yet valid"
**Cause** : Le certificat vient d'être installé  
**Solution** : Attendez 5-10 minutes et videz le cache du navigateur

### Erreur "NET::ERR_CERT_COMMON_NAME_INVALID"
**Cause** : Le certificat ne couvre pas votre domaine  
**Solution** : Régénérez le certificat en incluant bien `williampeynichou.fr`

### Le site est inaccessible après activation SSL
**Cause** : DNS mal configuré ou certificat mal installé  
**Solution** : 
1. Vérifiez que le domaine fonctionne en HTTP
2. Contactez le support O2Switch

### AutoSSL ne trouve pas mon domaine
**Cause** : Le domaine n'est pas encore propagé  
**Solution** : Attendez 24-48h après la configuration DNS

---

## 💡 Conseils

### Renouvellement automatique
- Let's Encrypt via O2Switch se **renouvelle automatiquement**
- Vous n'avez rien à faire !
- Le certificat est valide 90 jours et se renouvelle tous les 60 jours

### www vs non-www
- **Recommandé** : Utilisez `williampeynichou.fr` (sans www)
- Les redirections dans .htaccess s'occupent de rediriger www vers non-www

### HSTS (HTTP Strict Transport Security)
- À activer **APRÈS** que SSL fonctionne parfaitement
- Force les navigateurs à toujours utiliser HTTPS
- Améliore la sécurité et le référencement

---

## 📞 Support

### O2Switch
- **Support** : https://www.o2switch.fr/support/
- **FAQ SSL** : https://faq.o2switch.fr/ (chercher "SSL")
- **Ticket** : Via votre espace client

### Ressources
- [Let's Encrypt](https://letsencrypt.org/)
- [SSL Labs Test](https://www.ssllabs.com/ssltest/)
- [Mozilla SSL Config Generator](https://ssl-config.mozilla.org/)

---

## 🎉 Résumé rapide

```bash
# 1. Activer SSL dans cPanel (AutoSSL)
# 2. Attendre 5 minutes
# 3. Tester https://williampeynichou.fr
# 4. Une fois OK, activer les redirections :

# Éditer public/.htaccess (décommenter les lignes HTTPS)
# Éditer index.html (changer http:// en https://)

git add .
git commit -m "Enable HTTPS after SSL activation"
git push

# ✅ Terminé !
```

---

**Dernière mise à jour** : Janvier 2026
