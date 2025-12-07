# CV - DOLO OUMAR

Site web portfolio et CV interactif de DOLO OUMAR, Développeur Web/Mobile Full Stack.

## 🚀 Déploiement sur Netlify

### Méthode 1 : Déploiement via Git (Recommandé)

1. **Créer un dépôt Git :**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Pousser sur GitHub :**
   - Créez un nouveau dépôt sur GitHub
   - Ajoutez le remote et poussez :
   ```bash
   git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git
   git branch -M main
   git push -u origin main
   ```

3. **Déployer sur Netlify :**
   - Allez sur [netlify.com](https://netlify.com)
   - Cliquez sur "Add new site" > "Import an existing project"
   - Connectez votre compte GitHub
   - Sélectionnez votre dépôt
   - Les paramètres par défaut sont corrects (Build command: vide, Publish directory: `.`)
   - Cliquez sur "Deploy site"

### Méthode 2 : Déploiement par glisser-déposer (Rapide)

1. Allez sur [netlify.com](https://netlify.com)
2. Créez un compte ou connectez-vous
3. Allez dans "Sites"
4. Glissez-déposez tout le dossier du projet dans la zone de déploiement
5. Votre site sera déployé automatiquement !

### Méthode 3 : Netlify CLI

1. **Installer Netlify CLI :**
   ```bash
   npm install -g netlify-cli
   ```

2. **Se connecter :**
   ```bash
   netlify login
   ```

3. **Déployer :**
   ```bash
   netlify deploy --prod
   ```

## 📁 Structure du projet

```
.
├── index.html          # Page d'accueil
├── cv.html            # Page CV
├── index.css          # Styles page d'accueil
├── cv.css             # Styles CV
├── index.js           # Scripts page d'accueil
├── script.js          # Scripts CV (génération PDF)
├── sw.js              # Service Worker
├── image/             # Dossier des images
└── netlify.toml       # Configuration Netlify
```

## ✨ Fonctionnalités

- 📄 CV interactif avec thèmes personnalisables
- 📥 Téléchargement du CV en PDF (format A4 portrait)
- 🎨 Design moderne avec effets glacés
- 📱 Responsive design
- ⚡ Service Worker pour le cache
- 🌐 Animations fluides

## 🔧 Configuration

Le fichier `netlify.toml` configure :
- Les redirections pour le routing
- Les headers de sécurité
- Le cache des fichiers statiques

## 📝 Notes

- Assurez-vous que tous les chemins relatifs sont corrects
- Les images doivent être dans le dossier `image/`
- Le service worker fonctionne uniquement en HTTPS (Netlify le fournit automatiquement)

## 🌐 URL de déploiement

Après le déploiement, vous recevrez une URL comme :
`https://votre-site.netlify.app`

Vous pouvez également personnaliser le nom :
- Allez dans Site settings > Change site name
- Choisissez un nom unique (ex: `dolo-oumar-cv`)

## 📧 Contact

- Email: dolooumar60@gmail.com
- GitHub: [Deku5005](https://github.com/Deku5005)
- LinkedIn: [dolo-oumar](https://www.linkedin.com/in/dolo-oumar)

