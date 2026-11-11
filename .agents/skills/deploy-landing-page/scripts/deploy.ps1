[CmdletBinding()]
param (
    [string]$CommitMessage = "Atualização e deploy da landing page [auto deploy]"
)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Iniciando Deploy da Landing Page      " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 1. Verificar status do Git
try {
    $currentBranch = (git branch --show-current).Trim()
    Write-Host "[1/4] Branch atual detectada: $currentBranch" -ForegroundColor Green
} catch {
    Write-Error "Erro ao verificar branch do repositório Git."
}

# 2. Verificar arquivos modificados ou não rastreados
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "[2/4] Alterações encontradas. Preparando commit..." -ForegroundColor Yellow
    git add -A
    git commit -m $CommitMessage
    Write-Host "      Commit realizado com sucesso: '$CommitMessage'" -ForegroundColor Green
} else {
    Write-Host "[2/4] Nenhuma alteração pendente de commit." -ForegroundColor Cyan
}

# 3. Enviar para o GitHub
Write-Host "[3/4] Enviando atualizações para o GitHub (push origin $currentBranch)..." -ForegroundColor Yellow
try {
    git push origin $currentBranch
    Write-Host "      Push concluído com sucesso!" -ForegroundColor Green
} catch {
    Write-Error "Falha ao enviar commits para o GitHub: $_"
}

# 4. Exibir informações do Deploy
$remoteUrl = git remote get-url origin
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "[4/4] Deploy em andamento via GitHub Actions!" -ForegroundColor Green
Write-Host "      Repositório: $remoteUrl" -ForegroundColor Gray
Write-Host "      Acompanhe o workflow em: https://github.com/thiagotecgoncalves/bio-thiago/actions" -ForegroundColor Cyan
Write-Host "      URL da Landing Page:     https://thiagotecgoncalves.github.io/bio-thiago/" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
