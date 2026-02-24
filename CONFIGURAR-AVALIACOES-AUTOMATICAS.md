# Configurar Avaliações Automáticas (JSONBin.io)

## Passo a Passo Rápido

### 1. Criar conta no JSONBin.io

1. Acesse **https://jsonbin.io**
2. Clique em **"Sign Up"** (é gratuito)
3. Crie sua conta

### 2. Criar um Bin

1. Após fazer login, clique em **"Create Bin"**
2. Cole este conteúdo inicial:

```json
{
  "reviews": []
}
```

3. Clique em **"Create"**
4. **Copie o Bin ID** que aparece (ex: `65a1b2c3d4e5f6g7h8i9j0k`)

### 3. Tornar o Bin Público

1. Clique no bin que você criou
2. Vá em **"Settings"** (Configurações)
3. Marque **"Public"** (Público)
4. Salve

### 4. Criar API Key

1. No menu superior, clique em **"API Keys"**
2. Clique em **"Create API Key"**
3. Dê um nome (ex: "Avaliacoes Agente IA")
4. **Copie a API Key** que aparece (ex: `$2b$10$abc123def456...`)

### 5. Configurar no Código

1. Abra o arquivo `agente-ia.html`
2. Procure por estas linhas (por volta da linha 535):

```javascript
const JSONBIN_BIN_ID = 'YOUR_BIN_ID';
const JSONBIN_API_KEY = 'YOUR_API_KEY';
```

3. Substitua:
   - `YOUR_BIN_ID` pelo Bin ID que você copiou
   - `YOUR_API_KEY` pela API Key que você copiou

**Exemplo:**

```javascript
const JSONBIN_BIN_ID = '65a1b2c3d4e5f6g7h8i9j0k';
const JSONBIN_API_KEY = '$2b$10$abc123def456ghi789jkl012mno345pqr678stu901vwx234yz';
```

4. Salve o arquivo

### 6. Fazer Deploy

```powershell
git add agente-ia.html
git commit -m "Configura avaliacoes automaticas"
git push
```

### 7. Testar

1. Aguarde 1-2 minutos para a Vercel atualizar
2. Acesse a página do Agente IA
3. Envie uma avaliação de teste
4. A avaliação deve aparecer **imediatamente** para todos!

## Como Funciona

- ✅ Quando alguém envia uma avaliação, ela é **automaticamente adicionada** ao JSONBin
- ✅ A avaliação aparece **imediatamente** para todos os visitantes
- ✅ **Não precisa aprovar nada** - tudo é automático!
- ✅ Todas as avaliações ficam públicas e visíveis para todos

## Limites Gratuitos do JSONBin.io

- ✅ **Até 10 bins** gratuitos
- ✅ **Ilimitadas leituras** (ler avaliações)
- ✅ **Até 1.000 escritas por mês** (adicionar avaliações)
- ✅ Mais que suficiente para começar!

## Problemas?

Se der erro ao salvar avaliações:
1. Verifique se o Bin está marcado como **"Public"**
2. Verifique se a API Key está correta
3. Verifique se o Bin ID está correto
4. Veja o console do navegador (F12) para mensagens de erro

## Alternativa (se não quiser usar JSONBin.io)

Se preferir não usar JSONBin.io, você pode continuar usando o método manual:
- As avaliações serão salvas apenas localmente (no navegador de quem enviou)
- Para aparecer para todos, você precisa adicionar manualmente ao `reviews-agente-ia.json`
