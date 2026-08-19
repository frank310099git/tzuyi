function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const raw = typeof req.body === 'string' ? req.body : '';
  return Object.fromEntries(new URLSearchParams(raw));
}

function safeReturnPage(value) {
  const allowed = new Set(['form1.html','form1-lang1.html','form1-lang2.html']);
  return allowed.has(value) ? value : 'form1.html';
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).send('Method Not Allowed');
  }

  const data = parseBody(req);
  const returnPage = safeReturnPage(data.return_page);
  const lang = data.lang === '2' ? '2' : '1';

  // Honeypot spam trap.
  if (data.website) return res.redirect(303, `/${returnPage}?sent=1`);

  const name = String(data['data[0]'] || '').trim();
  const phone = String(data['data[1]'] || '').trim();
  const email = String(data['data[2]'] || '').trim();
  const topic = String(data['data[3]'] || '').trim();
  const content = String(data['data[4]'] || '').trim();

  if (!name || !phone || !email || !topic || !content) {
    return res.redirect(303, `/${returnPage}?error=required`);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error('Missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL');
    return res.redirect(303, `/${returnPage}?error=config`);
  }

  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const html = `
    <h2>${lang === '2' ? 'Webサイトからのお問い合わせ' : '網站聯絡表單'}</h2>
    <p><strong>${lang === '2' ? 'お名前' : '姓名'}：</strong>${esc(name)}</p>
    <p><strong>${lang === '2' ? '電話' : '聯絡電話'}：</strong>${esc(phone)}</p>
    <p><strong>Email：</strong>${esc(email)}</p>
    <p><strong>${lang === '2' ? '件名' : '主題'}：</strong>${esc(topic)}</p>
    <p><strong>${lang === '2' ? '内容' : '內容'}：</strong><br>${esc(content).replace(/\n/g,'<br>')}</p>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[TZ YI Website] ${topic}`,
        html
      })
    });
    if (!r.ok) {
      console.error('Resend error', r.status, await r.text());
      return res.redirect(303, `/${returnPage}?error=send`);
    }
    return res.redirect(303, `/${returnPage}?sent=1`);
  } catch (err) {
    console.error(err);
    return res.redirect(303, `/${returnPage}?error=send`);
  }
};
