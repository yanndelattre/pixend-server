# 🚀 PIXEND - Étapes de Déploiement (SOLUTION PROBLÈME MESSAGES)

## ❌ Problème Actuel
- ✅ Frontend déployé sur **Netlify**
- ❌ Backend NOT déployé (reste sur localhost)
- ❌ Les messages ne se synchronisent pas entre utilisateurs

---

## ✅ SOLUTION: Déployer le Backend

### **ÉTAPE 1: Créer un compte Render.com**
1. Allez sur https://render.com
2. Cliquez "Sign Up"
3. Connectez-vous avec GitHub

### **ÉTAPE 2: Déployer le Serveur**
1. Cliquez "New +" → "Web Service"
2. Sélectionnez votre repo GitHub (ou créez-en un)
3. Configurez:
   - **Name**: `pixend-server`
   - **Environment**: `Node`
   - **Region**: Choisissez le plus proche
   - **Plan**: Gratuit `Free`

4. **Build Command**: `npm install`
5. **Start Command**: `npm start`
6. Cliquez "Deploy"

⏳ Attendez 2-3 minutes...

### **ÉTAPE 3: Récupérer l'URL du Serveur**
Une fois déployé, vous verrez une URL comme:
```
https://pixend-server.render.com
```
**Copiez-la!** (ou remplacez le nom du serveur)

### **ÉTAPE 4: Configurer Netlify**
1. Allez sur https://app.netlify.com
2. Sélectionnez votre site PIXEND
3. Allez sur **Site Settings** → **Build & Deploy** → **Environment**
4. Cliquez "Edit variables"
5. Ajoutez:
   ```
   VITE_API_URL = https://pixend-server.render.com
   VITE_WEBSOCKET_URL = https://pixend-server.render.com
   ```
6. Cliquez "Save"
7. Attendez le redéploiement (auto)

### **ÉTAPE 5: Tester**
1. Ouvrez votre URL Netlify
2. Ouvrez 2 onglets avec des comptes différents
3. Envoyez un message → **Apparaît instantanément!** ✅

---

## 🔍 Vérifier que ça marche

### Test 1: Backend Accessible
```
Ouvrez: https://pixend-server.render.com
```
→ Devrait voir l'HTML de PIXEND

### Test 2: WebSocket Connecté
1. Ouvrez F12 (Console)
2. Cherchez: `✅ Connecté au serveur WebSocket`
3. Cherchez: `serverUrl: https://pixend-server.render.com`

### Test 3: Messages Synchronisés
- Ami 1 envoie un message
- Ami 2 le reçoit **instantanément**

---

## ⚠️ Problèmes Courants

**Q: Mon serveur n'apparaît pas?**
- Render peut prendre 5-10 minutes
- Rafraîchissez la page Render

**Q: Erreur "Connection Refused"?**
- Vérifiez que `npm start` fonctionne localement
- Vérifiez les logs sur Render (onglet "Logs")

**Q: Messages encore ne se synchronisent pas?**
- F12 → Network: Cherchez `wss://` (WebSocket Secure)
- F12 → Console: Vérifiez `serverUrl` correct

---

## 💾 Mettre à Jour config.js (Optional)

Pour éviter de dépendre de variables d'env:
```javascript
// Dans config.js, ligne ~23:
config.serverUrl = 'https://pixend-server.render.com';
config.apiUrl = 'https://pixend-server.render.com/api';
```

Puis commitez et poussez → Netlify se redéploiera auto.

---

## 🎯 Résultat Final
```
Frontend (Netlify)  ←→  Backend (Render)
     ✅                      ✅
   en ligne              en ligne
   Messages synchronisés en temps réel! 🎉
```
