# 🚀 PIXEND - Serveur de Discussion en Temps Réel

> **⚠️ Les messages ne se synchronisent pas?** 
> 👉 Lire [PROBLEM_SOLUTION_SUMMARY.md](PROBLEM_SOLUTION_SUMMARY.md) | [GUIDES_INDEX.md](GUIDES_INDEX.md)

## ⚡ Quick Start (10 secondes)

```powershell
npm run launch
```

C'est tout! Le serveur démarre et ouvre votre navigateur.

---

## 📋 Installation et Démarrage

### 1. **Installer les dépendances**

Ouvrez PowerShell dans le dossier du projet et exécutez :

```powershell
npm install
```

Cela installera :
- `express` - Serveur web
- `socket.io` - WebSocket temps réel
- `cors` - Autoriser les requêtes cross-origin

### 2. **Démarrer le serveur**

**Option A (Recommandé - Automatique):**
```powershell
npm run launch
```
→ Démarre le serveur + ouvre le navigateur automatiquement

**Option B (Manuel):**
```powershell
npm start
```

Vous devriez voir :
```
🚀 Serveur PIXEND démarré sur http://localhost:3000
📡 WebSocket actif sur ws://localhost:3000
```

### 3. **Accéder au site**

Ouvrez votre navigateur et allez à :
```
http://localhost:3000
```

---

## 🎯 Fonctionnalités en Temps Réel

✅ **Synchronisation instantanée des messages**
- Les messages sont diffusés en direct via WebSocket
- Les utilisateurs voient les messages les uns des autres immédiatement

✅ **Liste des utilisateurs en ligne**
- Vue en temps réel de qui est en ligne
- Cliquez sur l'icône 📊 pour voir la liste

✅ **Création de serveurs et salons**
- Créez des serveurs publics ou privés
- Invitez d'autres utilisateurs

✅ **Authentification persistante**
- Cochez "Afficher le mot de passe" pour rester connecté
- Les identifiants sont sauvegardés en cookies

✅ **Photo de profil personnalisée**
- Cliquez sur votre avatar dans le profil
- Téléchargez une image depuis votre ordinateur

---

## 🧪 Comment tester avec votre ami

### **Optio 1 : Sur le même réseau Wi-Fi**

1. Trouvez votre adresse IP locale :
```powershell
ipconfig
```
Cherchez `IPv4 Address` (ex: 192.168.1.100)

2. Partagez cette URL avec votre ami :
```
http://192.168.1.100:3000
```

### **Option 2 : Sur internet (ngrok)**

1. Installez ngrok (https://ngrok.com/)

2. Exposez le port 3000 :
```powershell
ngrok http 3000
```

3. Copiez l'URL ngrok et partagez-la avec votre ami

### **Option 3 : Sur le même ordinateur (deux navigateurs)**

1. Ouvrez deux fenêtres différentes :
   - Chrome : http://localhost:3000
   - Edge/Firefox : http://localhost:3000

2. Connectez-vous avec deux comptes différents

---

## 📁 Structure du projet

```
pixend/
├── server.js              # Serveur Node.js + WebSocket
├── package.json           # Dépendances npm
├── pixend_main.html       # Interface web (client)
└── command.txt            # Specs du projet
```

---

## 🐛 Troubleshooting

**Erreur : "npm: Le terme n'est pas reconnu"**
- Installez Node.js depuis https://nodejs.org/

**Le serveur ne démarre pas**
```powershell
# Vérifiez que le port 3000 est libre
netstat -ano | findstr :3000
```

Si occupé, changez le port dans `server.js` :
```javascript
const PORT = 5000; // Changez ici
```

**Les messages n'apparaissent pas en temps réel**
- Vérifiez que le serveur est en cours d'exécution
- Vérifiez que WebSocket est connecté (console : F12)
- Rafraîchissez la page

---

## 💡 Prochaines étapes

- [ ] Ajouter une base de données (MongoDB) pour persister les données
- [ ] Authentification sécurisée avec JWT
- [ ] Appels vocaux/vidéo avec WebRTC
- [ ] Thèmes personnalisés
- [ ] Application mobile

---

**Besoin d'aide ?** Ouvrez une issue ou consultez la console (F12) pour les erreurs.

Bon chat ! 🎮
