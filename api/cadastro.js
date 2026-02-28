const { google } = require('googleapis');

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

function parseBody(rawStr, contentType) {
  if (!rawStr) return {};
  if (contentType?.includes('application/json')) {
    try { return JSON.parse(rawStr); } catch (_) { return {}; }
  }
  return Object.fromEntries(new URLSearchParams(rawStr));
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método não permitido' });
  }

  let body = {};
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    body = req.body;
  } else {
    const rawStr = typeof req.body === 'string' ? req.body : await getRawBody(req);
    body = parseBody(rawStr, req.headers['content-type']);
  }
  const nome = (body.nome || '').trim();
  const email = (body.email || '').trim();
  const whatsapp = (body.whatsapp || '').trim();

  if (!nome || !email || !whatsapp) {
    return res.status(400).json({ error: 'Preencha nome, e-mail e WhatsApp.' });
  }

  const credentialsJson = process.env.GOOGLE_SHEETS_CREDENTIALS;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const siteUrl = (process.env.SITE_URL || '').replace(/\/$/, '');

  if (!credentialsJson || !sheetId) {
    console.error('GOOGLE_SHEETS_CREDENTIALS ou GOOGLE_SHEET_ID não configurados na Vercel.');
    return res.status(500).json({ error: 'Serviço temporariamente indisponível. Tente mais tarde.' });
  }

  let credentials;
  try {
    credentials = JSON.parse(credentialsJson);
  } catch (e) {
    console.error('GOOGLE_SHEETS_CREDENTIALS inválido (JSON).');
    return res.status(500).json({ error: 'Configuração inválida.' });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const now = new Date();
    const row = [
      now.toISOString(),
      nome,
      email,
      whatsapp,
      'lead.html',
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Página1!A:E',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [row] },
    });
  } catch (err) {
    console.error('Erro ao gravar na planilha:', err.message);
    return res.status(500).json({ error: 'Não foi possível salvar. Tente novamente.' });
  }

  if (siteUrl) {
    res.setHeader('Location', `${siteUrl}/obrigado.html`);
    return res.status(302).end();
  }

  return res.status(200).json({ ok: true, redirect: '/obrigado.html' });
};
