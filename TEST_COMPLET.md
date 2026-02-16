# 🧪 PIXEND - Test Complet (Avant Déploiement)

**IMPORTANT:** Testez tout ça **en local** avant de déployer!

---

## ✅ Test 1: Serveur Démarre (1 min)

```powershell
npm run launch
```

**Attendez 5 secondes...**

**Vérifiez:**
- ✅ Vous voyez: `🚀 Serveur PIXEND démarré sur http://localhost:3000`
- ✅ Vous voyez: `📡 WebSocket actif`
- ✅ Navigateur s'ouvre automatiquement

**Si ça ne marche pas:**
```powershell
npm install
npm run launch
```

---

## ✅ Test 2: Page Charge (30 sec)

1. Ouvrez http://localhost:3000
2. **Vérifiez:**
   - ✅ Page PIXEND charge
   - ✅ Vous voyez les boutons: "S'INSCRIRE", "SE CONNECTER", "Continuer en Anonyme"
   - ✅ Pas d'erreurs rouges en bas de page

---

## ✅ Test 3: Inscription (2 min)

### Compte 1: Alice

1. Cliquez "S'INSCRIRE"
2. Remplissez:
   - **Pseudo:** `Alice123`
   - **Email:** `alice@test.com`
   - **Password:** `password123`
   - **Confirmer:** `password123`
3. Cliquez "INSCRIRE"

**Vérifiez:**
- ✅ Vous êtes connecté
- ✅ Vous voyez votre pseudo "Alice123"
- ✅ Page principale s'ouvre
- ✅ Console (F12) ne montre pas d'erreurs rouges

**Si erreur:**
F12 → Console → Copiez l'erreur

---

## ✅ Test 4: Créer un Serveur (2 min)

1. Cliquez "➕ CRÉER UN SERVEUR"
2. Remplissez:
   - **Nom:** `Mon Serveur Test`
   - **Description:** `Test de synchronisation`
3. Cliquez "CRÉER"

**Vérifiez:**
- ✅ Serveur apparaît dans la sidebar
- ✅ Vous êtes dedans
- ✅ Il y a un canal "général"

---

## ✅ Test 5: Envoyer un Message (Seul) (1 min)

1. Cliquez sur le canal "général"
2. Écrivez: `Test local 123`
3. Appuyez sur Entrée

**Vérifiez:**
- ✅ Le message apparaît
- ✅ C'est votre pseudo "Alice123"
- ✅ Console (F12) montre: `📤 Message envoyé via WebSocket`

---

## ✅ Test 6: Multi-Utilisateurs (5 min)

### Ouvrir 2 Onglets/Navigateurs

**Tab 1: Alice (Déjà connecté)**
- Laissez comme c'est

**Tab 2: Bob (Nouveau)**
1. Ouvrez http://localhost:3000
2. Cliquez "S'INSCRIRE"
3. Remplissez:
   - **Pseudo:** `Bob456`
   - **Email:** `bob@test.com`
   - **Password:** `password456`
4. Cliquez "INSCRIRE"

### Tester la Synchronisation

**Tab 1 (Alice):**
1. Allez dans votre serveur "Mon Serveur Test"
2. Écrivez: `Coucou Bob!`
3. Appuyez Entrée

**Tab 2 (Bob):**
1. Allez dans le même serveur
2. Allez dans le même canal

**Vérifiez:**
- ✅ Bob VOIT le message d'Alice **instantanément**
- ✅ Le message dit "Coucou Bob!"
- ✅ C'est signé "Alice123"

### Bob Répond

**Tab 2 (Bob):**
1. Écrivez: `Salut Alice!`
2. Appuyez Entrée

**Tab 1 (Alice):**
- ✅ Alice VOIT le message de Bob **instantanément**

---

## ✅ Test 7: Déconnexion/Reconnexion (2 min)

**Tab 1 (Alice):**
1. Cliquez sur votre profil (haut droite)
2. Cliquez "DÉCONNEXION"
3. Cliquez "SE CONNECTER"
4. Remplissez:
   - Email: `alice@test.com`
   - Password: `password123`
5. Cliquez "CONNEXION"

**Vérifiez:**
- ✅ Vous êtes reconnecté
- ✅ Vous êtes en tant qu'Alice123
- ✅ Les messages sont toujours là

---

## ✅ Test 8: Console & WebSocket (1 min)

1. Ouvrez F12 (Console)
2. **Cherchez ces messages:**

```
✅ Connecté au serveur WebSocket
📡 Connexion au serveur: ws://localhost:3000
🔧 Config PIXEND: { serverUrl: 'http://localhost:3000', ... }
```

**Vérifiez:**
- ✅ Vous voyez `✅ Connecté`
- ✅ Pas de `❌ Erreur WebSocket`

---

## ✅ Test 9: Network Tab (1 min)

1. Ouvrez F12 → **Network**
2. Envoyez un message
3. **Cherchez une ligne "ws://"** (WebSocket)

**Vérifiez:**
- ✅ Status: `101 Switching Protocols`
- ✅ WebSocket connectée

---

## 📋 Checklist Final

- [ ] Serveur démarre sans erreurs
- [ ] Page charge correctement
- [ ] Inscription fonctionne (Alice)
- [ ] Serveur créé avec succès
- [ ] Message envoyé seul ✅
- [ ] 2ème inscription fonctionne (Bob)
- [ ] Synchronisation messages: Alice→Bob ✅
- [ ] Synchronisation messages: Bob→Alice ✅
- [ ] Déconnexion/Reconnexion fonctionne
- [ ] Console montre "Connecté"
- [ ] WebSocket actif (Network)

**Tous les ✅?** → **C'est bon pour déployer! 🚀**

---

## ⚠️ Problèmes Courants

### "Erreur lors de l'inscription"
→ F12 Console → Cherchez l'erreur exacte → Signalez-la

### "Message ne passe pas"
→ F12 Console → Cherchez `Message envoyé` → Vérifiez WebSocket

### "Bob ne voit pas le message d'Alice"
→ Vérifiez que vous êtes dans le MÊME serveur et canal

### "Navigateur bloqué par antivirus"
→ C'est normal, autorisez Node.js

---

## 🎯 Si Tout Marche

Bravo! 🎉

Vous pouvez maintenant:
1. Lire DEPLOY_AUTOMATIQUE.md
2. Déployer en ligne (Render + Netlify)
3. Partager avec vos amis!

---

**Prêt à tester?** 👉 `npm run launch`
