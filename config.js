/**
 * Configuration PIXEND - detecte automatiquement les URLs serveur
 * Fonctionne en local ET en ligne (Netlify + Render)
 *
 * IMPORTANT: ce fichier est execute dans le navigateur (pas de process.env).
 */

function getServerConfig() {
    const isLocalhost = window.location.hostname === 'localhost' ||
                        window.location.hostname === '127.0.0.1';

    const config = {
        isLocal: isLocalhost,
        isDevelopment: !window.location.hostname.includes('netlify') && !window.location.hostname.includes('production'),
        hostname: window.location.hostname,
        port: window.location.port,
        protocol: window.location.protocol
    };

    // Option de surcharge rapide pour debug: ?serverUrl=https://mon-backend.exemple.com
    const queryOverride = new URLSearchParams(window.location.search).get('serverUrl');

    if (isLocalhost) {
        const localUrl = queryOverride || 'http://localhost:3000';
        config.serverUrl = localUrl;
        config.apiUrl = localUrl + '/api';
        console.log('Mode LOCAL detecte');
    } else if (window.location.hostname.includes('netlify')) {
        const productionServerUrl = 'https://pixend-server.render.com'; // Modifier ici si besoin
        config.serverUrl = queryOverride || productionServerUrl;
        config.apiUrl = config.serverUrl + '/api';
        console.log('Mode NETLIFY detecte -> Serveur:', config.serverUrl);
    } else {
        const productionServerUrl = 'https://pixend-server.render.com'; // Modifier ici si besoin
        config.serverUrl = queryOverride || productionServerUrl;
        config.apiUrl = config.serverUrl + '/api';
        console.log('Mode CUSTOM DOMAIN -> Serveur:', config.serverUrl);
    }

    console.log('Config PIXEND:', {
        isLocal: config.isLocal,
        serverUrl: config.serverUrl,
        apiUrl: config.apiUrl
    });

    return config;
}

window.PIXEND_CONFIG = getServerConfig();
