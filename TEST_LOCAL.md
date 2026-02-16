# 🧪 TEST LOCAL - Avant Déploiement

## ⚡ Testez LOCALEMENT d'abord!

Avant de déployer en ligne, vérifiez que ça fonctionne sur votre ordinateur.

---

## ✅ ÉTAPE 1: Démarrer le Serveur Local

```bash
npm run launch
```

Vous devriez voir:
```
✅ PIXEND DÉMARRÉ
🚀 Serveur démarré sur http://localhost:3000
📡 WebSocket actif
🌐 Navigateur ouvert automatiquement
```

---

## ✅ ÉTAPE 2: Ouvrir 2-3 Onglets

1. **Onglet 1**: Rester sur http://localhost:3000
2. **Onglet 2**: Ouvrir http://localhost:3000 (ou autre navigateur)
3. **Onglet 3**: Ouvrir http://localhost:3000 (autre fenêtre)

---

## ✅ ÉTAPE 3: Se Connecter avec Comptes Différents

| Onglet | Action |
|--------|--------|
| 1 | Inscrire: `alice@email.com` / `alice123` |
| 2 | Inscrire: `bob@email.com` / `bob123` |
| 3 | Continuer en Anonyme |

---

## ✅ ÉTAPE 4: Tester les Messages

1. **Alice (Onglet 1)** → Envoie "Coucou les mecs!"
2. **Bob (Onglet 2)** → Devrait voir le message **immédiatement** ✅
3. **Bob** → Envoie "Salut Alice!"
4. **Alice** → Devrait voir le message **immédiatement** ✅
5. **Anonyme (Onglet 3)** → Envoie "Hello"
6. **Alice & Bob** → Doivent voir le message **immédiatement** ✅

---

## ✅ ÉTAPE 5: Vérifier les Logs Console

### **Onglet 1 (Console F12):**

Vous devriez voir:
```
✅ Connecté au serveur WebSocket
📤 Message envoyé via WebSocket
💬 Message reçu via WebSocket: [Message de Bob]
👥 Utilisateurs en ligne: 3
```

### **Onglet 2 (Console F12):**

Vous devriez voir:
```
✅ Connecté au serveur WebSocket
💬 Message reçu via WebSocket: [Message d'Alice]
💬 Message reçu via WebSocket: [Votre message]
```

---

## ✅ ÉTAPE 6: Tester la Création de Serveur

1. **Alice** → Cliquez "➕ CRÉER UN SERVEUR"
2. Nom: `Mon Serveur Test`
3. Description: `Test de synchronisation`
4. Cliquez "CRÉER"
5. **Bob** → Vérifiez que le serveur apparaît ✅
6. **Alice** → Cliquez sur le serveur
7. **Bob** → Cliquez sur le serveur
8. **Alice** → Envoie un message
9. **Bob** → Voit le message **immédiatement** ✅

---

## 🔍 Si Ça Ne Marche Pas

### **Messages ne s'affichent pas?**

**Ouvrez F12 → Console et cherchez:**
- ✅ `✅ Connecté au serveur WebSocket`
- ✅ `📤 Message envoyé via WebSocket`
- ❌ `⚠️ Erreur WebSocket` → Problème!

### **Serveur ne démarre pas?**

```powershell
# Vérifiez Node.js
node --version

# Vérifiez npm
npm --version

# Vérifiez les dépendances
npm install

# Lancez le serveur directement
npm start
```

### **Port 3000 occupé?**

```powershell
# Tuer le processus sur le port 3000
netstat -ano | findstr :3000
# Puis: taskkill /PID [ID] /F
```

---

## ✅ Checklist Local

- [ ] `npm run launch` fonctionne
- [ ] Navigateur s'ouvre sur http://localhost:3000
- [ ] Pouvez créer un compte
- [ ] Pouvez vous connecter
- [ ] 2 onglets reçoivent les messages en temps réel
- [ ] Console montre `✅ Connecté au serveur WebSocket`
- [ ] Messages apparaissent **instantanément** sans refresh

**Si tout ✅ → Prêt à déployer en ligne! 🚀**

---

## 📤 Prochaines Étapes

Une fois testé localement:
1. Déployer le serveur sur **Render.com** (voir `DEPLOY_STEPS.md`)
2. Configurer Netlify (voir `NETLIFY_CONFIG.md`)
3. Tester en production
4. Partager l'URL avec votre ami! 🎉
