import { chromium } from "playwright";

const browser = await chromium.launch();
const BASE = "http://localhost:3000";

const CART = [
  { slug: "zarif-damla-kolye", qty: 1 },
  { slug: "orgu-desen-bileklik", qty: 2 },
];

// ——— Akış 1: Ödeme formunu doldur → siparişi tamamla ———
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await context.addInitScript((cart) => {
    window.localStorage.setItem("aurlixa-cart", JSON.stringify(cart));
  }, CART);
  const page = await context.newPage();
  await page.goto(BASE + "/odeme", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Ayşe", { exact: true }).fill("Ayşe");
  await page.getByPlaceholder("Yılmaz", { exact: true }).fill("Yılmaz");
  await page.getByPlaceholder("ayse@ornek.com").fill("ayse@test.com");
  await page.getByPlaceholder("0555 123 45 66").fill("05551234566");
  await page.selectOption("select", "İstanbul");
  await page.getByPlaceholder("Nişantaşı").fill("Şişli");
  await page.getByPlaceholder("Mahalle, sokak, bina ve daire numarası").fill("Teşvikiye Mah. İnci Sok. No: 8");
  await page.getByPlaceholder("AYŞE YILMAZ").fill("AYŞE YILMAZ");
  await page.getByPlaceholder("0000 0000 0000 0000").fill("4242424242424242");
  await page.getByPlaceholder("AA/YY").fill("1229");
  await page.getByPlaceholder("123", { exact: true }).fill("123");

  // Onay kutusu kapalıyken hata bekleniyor
  await page.getByRole("button", { name: /Siparişi Onayla/i }).click();
  await page.waitForTimeout(400);
  const errVisible = await page.getByRole("alert").count();
  console.log("onaysız submit → hata gösterildi:", errVisible > 0);

  await page.locator("#consent").check();
  await page.getByRole("button", { name: /Siparişi Onayla/i }).click();

  await page.waitForURL("**/odeme/basarili", { timeout: 15000 });
  console.log("yönlendirme:", page.url().includes("/odeme/basarili") ? "OK" : "FAIL");

  const orderNo = await page.locator("text=/AUR-[A-Z0-9]{6}/").first().textContent();
  console.log("sipariş no görünüyor:", orderNo?.trim() ? "OK" : "FAIL");

  const cartAfter = await page.evaluate(() => window.localStorage.getItem("aurlixa-cart"));
  console.log("sepet temizlendi:", cartAfter === "[]" ? "OK" : `FAIL (${cartAfter})`);

  const orderSaved = await page.evaluate(() => !!window.localStorage.getItem("aurlixa-last-order"));
  console.log("sipariş kaydedildi:", orderSaved ? "OK" : "FAIL");

  // Kapıda ödeme seçilince bedel ekleniyor mu?
  await page.goto(BASE + "/odeme", { waitUntil: "networkidle" });
  const cartAgain = await page.evaluate((c) => {
    window.localStorage.setItem("aurlixa-cart", JSON.stringify(c));
  }, CART);
  await page.reload({ waitUntil: "networkidle" });
  await page.getByText("Kapıda Ödeme", { exact: false }).first().click();
  await page.waitForTimeout(300);
  const feeShown = await page.getByText("49,00", { exact: false }).count();
  console.log("kapıda ödeme bedeli gösteriliyor:", feeShown > 0 ? "OK" : "CHECK");
  await context.close();
}

// ——— Akış 2: Kayıt ol → hesap sayfası → çıkış → giriş ———
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE + "/kayit", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Ayşe Yılmaz").fill("Derya Deniz");
  await page.getByPlaceholder("ornek@aurlixa.com").fill("derya@test.com");
  await page.locator('input[autocomplete="new-password"]').first().fill("parola123");
  await page.locator('input[autocomplete="new-password"]').nth(1).fill("parola123");
  await page.locator('input[type="checkbox"]').first().check();
  await page.getByRole("button", { name: "Üye Ol" }).click();

  await page.waitForURL("**/hesap", { timeout: 15000 });
  const greeting = await page.getByText("Merhaba, Derya.").count();
  console.log("kayıt → hesap karşılama:", greeting > 0 ? "OK" : "FAIL");

  // Çıkış yap → /giris'e git → giriş
  await page.getByRole("button", { name: "Çıkış Yap" }).click();
  await page.waitForURL(BASE + "/", { timeout: 15000 });
  console.log("çıkış → anasayfa:", page.url() === BASE + "/" ? "OK" : "FAIL");

  await page.goto(BASE + "/giris", { waitUntil: "networkidle" });
  await page.getByPlaceholder("ornek@aurlixa.com").fill("derya@test.com");
  await page.getByPlaceholder("••••••••").fill("yanlis");
  await page.getByRole("button", { name: "Giriş Yap" }).click();
  await page.waitForTimeout(1200);
  const errCount = await page.getByRole("alert").count();
  console.log("yanlış şifre → hata:", errCount > 0 ? "OK" : "FAIL");

  await page.getByPlaceholder("••••••••").fill("parola123");
  await page.getByRole("button", { name: "Giriş Yap" }).click();
  await page.waitForURL("**/hesap", { timeout: 15000 });
  console.log("doğru şifre → hesap:", page.url().includes("/hesap") ? "OK" : "FAIL");
  await context.close();
}

await browser.close();
console.log("TESTS_DONE");
