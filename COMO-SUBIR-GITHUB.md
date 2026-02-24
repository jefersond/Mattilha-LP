# Como subir o projeto no GitHub (sem usar `gh auth login`)

## Passo 1: Criar o repositório no site do GitHub

1. Acesse **https://github.com/new**
2. Em **Repository name** coloque: `mattilha-lp`
3. Deixe **Public**
4. **NÃO** marque "Add a README file"
5. Clique em **Create repository**

## Passo 2: Criar um token de acesso (para o Git conseguir enviar o código)

1. No GitHub, clique na sua **foto** (canto superior direito) → **Settings**
2. No menu da esquerda, no final: **Developer settings**
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token** → **Generate new token (classic)**
5. Dê um nome, ex.: `mattilha-lp`
6. Marque a permissão: **repo** (acesso total aos repositórios)
7. Clique em **Generate token**
8. **Copie o token** e guarde em um lugar seguro (ele não aparece de novo)

## Passo 3: Enviar o código pelo PowerShell

Abra o **PowerShell**, cole e execute (trocando `SEU_USUARIO` pelo seu usuário do GitHub e `SEU_TOKEN` pelo token que você copiou):

```powershell
cd "c:\Users\jefer\Desktop\Jeferson\Saas em teste\LP da comunidade da Mattilha"

git branch -M main
git remote add origin https://SEU_USUARIO:SEU_TOKEN@github.com/SEU_USUARIO/mattilha-lp.git
git push -u origin main
```

**Exemplo:** se seu usuário for `jeferson` e o token `ghp_xxxx...`:
```powershell
git remote add origin https://jeferson:ghp_xxxx...@github.com/jeferson/mattilha-lp.git
git push -u origin main
```

Se já tiver adicionado o `origin` antes, use:
```powershell
git remote remove origin
```
e depois o `git remote add origin ...` de cima.

---

Pronto. O repositório estará em: **https://github.com/SEU_USUARIO/mattilha-lp**
