# 📦 Guide de déploiement sur Netlify

## 🎯 Méthode la plus simple : Glisser-Déposer (2 minutes)

### Étapes :

1. **Aller sur Netlify :**
   - Ouvrez votre navigateur
   - Allez sur [https://app.netlify.com](https://app.netlify.com)

2. **Créer un compte :**
   - Cliquez sur "Sign up"
   - Connectez-vous avec GitHub, GitLab, Bitbucket ou Email

3. **Déployer votre site :**
   - Une fois connecté, vous verrez votre tableau de bord
   - Faites glisser votre dossier `Dolo` entier dans la zone "Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"
   
4. **Attendre le déploiement :**
   - Netlify va automatiquement déployer votre site
   - Vous recevrez une URL comme : `https://random-name-123.netlify.app`

5. **Personnaliser l'URL (optionnel) :**
   - Allez dans "Site settings" > "Change site name"
   - Choisissez un nom unique, par exemple : `dolo-oumar-cv`
   - Votre URL sera : `https://dolo-oumar-cv.netlify.app`

✅ **C'est tout ! Votre site est en ligne !**

---

## 🔄 Méthode recommandée : Déploiement via GitHub (Meilleure pour les mises à jour)

### Étapes :

1. **Créer un dépôt GitHub :**
   ```bash
   # Dans votre dossier Dolo
   git init
   git add .
   git commit -m "Premier commit - CV Dolo Oumar"
   ```

2. **Créer le dépôt sur GitHub :**
   - Allez sur [github.com](https://github.com)
   - Cliquez sur "+" > "New repository"
   - Nommez-le (ex: `cv-dolo-oumar`)
   - Ne cochez PAS "Initialize with README"
   - Cliquez sur "Create repository"

3. **Pousser votre code :**
   ```bash
   git remote add origin https://github.com/VOTRE_USERNAME/cv-dolo-oumar.git
   git branch -M main
   git push -u origin main
   ```
   (Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub)

4. **Connecter à Netlify :**
   - Allez sur [app.netlify.com](https://app.netlify.com)
   - Cliquez sur "Add new site" > "Import an existing project"
   - Cliquez sur "GitHub" et autorisez Netlify
   - Sélectionnez votre dépôt `cv-dolo-oumar`

5. **Configurer le déploiement :**
   - Build command : (laissez vide, pas de build nécessaire)
   - Publish directory : `.` (point)
   - Cliquez sur "Deploy site"

6. **Avantages de cette méthode :**
   - ✅ Chaque fois que vous poussez du code sur GitHub, Netlify redéploie automatiquement
   - ✅ Historique des versions
   - ✅ Collaborations possibles

---

## 🛠️ Méthode avancée : Netlify CLI

### Installation :

```bash
# Installer Netlify CLI globalement
npm install -g netlify-cli
```

### Déploiement :

```bash
# Se connecter
netlify login

# Déployer en mode draft (test)
netlify deploy

# Déployer en production
netlify deploy --prod
```

---

## ✅ Vérifications après déploiement

Après le déploiement, vérifiez que :

1. ✅ La page d'accueil (`index.html`) s'affiche correctement
2. ✅ Le lien vers le CV (`cv.html`) fonctionne
3. ✅ Toutes les images sont visibles
4. ✅ Le téléchargement PDF fonctionne
5. ✅ Le site est responsive sur mobile

---

## 🔧 Configuration personnalisée

Les fichiers suivants sont déjà configurés :

- **`netlify.toml`** : Configuration Netlify (redirections, headers)
- **`_redirects`** : Redirections pour le routing
- **`sw.js`** : Service Worker pour le cache (fonctionne automatiquement en HTTPS)

---

## 🌐 Personnaliser votre URL

1. Allez dans "Site settings" de votre site sur Netlify
2. Cliquez sur "Change site name"
3. Choisissez un nom unique (ex: `dolo-cv`, `dolo-oumar-portfolio`)
4. Votre nouvelle URL sera : `https://votre-nom.netlify.app`

---

## 📝 Mise à jour de votre site

### Si vous avez utilisé Git/GitHub :
```bash
# Faire vos modifications
git add .
git commit -m "Description des modifications"
git push
# Netlify déploiera automatiquement !
```

### Si vous avez utilisé le glisser-déposer :
- Glissez-déposez à nouveau le dossier mis à jour
- Netlify remplacera l'ancienne version

---

## 🆘 Problèmes courants

### Les images ne s'affichent pas
- Vérifiez que le dossier `image/` est bien inclus dans le déploiement
- Vérifiez les chemins dans vos fichiers HTML

### Le service worker ne fonctionne pas
- Le service worker nécessite HTTPS (Netlify le fournit automatiquement)
- Videz le cache de votre navigateur

### 404 sur certaines pages
- Vérifiez que le fichier `_redirects` est présent à la racine
- Vérifiez la configuration dans `netlify.toml`

---

## 📞 Besoin d'aide ?

- Documentation Netlify : [docs.netlify.com](https://docs.netlify.com)
- Support Netlify : [community.netlify.com](https://community.netlify.com)

---

**Bon déploiement ! 🚀**

