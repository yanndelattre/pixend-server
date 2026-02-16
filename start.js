#!/usr/bin/env node

/**
 * Script de démarrage PIXEND
 * Lance automatiquement:
 * 1. Le serveur Node.js
 * 2. Ouvre le navigateur
 * Permet une communication multi-utilisateurs en local et en ligne
 */

const http = require('http');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

console.log(`
╔══════════════════════════════════════════════════════════════╗
║           🎮 PIXEND - Démarrage Automatique 🎮              ║
║    Communication en temps réel - Mode Local & Production    ║
╚══════════════════════════════════════════════════════════════╝
`);

// Fonction pour ouvrir le navigateur
function openBrowser(url) {
    const isWindows = os.platform() === 'win32';
    const isMac = os.platform() === 'darwin';
    const isLinux = os.platform() === 'linux';
    
    if (isWindows) {
        return spawn('cmd.exe', ['/c', `start ${url}`]);
    } else if (isMac) {
        return spawn('open', [url]);
    } else if (isLinux) {
        return spawn('xdg-open', [url]);
    }
}

// 1. Attendre que le serveur soit prêt
function waitForServer(port = 3000, maxAttempts = 30) {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        
        const check = () => {
            attempts++;
            const req = http.get(`http://localhost:${port}`, (res) => {
                console.log('✅ Serveur prêt!');
                resolve();
            });
            
            req.on('error', () => {
                if (attempts < maxAttempts) {
                    console.log(`⏳ Attente serveur (${attempts}/${maxAttempts})...`);
                    setTimeout(check, 1000);
                } else {
                    reject(new Error('Serveur pas disponible après 30 secondes'));
                }
            });
        };
        
        check();
    });
}

// 2. Lancer le serveur
console.log('🚀 Démarrage du serveur Node.js...');
const serverProcess = spawn('node', ['server.js'], {
    cwd: __dirname,
    stdio: 'inherit'
});

serverProcess.on('error', (err) => {
    console.error('❌ Erreur au démarrage du serveur:', err);
    process.exit(1);
});

// 3. Attendre et ouvrir le navigateur
setTimeout(async () => {
    try {
        await waitForServer();
        
        console.log('\n📱 Ouverture du navigateur...');
        try {
            openBrowser('http://localhost:3000');
        } catch (e) {
            console.log('Ouvrez manuellement: http://localhost:3000');
        }
        
        console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    ✅ PIXEND DÉMARRÉ                         ║
║                                                              ║
║  🌐 Accès local:     http://localhost:3000                  ║
║  📱 Test multi-user: Ouvrez 2+ navigateurs                 ║
║  💬 Envoyez un message et voyez-le apparaître partout!     ║
║                                                              ║
║  🚀 Pour tester en ligne:                                   ║
║     1. Déployez le serveur (voir DEPLOY.md)               ║
║     2. Mettez à jour l'URL de serveur dans config.js       ║
║     3. Poussez sur Netlify                                 ║
║                                                              ║
║  ⌨️  CTRL+C pour arrêter                                     ║
╚══════════════════════════════════════════════════════════════╝
        `);
        
    } catch (err) {
        console.error('❌ Erreur:', err.message);
        process.exit(1);
    }
}, 1000);

// Gestion propre de l'arrêt
process.on('SIGINT', () => {
    console.log('\n\n👋 Arrêt de PIXEND...');
    serverProcess.kill();
    process.exit(0);
});
