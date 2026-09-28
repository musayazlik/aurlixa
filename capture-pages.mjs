import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("/tmp/aurlixa-shots", { recursive: true });

const browser = await chromium.launch();
const BASE = "http://localhost:3000";

const CART = [
  { slug: "zarif-damla-kolye", qty: 1 },
  { slug: "orgu-desen-bileklik", qty: 2 },
];

const ORDER = {
  no: "AUR-K4M2X8",
  date: new Date().toISOString(),
  name: "Ayşe Yılmaz",
  email: "ayse@ornek.com",
  phone: "0555 123 45 66",
  address: {
    city: "İstanbul",
    district: "Şişli",
    line: "Teşvikiye Mah. İnci Sok. No: 8 D: 3",
    postal: "34365",
  },
  payment: { method: "card", label: "Kredi / Banka Kartı" },
  items: [
    {
      slug: "zarif-damla-kolye",
      name: "Zarif Damla Kolye",
      qty: 1,
      price: 24950,
      image: "/images/neck-pendant-diamond.jpg",
    },
    {
      slug: "orgu-desen-bileklik",
      name: "Örgü Desen Bileklik",
      qty: 2,
      price: 58900,
      image: "/images/bracelet-chain-pink.jpg",
    },
  ],
  subtotal: 142750,
  shipping: 0,
  fee: 0,
  total: 142750,
};

const USER = {
  name: "Ayşe Yılmaz",
  email: "ayse@ornek.com",
  since: "2024-11-20T10:00:00.000Z",
};

async function capture(path, name, viewport, seed) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: "reduce",
    deviceScaleFactor: 1,
  });
  if (seed) {
    await context.addInitScript((data) => {
      for (const [k, v] of Object.entries(data)) {
        window.localStorage.setItem(k, JSON.stringify(v));
      }
    }, seed);
  }
  const page = await context.newPage();
  await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 90000 });
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(600);
  await page.screenshot({ path: `/tmp/aurlixa-shots/${name}.png`, fullPage: true });
  console.log("captured", name);
  await context.close();
}

const desktop = { width: 1440, height: 900 };
const mobile = { width: 390, height: 844 };

const cartSeed = { "aurlixa-cart": CART };
const orderSeed = { "aurlixa-last-order": ORDER };
const userSeed = { "aurlixa-user": USER };

await capture("/sepet", "sepet-dolu", desktop, cartSeed);
await capture("/odeme", "odeme-kart", desktop, cartSeed);
await capture("/odeme/basarili", "odeme-basarili", desktop, orderSeed);
await capture("/giris", "giris", desktop);
await capture("/kayit", "kayit", desktop);
await capture("/sifremi-unuttum", "sifremi-unuttum", desktop);
await capture("/hesap", "hesap", desktop, userSeed);
await capture("/mesafeli-satis", "mesafeli-satis", desktop);
await capture("/kvkk", "kvkk", desktop);
await capture("/gizlilik", "gizlilik", desktop);
await capture("/cerez-politikasi", "cerez-politikasi", desktop);
await capture("/iade-degisim", "iade-degisim", desktop);
await capture("/sepet", "sepet-bos", desktop);
await capture("/odeme", "odeme-mobile", mobile, cartSeed);
await capture("/giris", "giris-mobile", mobile);

await browser.close();
