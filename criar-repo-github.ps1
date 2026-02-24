# Execute este script DEPOIS de rodar: gh auth login
# Ele cria o repo "mattilha-lp" no seu GitHub e envia o codigo.

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

# Renomeia branch para main (padrao do GitHub)
if ((git branch --show-current) -eq "master") {
    git branch -M main
}

Write-Host "Criando repositorio 'mattilha-lp' no GitHub e enviando o codigo..." -ForegroundColor Cyan
gh repo create mattilha-lp --public --source=. --remote=origin --push --description "Landing page Mattilha Pro"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Pronto! Repositorio criado e codigo enviado." -ForegroundColor Green
    Write-Host "Acesse: https://github.com/$(gh api user -q .login)/mattilha-lp" -ForegroundColor Yellow
} else {
    Write-Host "Erro. Confira se voce fez login: gh auth login" -ForegroundColor Red
}
