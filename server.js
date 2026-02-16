const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Fichiers de persistance
const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');
const serversFile = path.join(dataDir, 'servers.json');

// CrÃ©er le dossier data s'il n'existe pas
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Charger les donnÃ©es persistÃ©es
function loadData() {
    let users = {};
    let servers = {};
    
    try {
        if (fs.existsSync(usersFile)) {
            const data = fs.readFileSync(usersFile, 'utf8');
            users = JSON.parse(data);
            console.log('âœ… Utilisateurs chargÃ©s:', Object.keys(users).length);
        }
    } catch (e) {
        console.error('âŒ Erreur chargement utilisateurs:', e.message);
    }
    
    try {
        if (fs.existsSync(serversFile)) {
            const data = fs.readFileSync(serversFile, 'utf8');
            servers = JSON.parse(data);
            console.log('âœ… Serveurs chargÃ©s:', Object.keys(servers).length);
        }
    } catch (e) {
        console.error('âŒ Erreur chargement serveurs:', e.message);
    }
    
    return { users, servers };
}

// Sauvegarder les donnÃ©es
function saveUsers(users) {
    try {
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
        console.log('ðŸ’¾ Utilisateurs sauvegardÃ©s');
    } catch (e) {
        console.error('âŒ Erreur sauvegarde utilisateurs:', e.message);
    }
}

function saveServers(servers) {
    try {
        fs.writeFileSync(serversFile, JSON.stringify(servers, null, 2), 'utf8');
        console.log('ðŸ’¾ Serveurs sauvegardÃ©s');
    } catch (e) {
        console.error('âŒ Erreur sauvegarde serveurs:', e.message);
    }
}

// Ã‰tat global du serveur
const { users: initialUsers, servers: initialServers } = loadData();

const appState = {
    users: initialUsers,
    servers: initialServers,
    onlineUsers: {},
    messages: {},
    userSessions: {}
};

// Routes HTTP
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/state', (req, res) => {
    res.json(appState);
});

app.post('/api/users/register', (req, res) => {
    const { email, username, password, avatar } = req.body;
    
    if (appState.users[email]) {
        return res.status(400).json({ error: 'Email already exists' });
    }
    
    const userData = {
        id: 'user_' + email.replace(/[^a-zA-Z0-9]/g, ''),
        username: username,
        displayName: username,
        email: email,
        password: password,
        avatar: avatar || generateDefaultAvatar(),
        isAnonymous: false,
        joinedAt: new Date().toISOString(),
        favoriteServers: [],
        friends: {}
    };
    
    appState.users[email] = userData;
    saveUsers(appState.users);
    res.json({ success: true, user: userData });
});

app.post('/api/users/login', (req, res) => {
    const { email, password } = req.body;
    const user = appState.users[email];
    
    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ success: true, user: user });
});

// WebSocket Events
io.on('connection', (socket) => {
    console.log('âœ… Utilisateur connectÃ©:', socket.id);
    
    // ===== AUTHENTIFICATION =====
    socket.on('user:auth', (userData) => {
        appState.onlineUsers[socket.id] = {
            socketId: socket.id,
            email: userData.email,
            displayName: userData.displayName,
            avatar: userData.avatar,
            currentServer: null,
            currentChannel: null,
            connectedAt: new Date().toISOString()
        };
        
        // Notifier tous les utilisateurs
        io.emit('users:online:update', appState.onlineUsers);
        console.log('ðŸ‘¤ Utilisateur authentifiÃ©:', userData.displayName);
    });
    
    // ===== REJOINDRE UN SERVEUR =====
    socket.on('server:join', (data) => {
        const { serverId, channelId, userEmail } = data;
        
        socket.join(`server:${serverId}`);
        socket.join(`channel:${channelId}`);
        
        // Mettre Ã  jour la prÃ©sence
        if (appState.onlineUsers[socket.id]) {
            appState.onlineUsers[socket.id].currentServer = serverId;
            appState.onlineUsers[socket.id].currentChannel = channelId;
        }
        
        // Notifier le serveur
        io.to(`server:${serverId}`).emit('users:online:update', appState.onlineUsers);
        console.log('ðŸ“¦ Utilisateur a rejoint le serveur:', serverId);
    });
    
    // ===== ENVOYER UN MESSAGE =====
    socket.on('message:send', (data) => {
        const { serverId, channelId, content, author, displayName, avatar, timestamp } = data;
        
        // Stocker le message
        const messageKey = `${serverId}:${channelId}`;
        if (!appState.messages[messageKey]) {
            appState.messages[messageKey] = [];
        }
        
        const message = {
            id: 'msg_' + Date.now(),
            author: author || data.userId || 'anonymous',
            displayName: displayName,
            content: content || data.text,
            avatar: avatar,
            timestamp: timestamp,
            serverId: serverId,
            channelId: channelId
        };
        
        appState.messages[messageKey].push(message);
        
        // Diffusion:
        // - Mode V2: message avec serverId + channelId => canal ciblÃ©
        // - Mode legacy: message sans serverId => diffusion globale
        if (serverId && channelId) {
            io.to(`channel:${channelId}`).emit('message:receive', message);
        } else {
            io.emit('message:receive', message);
        }
        io.emit('message:new', message); // Notifier aussi tous les clients
        
        const preview = (message.content || '').substring(0, 30);
        console.log('ðŸ’¬ Message reÃ§u dans', channelId, 'de', displayName, '-', preview + '...');
    });
    
    // ===== OBTENIR L'HISTORIQUE DES MESSAGES =====
    socket.on('messages:history', (data) => {
        const { serverId, channelId } = data;
        const messageKey = `${serverId}:${channelId}`;
        const messages = appState.messages[messageKey] || [];
        
        socket.emit('messages:history:response', {
            serverId: serverId,
            channelId: channelId,
            messages: messages
        });
    });
    
    // ===== SYNCHRONISER L'Ã‰TAT GLOBAL =====
    socket.on('state:sync', () => {
        socket.emit('state:sync:response', appState);
    });
    
    // ===== CRÃ‰ER UN SERVEUR =====
    socket.on('server:create', (data) => {
        const { serverId, name, description, rules, isPublic, createdBy } = data;
        
        appState.servers[serverId] = {
            id: serverId,
            name: name,
            description: description,
            rules: rules,
            isPublic: isPublic,
            createdBy: createdBy,
            createdAt: new Date().toISOString(),
            members: [createdBy],
            channels: {}
        };
        
        saveServers(appState.servers);
        
        // Notifier tous les utilisateurs
        io.emit('servers:update', appState.servers);
        console.log('ðŸ“¦ Nouveau serveur crÃ©Ã©:', name);
    });
    
    // ===== CRÃ‰ER UN CANAL =====
    socket.on('channel:create', (data) => {
        const { serverId, channelId, name, description, createdBy } = data;
        
        if (appState.servers[serverId]) {
            appState.servers[serverId].channels[channelId] = {
                id: channelId,
                name: name,
                description: description,
                createdBy: createdBy,
                createdAt: new Date().toISOString(),
                messages: []
            };
            
            // Notifier les membres du serveur
            io.to(`server:${serverId}`).emit('servers:update', appState.servers);
            console.log('ðŸ“ Nouveau canal crÃ©Ã©:', name, 'dans', serverId);
        }
    });
    
    // ===== TYPAGE =====
    socket.on('user:typing', (data) => {
        const { serverId, channelId, userEmail, displayName } = data;
        io.to(`channel:${channelId}`).emit('user:typing', {
            userEmail: userEmail,
            displayName: displayName,
            isTyping: true
        });
    });
    
    socket.on('user:stop-typing', (data) => {
        const { serverId, channelId, userEmail } = data;
        io.to(`channel:${channelId}`).emit('user:typing', {
            userEmail: userEmail,
            isTyping: false
        });
    });
    
    // ===== DÃ‰CONNEXION =====
    socket.on('disconnect', () => {
        const user = appState.onlineUsers[socket.id];
        if (user) {
            delete appState.onlineUsers[socket.id];
            io.emit('users:online:update', appState.onlineUsers);
            console.log('âŒ Utilisateur dÃ©connectÃ©:', user.displayName);
        }
    });
    
    socket.on('user:disconnect', () => {
        const user = appState.onlineUsers[socket.id];
        if (user) {
            delete appState.onlineUsers[socket.id];
            io.emit('users:online:update', appState.onlineUsers);
            console.log('âŒ Utilisateur dÃ©connectÃ© manuellement:', user.displayName);
        }
    });
});

// Fonctions utilitaires
function generateDefaultAvatar() {
    const colors = ['#FF006E', '#00D4FF', '#FB5607', '#FFBE0B', '#8338EC'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'%3E%3Crect fill='${color}' width='128' height='128'/%3E%3Ctext x='50%25' y='50%25' font-size='64' fill='white' text-anchor='middle' dy='.3em' font-family='Arial'%3EðŸ‘¤%3C/text%3E%3C/svg%3E`;
}

// DÃ©marrer le serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`ðŸš€ Serveur PIXEND dÃ©marrÃ© sur http://localhost:${PORT}`);
    console.log(`ðŸ“¡ WebSocket actif sur ws://localhost:${PORT}`);
});

