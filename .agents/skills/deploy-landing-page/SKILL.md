---
name: deploy-landing-page
description: >-
  Faz o build e deploy automático da landing page do projeto meu-site no GitHub e GitHub Pages.
  Use esta skill sempre que o usuário pedir para fazer deploy, publicar, atualizar ou subir
  a landing page no GitHub.
---

# Deploy da Landing Page no GitHub

Esta skill automatiza a publicação e atualização contínua da landing page do projeto `meu-site` diretamente no GitHub, utilizando **GitHub Actions** e **GitHub Pages**.

## Informações do Projeto
- **Repositório GitHub:** [thiagotecgoncalves/bio-thiago](https://github.com/thiagotecgoncalves/bio-thiago)
- **Branch Principal:** `main`
- **Pipeline CI/CD:** [.github/workflows/deploy.yml](file:///C:/Users/thiag/OneDrive/Thiago/meu-site/.github/workflows/deploy.yml)
- **URL no GitHub Pages:** `https://thiagotecgoncalves.github.io/bio-thiago/`

---

## Procedimento de Execução

Quando solicitado a fazer o deploy ou subir atualizações para o GitHub, siga o passo a passo:

### 1. Verificar Alterações Pendentes
Verifique o estado do repositório local:
```powershell
git status
```

### 2. Executar o Script Automatizado de Deploy
O script utilitário empacotado nesta skill realiza a adição de arquivos, commit com mensagem descritiva e envio para o GitHub:
```powershell
powershell -ExecutionPolicy Bypass -File .agents/skills/deploy-landing-page/scripts/deploy.ps1 -CommitMessage "Atualização da landing page"
```

Alternativamente, execute manualmente:
```powershell
git add -A
git commit -m "feat: atualizações da landing page para deploy"
git push origin main
```

### 3. Pipeline do GitHub Actions
Assim que o push para a branch `main` é realizado:
1. O GitHub Actions é disparado automaticamente através do workflow [.github/workflows/deploy.yml](file:///C:/Users/thiag/OneDrive/Thiago/meu-site/.github/workflows/deploy.yml).
2. O workflow instala as dependências, executa o build (`npm run build`) com suporte a caminhos relativos (`base: './'`), gera os artefatos estáticos na pasta `dist/` e publica no GitHub Pages.
3. O progresso pode ser monitorado em:
   👉 **[GitHub Actions Runs](https://github.com/thiagotecgoncalves/bio-thiago/actions)**

---

## Configuração Única no Repositório (Pré-requisito do GitHub Pages)
Caso o repositório ainda não esteja configurado para GitHub Actions Pages, certifique-se de que a seguinte configuração está ativa no GitHub:
1. Acesse: **Settings** > **Pages** do repositório.
2. Em **Build and deployment** > **Source**, selecione: **GitHub Actions**.
3. O deploy será feito automaticamente em cada novo push.

---

## Checklist de Validação Pós-Deploy
- [ ] `git status` limpo e commit enviado para `origin/main`.
- [ ] Workflow no GitHub Actions finalizado com status de sucesso (verde).
- [ ] Acessar `https://thiagotecgoncalves.github.io/bio-thiago/` e checar carregamento dos assets e imagens.
