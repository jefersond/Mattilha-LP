# Configurar cadastro na planilha do Google — guia detalhado

Este guia explica, passo a passo, como fazer o formulário da página de cadastro (lead.html) salvar os dados em uma planilha do Google Sheets usando a Vercel.

---

## Parte 1 — Criar e preparar a planilha

### 1.1 Abrir o Google Sheets

1. Abra o navegador e acesse: **https://sheets.google.com**
2. Faça login na conta Google em que você quer guardar os leads (se ainda não estiver logado).
3. Clique no botão **+ Em branco** (ou **Blank**) para criar uma nova planilha.

### 1.2 Dar nome à planilha

1. No canto superior esquerdo, onde está escrito "Planilha sem título", clique no texto.
2. Digite um nome, por exemplo: **Leads Mattilha** e pressione Enter.

### 1.3 Preencher a primeira linha (cabeçalhos)

A primeira linha deve ser o cabeçalho das colunas. Preencha assim:

| Célula | O que digitar |
|--------|----------------|
| **A1** | `Timestamp` |
| **B1** | `Nome` |
| **C1** | `Email` |
| **D1** | `Whatsapp` |
| **E1** | `Origem` |

- Clique em cada célula e digite o texto correspondente.
- Não precisa mudar o nome da aba (pode deixar "Página1").

### 1.4 Copiar o ID da planilha

1. Olhe a barra de endereço do navegador. A URL será parecida com:
   ```
   https://docs.google.com/spreadsheets/d/1ABC123xyz456.../edit
   ```
2. O **ID da planilha** é a parte entre `/d/` e `/edit`.
   - Exemplo: se a URL for `https://docs.google.com/spreadsheets/d/1xYzAbC123DeF/edit`, o ID é `1xYzAbC123DeF`.
3. Selecione só essa parte (sem as barras) e copie (Ctrl+C). Guarde em um bloco de notas — você vai usar no passo da Vercel.

---

## Parte 2 — Criar o projeto no Google Cloud

### 2.1 Acessar o Google Cloud Console

1. Abra uma nova aba e acesse: **https://console.cloud.google.com**
2. Entre com a **mesma conta Google** que você usa no Google Sheets.

### 2.2 Criar um novo projeto

1. No topo da página, ao lado de "Google Cloud", clique no **nome do projeto** atual (ou em "Selecionar projeto").
2. Na janela que abrir, clique em **NOVO PROJETO** (canto superior direito).
3. Em "Nome do projeto", digite por exemplo: **Mattilha LP**.
4. Clique em **Criar**.
5. Aguarde alguns segundos. Quando o projeto for criado, selecione-o na lista (ou clique em "Selecionar projeto" e escolha "Mattilha LP") para garantir que você está dentro dele.

### 2.3 Ativar a Google Sheets API

1. No menu da esquerda (as três listras se o menu estiver fechado), vá em **APIs e serviços** → **Biblioteca**.
2. Na caixa de pesquisa, digite: **Google Sheets API**.
3. Clique no resultado **Google Sheets API** (ícone verde de planilha).
4. Clique no botão **ATIVAR**.
5. Aguarde até aparecer a mensagem de que a API está ativada.

---

## Parte 3 — Criar a “conta de serviço” e baixar o arquivo JSON

**O que é isso em poucas palavras:**  
A “conta de serviço” é como um usuário robô que só o Google usa para acessar a sua planilha. O arquivo **JSON** que você vai baixar é a “senha” dessa conta. A Vercel usa esse arquivo para conseguir escrever na planilha sem você precisar fazer login.

---

### 3.1 Ir na página de Credenciais

1. No **Google Cloud Console** (onde você ativou a API na Parte 2), olhe o **menu da esquerda**.
2. Clique em **APIs e serviços** (ou “APIs & Services”).
3. Depois clique em **Credenciais** (ou “Credentials”).
4. Você vai ver uma página com o título “Credenciais” e um botão azul escrito **+ CRIAR CREDENCIAIS** no topo.

---

### 3.2 Criar a conta de serviço (o “robô”)

1. Clique no botão **+ CRIAR CREDENCIAIS** (em azul, no topo).
2. Vai abrir um menu com três opções. Escolha a **segunda**: **Conta de serviço** (ou “Service account”).
3. Vai abrir uma tela “Criar conta de serviço”:
   - No campo **Nome da conta de serviço**, digite: **mattilha-sheets** (pode ser outro nome, mas use esse para não errar).
   - Deixe o “ID da conta de serviço” como estiver (ele preenche sozinho).
4. Clique no botão **Criar e continuar** (ou “Create and continue”) embaixo.
5. Na próxima tela (“Conceder acesso ao projeto”) você **não precisa fazer nada**. Só clique em **Continuar** (ou “Continue”) no rodapé.
6. Na terceira tela (“Conceder acesso a usuários”) também **não precisa fazer nada**. Clique em **Concluir** (ou “Done”).
7. Você volta para a lista de credenciais. Agora deve aparecer uma **nova linha** na seção “Contas de serviço”, com um e-mail longo (tipo: `mattilha-sheets@mattilha-lp-123456.iam.gserviceaccount.com`). **Anote mentalmente:** esse e-mail é o “robô” que vai acessar a planilha.

---

### 3.3 Criar e baixar o arquivo JSON (a “senha” do robô)

1. Na mesma página de Credenciais, na lista **“Contas de serviço”**, clique **em cima do e-mail** que acabou de aparecer (o que termina em `@....iam.gserviceaccount.com`). Não clique em nenhum ícone ao lado — clique no próprio e-mail.
2. Abre a página de detalhes dessa conta. No topo você vê várias **abas** (Abas, Permissões, Chaves, etc.). Clique na aba **Chaves** (ou “Keys”).
3. Dentro da aba Chaves, clique no botão **Adicionar chave** (ou “Add key”) → **Criar nova chave** (ou “Create new key”).
4. Abre uma janelinha perguntando o tipo da chave. Deixe marcado **JSON** e clique em **Criar** (ou “Create”).
5. O navegador vai **baixar um arquivo** automaticamente (geralmente na pasta “Downloads”). O nome do arquivo é algo como `mattilha-lp-123456-abcd1234.json`. Esse arquivo é o **JSON**.
6. **Importante:** guarde esse arquivo em uma pasta que você lembre. Você vai abrir esse arquivo no próximo passo e também vai colar o conteúdo dele na Vercel na Parte 6. **Não envie esse arquivo para ninguém** — ele dá acesso à sua planilha.

---

### 3.4 Pegar o e-mail do robô dentro do JSON (para compartilhar a planilha)

Na Parte 4 você vai “compartilhar” a planilha com esse robô. Para isso, precisa do **e-mail** dele. Esse e-mail está dentro do arquivo JSON que você baixou.

1. Abra a pasta onde o arquivo JSON foi baixado (geralmente **Downloads**).
2. Clique com o botão direito no arquivo (o que termina em **.json**) → **Abrir com** → **Bloco de notas** (ou Notepad). Se não tiver Bloco de notas, use qualquer editor de texto.
3. O arquivo abre com um monte de texto em formato de lista. Procure a linha onde está escrito **"client_email"**. Ela vai parecer com isso:
   ```
   "client_email": "mattilha-sheets@mattilha-lp-123456.iam.gserviceaccount.com",
   ```
4. Copie **só o e-mail** (a parte entre aspas depois dos dois pontos). No exemplo acima, você copiaria: `mattilha-sheets@mattilha-lp-123456.iam.gserviceaccount.com` (sem aspas).
5. Cole esse e-mail em um bloco de notas ou documento e guarde. Você vai usar na **Parte 4** quando for compartilhar a planilha.

---

## Parte 4 — Dar acesso da planilha à conta de serviço

A planilha precisa ser compartilhada com o e-mail da conta de serviço para a API poder escrever nela.

1. Volte à **planilha do Google** (Leads Mattilha) que você criou na Parte 1.
2. Clique no botão **Compartilhar** (canto superior direito, azul).
3. No campo "Adicionar pessoas e grupos", **cole o e-mail** que você copiou do JSON (o `client_email`).
4. Ao lado, onde está "Visualizador", clique e mude para **Editor** (para a conta de serviço poder adicionar linhas).
5. **Desmarque** a opção "Notificar pessoas" (não é um e-mail de pessoa).
6. Clique em **Compartilhar** ou **Enviar**.

---

## Parte 5 — Colocar o JSON em uma única linha (para a Vercel)

A Vercel exige que o conteúdo do JSON esteja em uma linha só quando você colar nas variáveis de ambiente.

**Opção A — Usar um site para minificar**

1. Acesse **https://jsonformatter.org** (ou pesquise "json minify").
2. Abra o arquivo JSON da conta de serviço no Bloco de Notas e copie **todo** o conteúdo (Ctrl+A, Ctrl+C).
3. Cole no site no campo de texto e clique em **Minify** (ou equivalente).
4. Copie o resultado (tudo em uma linha) e guarde em um bloco de notas — você vai colar na Vercel.

**Opção B — Fazer manualmente no Bloco de Notas**

1. Abra o arquivo JSON no Bloco de Notas.
2. Selecione tudo (Ctrl+A).
3. Apague todas as quebras de linha: use Substituir (Ctrl+H), em "Localizar" coloque quebra de linha (ou procure por "Quebra de linha" / "Line break") e em "Substituir" deixe vazio, depois substitua tudo.
4. O resultado deve ser um texto longo em uma única linha. Copie e guarde.

---

## Parte 6 — Configurar as variáveis na Vercel

### 6.1 Abrir o projeto na Vercel

1. Acesse **https://vercel.com** e faça login.
2. Na lista de projetos, clique no projeto da **Mattilha** (o que está ligado ao repositório Mattilha-LP).

### 6.2 Abrir as variáveis de ambiente

1. No topo, clique na aba **Settings** (Configurações).
2. No menu da esquerda, clique em **Environment Variables** (Variáveis de ambiente).

### 6.3 Criar a variável GOOGLE_SHEETS_CREDENTIALS

1. No campo **Key** (Nome), digite exatamente: `GOOGLE_SHEETS_CREDENTIALS`
2. No campo **Value** (Valor), **cole todo o JSON** que você deixou em uma linha (o que você preparou na Parte 5).
3. Em "Environment", marque **Production** (e, se quiser, Preview e Development também).
4. Clique em **Save**.

### 6.4 Criar a variável GOOGLE_SHEET_ID

1. Clique de novo em **Add New** (ou "Add") para outra variável.
2. **Key:** `GOOGLE_SHEET_ID`
3. **Value:** cole **apenas o ID da planilha** que você copiou na Parte 1 (a parte da URL entre `/d/` e `/edit`). Exemplo: `1xYzAbC123DeF`
4. Marque o ambiente (Production, etc.) e clique em **Save**.

### 6.5 Criar a variável SITE_URL

1. Adicione mais uma variável.
2. **Key:** `SITE_URL`
3. **Value:** a URL do seu site, **sem barra no final**.
   - Se for o domínio da Vercel: `https://mattilha-lp.vercel.app` (troque pelo nome real do seu projeto).
   - Se você usa domínio próprio: `https://seudominio.com.br`
4. Salve.

### 6.6 Fazer um novo deploy

As variáveis só valem para deploys feitos **depois** de salvá-las.

1. Vá na aba **Deployments** (Implantações).
2. No último deploy, clique nos três pontinhos (**...**) → **Redeploy**.
3. Confirme com **Redeploy** de novo.
4. Aguarde o deploy terminar (status "Ready").

---

## Parte 7 — Testar

1. Abra no navegador a página de cadastro do seu site (a URL da **lead.html** na Vercel).
2. Preencha nome, e-mail e WhatsApp e envie o formulário.
3. Você deve ser redirecionado para a página **obrigado.html**.
4. Abra a planilha **Leads Mattilha** no Google Sheets e confira se apareceu uma nova linha com a data/hora, nome, e-mail, WhatsApp e "lead.html" na coluna Origem.

---

## Se der erro

- **Erro 500 ou "Serviço indisponível"**: confira se as três variáveis estão corretas na Vercel e se você fez **Redeploy** depois de salvá-las. Confira também se o JSON está em uma linha só e sem caracteres a mais.
- **Nenhuma linha na planilha**: confira se você **compartilhou** a planilha com o e-mail da conta de serviço (client_email do JSON) com permissão **Editor**.
- **Aba com outro nome**: se a primeira aba da planilha não se chama "Página1", abra o arquivo **api/cadastro.js** no projeto, procure `range: 'Página1!A:E'` e troque **Página1** pelo nome exato da sua aba (por exemplo `Leads`).

Se quiser, descreva a mensagem de erro ou o que aparece na tela que eu te ajudo a achar o passo que falhou.
