# 🌐 NETLIFY - Configuration des Variables d'Environnement

## Le Problème
Votre frontend Netlify ne sait pas où trouver votre serveur backend.

---

## ✅ SOLUTION: Configurer Netlify

### **ÉTAPE 1: Allez sur Netlify**
https://app.netlify.com

### **ÉTAPE 2: Sélectionnez votre site PIXEND**
Dans la liste de vos sites, cliquez sur le site PIXEND

### **ÉTAPE 3: Allez aux Variables d'Environnement**
**Chemin:** `Site Settings` → `Build & Deploy` → `Environment`

### **ÉTAPE 4: Ajouter les Variables**
Cliquez sur **"Edit variables"** ou **"Add"**

**Variable 1:**
```
Name:  VITE_API_URL
Value: https://pixend-server.render.com
```

**Variable 2:**
```
Name:  VITE_WEBSOCKET_URL
Value: https://pixend-server.render.com
```

### **ÉTAPE 5: Enregistrer et Redéployer**
1. Cliquez **"Save"**
2. Allez à **"Deploys"**
3. En haut, cliquez **"Trigger deploy"** → **"Deploy site"**
4. Attendez le redéploiement (2-3 minutes)

---

## ✅ Vérifier que ça fonctionne

### **Test 1: Vérifier les Variables**
```
Site Settings → Environment
```
Vous devriez voir:
```
✅ VITE_API_URL = https://pixend-server.render.com
✅ VITE_WEBSOCKET_URL = https://pixend-server.render.com
```

### **Test 2: Vérifier en Production**
1. Allez sur votre URL Netlify (ex: `pixend.netlify.app`)
2. Ouvrez F12 → Console
3. Cherchez: `serverUrl: 'https://pixend-server.render.com'`
4. Si vous voyez ✅ → C'est configuré correctement!

---

## 🎯 Alternative: Hardcoder dans config.js

Si vous ne voulez pas configurer Netlify:

**Fichier: `config.js`** (ligne ~27)

**Avant:**
```javascript
config.serverUrl = process.env.VITE_WEBSOCKET_URL || 'https://pixend-server.render.com';
```

**Après:**
```javascript
config.serverUrl = 'https://pixend-server.render.com'; // ← Mettez votre URL ici
```

Puis:
```bash
git add config.js
git commit -m "Update server URL"
git push
```

Netlify se redéploiera automatiquement!

---

## ⚠️ Important

**Ne mettez PAS localhost dans config.js en production!**

Les URLs valides:
- ✅ `https://pixend-server.render.com`
- ✅ `https://pixend.railway.app`
- ✅ `https://mon-serveur-pixend.herokuapp.com`
- ❌ `http://localhost:3000` (localhost n'existe que sur votre PC!)

---

## 💾 Procédure Rapide

```
1. Netlify: Ajouter VITE_API_URL et VITE_WEBSOCKET_URL
2. Netlify: Trigger deploy
3. Attendre 2-3 minutes
4. Tester sur votre URL Netlify
5. ✅ Les messages doivent se synchroniser!
```
