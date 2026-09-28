import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("/tmp/aurlixa-shots", { recursive: true });

const browser = await chromium.launch();
const errors = [];

async function capture(url, path, viewport) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: "reduce",
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(`${url}: pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`${url}: console.error: ${m.text()}`);
  });
  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  // Tüm görsellerin inmesini bekle (lazy dahil), en fazla 20 sn
  await page
    .waitForFunction(
      () => [...document.images].every((i) => i.complete && i.naturalWidth > 0),
      { timeout: 20000 }
    )
    .catch(() => errors.push(`${url}: bazı görseller 20 sn içinde inmedi`));
  await page.waitForTimeout(600);
  // Sticky header, tam sayfa yakalamada yapıştırma artefaktı yaratıyor;
  // yakalık için statik hale getir (uygulama davranışı değişmiyor).
  await page.addStyleTag({
    content: "header{position:static !important}",
  });
  await page.screenshot({ path, fullPage: true });
  console.log("captured", path);
  await context.close();
}

await capture("http://localhost:3100", "/tmp/aurlixa-shots/home-desktop.png", { width: 1440, height: 900 });
await capture("http://localhost:3100/urun/zarif-damla-kolye", "/tmp/aurlixa-shots/product-desktop.png", { width: 1440, height: 900 });
await capture("http://localhost:3100", "/tmp/aurlixa-shots/home-mobile.png", { width: 390, height: 844 });

if (errors.length) {
  console.log("PAGE ERRORS:");
  for (const e of errors) console.log(" -", e);
} else {
  console.log("no console/page errors");
}

await browser.close();
