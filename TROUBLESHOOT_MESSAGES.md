# 🔍 GUIDE DE DIAGNOSTIC - Pourquoi les messages ne se synchronisent pas

## 🎯 Problème: Les messages ne s'affichent pas chez mon ami

Ce document vous aide à identifier le problème exactement.

---

## ✅ ÉTAPE 1: Vérifier la Connexion WebSocket (F12)

### **Ouvrez la Console (F12)**

1. Sur votre PIXEND en ligne: Appuyez sur **F12**
2. Allez sur l'onglet **Console**
3. Cherchez ces messages:

```
✅ Connecté au serveur WebSocket
🔧 Config PIXEND: { serverUrl: 'https://...' }
```

### **Si vous voyez ❌:**
```
⚠️ Erreur WebSocket: ...
❌ Déconnecté du serveur
```
→ **Allez à l'ÉTAPE 2**

---

## ✅ ÉTAPE 2: Vérifier l'URL du Serveur

Dans la **Console (F12)**, tapez:
```javascript
console.log(window.PIXEND_CONFIG)
```

Vous devriez voir:
```javascript
{
    isLocal: false,
    serverUrl: 'https://pixend-server.render.com',  // ✅ DOIT ÊTRE CORRECT
    apiUrl: 'https://pixend-server.render.com/api'
}
```

### **Si l'URL est:**
- `http://localhost:3000` → Vous êtes encore en local! ❌
- `undefined` → Configuration manquante! ❌
- Correcte mais serveur en bas → Allez à ÉTAPE 3 ✅

---

## ✅ ÉTAPE 3: Vérifier que le Serveur est EN LIGNE

### **Testez l'URL du serveur directement:**

Dans un **nouvel onglet**, allez à:
```
https://pixend-server.render.com
```

### **Résultats possibles:**

| Résultat | Problème | Solution |
|----------|---------|----------|
| Page HTML s'affiche | ✅ OK | Continuer ÉTAPE 4 |
| Erreur 404 | ❌ Serveur non trouvé | Vérifier l'URL exacte |
| Erreur Connection Timeout | ❌ Serveur offline | Redéployer sur Render |
| ERR_CONNECTION_REFUSED | ❌ Serveur n'existe pas | Créer le serveur |

---

## ✅ ÉTAPE 4: Vérifier la Connexion WebSocket (Network)

1. **Ouvrez F12 → Network**
2. **Envoyez un message** dans PIXEND
3. **Cherchez une ligne "ws://" ou "wss://"** (WebSocket)

### **Vous devriez voir:**
```
Status: 101 Switching Protocols
URL: wss://pixend-server.render.com/socket.io/?...
Size: 0 B
Time: ~100ms
```

### **Si vous ne voyez pas "wss://":**
→ WebSocket ne se connecte pas! ❌
→ L'URL du serveur est probablement incorrecte

---

## ✅ ÉTAPE 5: Tester la Communication

### **Testez avec votre ami:**

1. **Vous**: Ouvrez PIXEND
2. **Ami**: Ouvrez PIXEND (URL différente si possible)
3. **Vous**: Connectez-vous avec Compte A
4. **Ami**: Connectez-vous avec Compte B
5. **Vous**: Sélectionnez un salon
6. **Ami**: Sélectionnez le MÊME salon
7. **Vous**: Écrivez un message
8. **Ami**: Le message doit apparaître **instantanément** ✅

---

## 🔧 Si Ça Ne Marche Toujours Pas

### **Vérification Final:**

**Dans la Console (F12), copier-coller:**
```javascript
fetch(window.PIXEND_CONFIG.apiUrl + '/state')
    .then(r => r.json())
    .then(data => console.log('✅ API Réponse:', data))
    .catch(e => console.log('❌ Erreur API:', e.message))
```

Si vous voyez **✅ API Réponse** → L'API fonctionne!
Si vous voyez **❌ Erreur** → Le serveur n'est pas accessible

---

## 📋 Checklist Final

- [ ] Console F12 montre `✅ Connecté au serveur WebSocket`
- [ ] `window.PIXEND_CONFIG.serverUrl` a l'URL correcte
- [ ] URL du serveur s'affiche en HTML (étape 3)
- [ ] Network (F12) montre une connexion `wss://`
- [ ] Ami peut voir vos messages instantanément
- [ ] Vous pouvez voir les messages de l'ami instantanément

**Si tous les ✅ sont cochés → PIXEND fonctionne! 🎉**

---

## 📞 Besoin d'aide?

1. Vérifiez le fichier `DEPLOY_STEPS.md` pour redéployer le serveur
2. Consultez `README.md` pour configurer localement
3. Vérifiez les **logs de Render** (onglet Logs)
