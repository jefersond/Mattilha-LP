# Como Aprovar e Publicar Avaliações

## Processo Atual (Manual)

Quando alguém envia uma avaliação pelo formulário, você precisa adicioná-la manualmente ao arquivo `reviews-agente-ia.json` para que ela apareça no site.

### Passo a Passo:

1. **Quando alguém envia uma avaliação:**
   - A avaliação é enviada (quando você configurar Formspree, você receberá por email)
   - Por enquanto, você precisa verificar manualmente ou pedir para a pessoa te enviar

2. **Abra o arquivo** `reviews-agente-ia.json`

3. **Adicione a nova avaliação** no array `reviews`, seguindo este formato:

```json
{
  "name": "Nome — Profissão",
  "rating": 5,
  "tagline": "Frase de destaque (opcional)",
  "text": "Texto completo da avaliação",
  "date": "2024-02-21T15:30:00Z"
}
```

**Exemplo:**

Se alguém enviou:
- Nome: "João — Designer"
- Nota: 5 estrelas
- Frase: "Economizou horas do meu dia"
- Texto: "Os agentes são incríveis! Agora consigo criar designs muito mais rápido."

Você adiciona assim no JSON:

```json
{
  "reviews": [
    {
      "name": "João — Designer",
      "rating": 5,
      "tagline": "Economizou horas do meu dia",
      "text": "Os agentes são incríveis! Agora consigo criar designs muito mais rápido.",
      "date": "2024-02-21T15:30:00Z"
    }
  ]
}
```

4. **Salve o arquivo**

5. **Faça commit e push:**

```powershell
git add reviews-agente-ia.json
git commit -m "Adiciona avaliação de João"
git push
```

6. **Aguarde 1-2 minutos** - A avaliação aparecerá automaticamente no site para todos!

## Configurar Formspree (Recomendado)

Para receber avaliações automaticamente por email:

1. Acesse https://formspree.io
2. Crie uma conta gratuita
3. Crie um novo formulário
4. Copie o endpoint (ex: `https://formspree.io/f/xxxxx`)
5. No arquivo `agente-ia.html`, procure por `FORMSPREE_URL` e substitua `YOUR_FORM_ID` pelo seu endpoint
6. Descomente a linha que envia para Formspree (procure por `// await fetch(FORMSPREE_URL`)

Assim você receberá todas as avaliações por email e pode aprová-las adicionando ao JSON.

## Dicas

- **Rating:** Use números de 1 a 5 (estrelas)
- **Date:** Use formato ISO (ex: `2024-02-21T15:30:00Z`) - você pode usar a data atual
- **Tagline:** Opcional, mas ajuda a destacar a avaliação
- **Ordem:** As avaliações mais recentes aparecem primeiro (adicione no início do array)

## Exemplo Completo do JSON

```json
{
  "reviews": [
    {
      "name": "João — Designer",
      "rating": 5,
      "tagline": "Economizou horas do meu dia",
      "text": "Os agentes são incríveis! Agora consigo criar designs muito mais rápido.",
      "date": "2024-02-21T15:30:00Z"
    },
    {
      "name": "Maria — Social Media",
      "rating": 5,
      "tagline": "Virou meu ponto de partida diário",
      "text": "Uso os agentes pra montar pauta, roteiros curtos e legendas.",
      "date": "2024-02-20T10:00:00Z"
    }
  ]
}
```
