/**
 * Plunk transactional e-posta göndericisi.
 *
 * PLUNK_SECRET_KEY tanımlıysa mailler https://next-api.useplunk.com üzerinden
 * gider; tanımlı değilse (geliştirme ortamı) HTML çıktısı sunucu konsoluna
 * yazılır — böylece akış anahtar olmadan da test edilebilir.
 */

const PLUNK_API_URL = "https://next-api.useplunk.com/v1/send";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const apiKey = process.env.PLUNK_SECRET_KEY;

  if (!apiKey) {
    console.warn(
      [
        "",
        "────────── 📧 PLUNK_SECRET_KEY tanımlı değil — e-posta gönderilmedi ──────────",
        `Kime:    ${to}`,
        `Konu:    ${subject}`,
        "Bağlantı içeriği için aşağıdaki HTML'i bir dosyaya kaydedip açabilirsiniz.",
        "──────────────────────────────────────────────────────────────────────────────",
        "",
      ].join("\n")
    );
    console.log(html);
    return;
  }

  const res = await fetch(PLUNK_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to, subject, body: html }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `Plunk e-posta gönderimi başarısız (HTTP ${res.status}): ${detail}`
    );
  }
}
