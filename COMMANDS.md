# 🔧 Commandes Utiles PIXEND

## 🚀 Démarrage Rapide

```powershell
# Démarrer le serveur + ouvrir navigateur (RECOMMANDÉ)
npm run launch

# Ou simplement démarrer le serveur
npm start

# Mode développement avec auto-reload
npm run dev
```

---

## 📦 Gestion des Dépendances

```powershell
# Installer les dépendances
npm install

# Ajouter une dépendance
npm install express socket.io cors

# Mettre à jour les dépendances
npm update
```

---

## 🧪 Test Local

```powershell
# Lancer le serveur en local
npm run launch

# Accédez à http://localhost:3000 dans 2-3 navigateurs
```

---

## 📤 Déploiement

```bash
# Initialiser Git (si pas déjà fait)
git init
git add .
git commit -m "PIXEND initial"
git push origin main

# Sur Render: Connectez votre repo GitHub
# Render va automatiquement déployer
```

---

## 🔍 Diagnostiquer

```powershell
# Voir les logs du serveur
npm start

# Vérifier que Node.js est installé
node --version

# Vérifier que npm est installé
npm --version

# Vérifier le port 3000
netstat -ano | findstr :3000
```

---

## 🛑 Arrêter le Serveur

```powershell
# Appuyez sur Ctrl+C dans le terminal
# Ou fermez le terminal
```

---

## 🔧 Configuration

```powershell
# Variables d'environnement (créer fichier .env)
$env:NODE_ENV = "development"
$env:PORT = 3000

# Ou créer fichier .env:
NODE_ENV=development
PORT=3000
```

---

## 📊 Vérifier la Config

Ouvrez la console navigateur (F12) et tapez:

```javascript
// Voir la configuration
console.log(window.PIXEND_CONFIG)

// Vérifier WebSocket
console.log(window.socket)

// Vérifier l'état de l'app
console.log(APP_STATE)
```

---

## 🗑️ Nettoyer

```powershell
# Supprimer node_modules (redémarrage complet)
Remove-Item -Recurse -Force node_modules

# Réinstaller
npm install

# Supprimer les données locales
Remove-Item -Force data/users.json
Remove-Item -Force data/servers.json
```

---

## 🔒 Production

```bash
# Définir les variables d'env (Netlify/Render)
VITE_API_URL=https://pixend-server.render.com
VITE_WEBSOCKET_URL=https://pixend-server.render.com

# Build frontend (si Vite est configuré)
npm run build
```

---

## 🐛 Debug WebSocket

```javascript
// Dans la console (F12)

// Voir les événements WebSocket
socket.on('message:receive', (msg) => console.log('Reçu:', msg))

// Envoyer un test
socket.emit('message:send', {
    content: 'Test!',
    channelId: 'general',
    serverId: 'general'
})

// Voir la connexion
socket.connected ? 'Connecté ✅' : 'Déconnecté ❌'
```

---

## 📝 Fichiers à Connaître

```
pixend/
├── server.js          ← Serveur Node.js principal
├── index.html         ← Interface web (frontend)
├── config.js          ← Configuration URLs
├── start.js           ← Script de lancement
├── package.json       ← Dépendances
├── .env               ← Variables d'env
└── data/
    ├── users.json     ← Données des utilisateurs
    └── servers.json   ← Données des serveurs
```

---

## 🌐 URLs Importants

**En Local:**
- http://localhost:3000 (frontend)
- ws://localhost:3000 (WebSocket)

**En Production:**
- https://pixend.netlify.app (frontend)
- https://pixend-server.render.com (backend)
- wss://pixend-server.render.com (WebSocket)

---

## 🆘 Commandes de Secours

```powershell
# Le serveur ne démarre pas
npm install
npm start

# Port 3000 occupé
netstat -ano | findstr :3000
taskkill /PID [ID] /F

# Cache problème
Remove-Item -Recurse -Force node_modules
npm install
npm start

# Firebase/Local manquant
git status

# Messages ne se synchronisent pas
# → Lire TROUBLESHOOT_MESSAGES.md
```

---

## 📚 Plus d'Infos

- `README.md` - Guide principal
- `DEPLOY_STEPS.md` - Déployer en ligne
- `TROUBLESHOOT_MESSAGES.md` - Fixer les messages
- `GUIDES_INDEX.md` - Index de tous les guides
