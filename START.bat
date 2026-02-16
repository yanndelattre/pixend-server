@echo off
REM Script pour démarrer PIXEND facilement

cd /d "%~dp0"

echo.
echo ╔════════════════════════════════════╗
echo ║       🚀 PIXEND SERVER 🚀           ║
echo ╚════════════════════════════════════╝
echo.

echo ✅ Vérification de Node.js...
node --version > nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js n'est pas installé!
    echo Téléchargez-le sur https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js trouvé

echo.
echo ⏱️  Démarrage du serveur...
echo.

npm start

pause
