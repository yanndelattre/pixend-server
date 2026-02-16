# ✅ PIXEND - Checklist de Fixation (Pas à Pas)

> Suivez cette checklist pour fixer le problème "Les messages ne se synchronisent pas"

---

## 🎯 Avant de Commencer

- [ ] Vous avez accès au code PIXEND
- [ ] Vous avez une compte GitHub
- [ ] Vous avez 25 minutes libres
- [ ] Votre code est committé dans Git (important pour Render!)

**N'avez pas Git?** Run:
```powershell
git init
git add .
git commit -m "PIXEND initial"
```

---

## 📊 Phase 1: Comprendre le Problème (5 min)

- [ ] Lire [PROBLEM_SOLUTION_SUMMARY.md](PROBLEM_SOLUTION_SUMMARY.md)
- [ ] Comprendre que le backend n'est pas déployé
- [ ] Comprendre que Netlify = frontend seulement
- [ ] Accepter qu'il faut déployer le backend aussi

**Vous avez compris?** → Continuez!

---

## 🚀 Phase 2: Déployer le Backend (10 min)

### Créer un Compte Render
- [ ] Allez sur https://render.com
- [ ] Cliquez "Sign Up"
- [ ] Connectez-vous avec GitHub

### Déployer le Serveur
- [ ] Cliquez "New +" → "Web Service"
- [ ] Sélectionnez votre repo GitHub
- [ ] **Name**: `pixend-server`
- [ ] **Environment**: `Node`
- [ ] **Region**: Choisissez le plus proche
- [ ] **Plan**: `Free`
- [ ] **Build Command**: `npm install`
- [ ] **Start Command**: `npm start`
- [ ] Cliquez "Deploy"

### Récupérer l'URL
- [ ] Attendez le déploiement (2-3 min)
- [ ] Copiez l'URL: `https://pixend-server-xxxxx.render.com`
- [ ] Testez en navigateur: l'URL devrait afficher HTML
- [ ] ✅ Backend déployé!

---

## 🌐 Phase 3: Configurer Netlify (5 min)

### Ajouter Variables d'Environnement
- [ ] Allez sur https://app.netlify.com
- [ ] Sélectionnez votre site PIXEND
- [ ] **Site Settings** → **Build & Deploy** → **Environment**
- [ ] Cliquez "Edit variables"

### Variables à Ajouter
- [ ] **Name**: `VITE_API_URL` | **Value**: `https://pixend-server-xxxxx.render.com`
- [ ] **Name**: `VITE_WEBSOCKET_URL` | **Value**: `https://pixend-server-xxxxx.render.com`
- [ ] Cliquez "Save"

### Redéployer
- [ ] Allez à "Deploys"
- [ ] Cliquez "Trigger deploy" → "Deploy site"
- [ ] Attendez le redéploiement (2 min)
- [ ] ✅ Frontend reconfiguré!

---

## 🧪 Phase 4: Tester (5 min)

### Test 1: Backend Accessible
- [ ] Allez à `https://pixend-server-xxxxx.render.com`
- [ ] Devrait voir HTML de PIXEND
- [ ] ✅ Backend en ligne!

### Test 2: Frontend Accessible
- [ ] Allez à votre URL Netlify
- [ ] Page charge sans erreurs
- [ ] Ouvrez F12 → Console
- [ ] Cherchez: `serverUrl: 'https://pixend-server-xxxxx.render.com'`
- [ ] ✅ Frontend bien configuré!

### Test 3: WebSocket Connecté
- [ ] Restez sur votre URL Netlify
- [ ] Ouvrez F12 → Console
- [ ] Cherchez: `✅ Connecté au serveur WebSocket`
- [ ] Si vous voyez ❌ d'erreur → Allez à TROUBLESHOOT_MESSAGES.md
- [ ] ✅ WebSocket connecté!

### Test 4: Messages Synchronisés (Avec Ami)
- [ ] Vous: Connectez-vous avec Compte A
- [ ] Ami: Connectez-vous avec Compte B (URL différente!)
- [ ] Vous: Sélectionnez un salon
- [ ] Ami: Sélectionnez le MÊME salon
- [ ] Vous: Écrivez "Test 123"
- [ ] Ami: Voit le message **instantanément** ✅
- [ ] Ami: Écrit une réponse
- [ ] Vous: Voyez la réponse **instantanément** ✅
- [ ] ✅ Messages synchronisés!

---

## 🎯 Final Checklist

### Infrastructure
- [ ] Backend déployé sur Render
- [ ] Frontend déployé sur Netlify
- [ ] Variables d'env configurées sur Netlify
- [ ] Frontend redéployé après configuration

### Connectivité
- [ ] Backend accessible par URL
- [ ] Frontend affiche l'URL correcte du backend
- [ ] WebSocket se connecte (pas d'erreurs)
- [ ] API accessible

### Communication
- [ ] Messages envoyés s'affichent pour vous
- [ ] Messages de l'ami s'affichent pour vous
- [ ] Vous pouvez discuter en temps réel
- [ ] Pas d'erreurs dans la console

### Bonus
- [ ] Multi-utilisateurs fonctionne
- [ ] Plusieurs salons fonctionnent
- [ ] Création de serveur fonctionne
- [ ] Profils utilisateurs fonctionnent

**Tous les ✅ cochés?** → **PIXEND MARCHE! 🎉**

---

## 🆘 Si Ça N'Marche Pas

### Messages n'apparaissent pas?
→ Lire [TROUBLESHOOT_MESSAGES.md](TROUBLESHOOT_MESSAGES.md)

### Backend inaccessible?
→ Vérifier les logs Render (onglet "Logs")
→ Vérifier que `npm start` fonctionne en local

### WebSocket ne connecte pas?
→ F12 → Network → Chercher "wss://"
→ Vérifier que l'URL du serveur est correcte

### Config pas prise en compte?
→ Vider le cache Netlify: Force deploy
→ Vérifier que les variables sont sauvegardées

---

## ⏱️ Timeline

| Étape | Temps | État |
|-------|-------|------|
| Phase 1 | 5 min | ✅ Comprendre |
| Phase 2 | 10 min | 🚀 Déployer |
| Phase 3 | 5 min | 🌐 Configurer |
| Phase 4 | 5 min | 🧪 Tester |
| **TOTAL** | **~25 min** | **✅ FINI!** |

---

## 💾 Résumé des Liens

**URLs à retenir:**
- Frontend: `https://pixend.netlify.app` (remplacer par votre URL)
- Backend: `https://pixend-server-xxxxx.render.com` (remplacer par votre URL)

**Fichiers importants:**
- DEPLOY_STEPS.md - Guide complet du déploiement
- NETLIFY_CONFIG.md - Configurer les variables
- TROUBLESHOOT_MESSAGES.md - Diagnostiquer
- TEST_LOCAL.md - Tester en local

---

## ✨ Prêt?

👉 **Commencez par Phase 1!**

Vous avez une question? Consultez le guide correspondant dans GUIDES_INDEX.md
