# Como Adicionar Novas Avaliações

Quando você receber uma nova avaliação (via Formspree ou outro método), siga estes passos para publicá-la:

## Passo a Passo

1. **Abra o arquivo** `reviews-agente-ia.json` no seu editor

2. **Adicione a nova avaliação** no array `reviews`, seguindo este formato:

```json
{
  "name": "Nome — Profissão",
  "rating": 5,
  "tagline": "Frase de destaque (opcional)",
  "text": "Texto completo da avaliação",
  "date": "2024-02-21T15:30:00Z"
}
```

**Exemplo completo:**

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

3. **Salve o arquivo**

4. **Faça commit e push:**

```powershell
git add reviews-agente-ia.json
git commit -m "Adiciona nova avaliação do Agente IA"
git push
```

5. **Aguarde 1-2 minutos** para a Vercel atualizar

## Configurar Formspree (Opcional)

Se quiser receber avaliações por email automaticamente:

1. Acesse https://formspree.io
2. Crie uma conta gratuita
3. Crie um novo formulário
4. Copie o endpoint (ex: `https://formspree.io/f/xxxxx`)
5. No arquivo `agente-ia.html`, linha com `FORMSPREE_URL`, substitua `YOUR_FORM_ID` pelo seu endpoint
6. Descomente a linha que envia para Formspree (procure por `// await fetch(FORMSPREE_URL`)

## Dicas

- **Rating:** Use números de 1 a 5 (estrelas)
- **Date:** Use formato ISO (ex: `2024-02-21T15:30:00Z`)
- **Tagline:** Opcional, mas ajuda a destacar a avaliação
- **Ordem:** As avaliações mais recentes aparecem primeiro
