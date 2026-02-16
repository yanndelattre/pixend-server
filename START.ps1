# Script pour démarrer PIXEND depuis PowerShell

Write-Host ""
Write-Host "╔════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║       🚀 PIXEND SERVER 🚀           ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Vérifier Node.js
Write-Host "✅ Vérification de Node.js..."
$nodeCheck = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js n'est pas installé!" -ForegroundColor Red
    Write-Host "Téléchargez-le sur https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

Write-Host "✅ Node.js $nodeCheck trouvé" -ForegroundColor Green

Write-Host ""
Write-Host "⏱️  Démarrage du serveur..." -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 Accédez à http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Yellow
Write-Host ""

npm start
