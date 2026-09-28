import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "İade & Değişim",
  description:
    "Aurlixa'da 30 gün koşulsuz iade ve kolay değişim. İade süreci, kargo ve geri ödeme koşulları.",
};

export default function ReturnPolicyPage() {
  return (
    <>
      <SiteHeader />
      <LegalPage
        title="İade & Değişim Politikası"
        updated="1 Eylül 2026"
        intro="Altın takı almak güven ister. Bu yüzden satın aldığınız her parçayı, hediye kutusu ve sertifikasıyla birlikte, 30 gün içinde koşulsuz iade etme hakkı sunuyoruz."
        sections={[
          {
            id: "iade-kosullari",
            title: "İade Koşulları",
            blocks: [
              "İadenizin sorunsuz tamamlanabilmesi için ürünün aşağıdaki koşulları sağlaması gerekir:",
              [
                "Ürün kullanılmamış, çizik veya hasarsız olmalı.",
                "Hediye kutusu, sertifika ve tüm aksesuarlar eksiksiz iade edilmeli.",
                "İade talebi, teslimden itibaren 30 gün içinde iletilmeli.",
                "Kişiye özel ölçü, isim işleme veya el kazıması gibi özel üretim talepleri cayma hakkı kapsamına girmez.",
              ],
            ],
          },
          {
            id: "iade-sureci",
            title: "İade Süreci",
            blocks: [
              [
                "Adım 1 — Talep: merhaba@aurlixa.com adresine sipariş numaranızla e-posta gönderin veya müşteri hizmetlerimizi arayın.",
                "Adım 2 — Kargo: iade kargo kodunu SMS ve e-posta ile iletiyoruz; ürünü orijinal kutusuyla aynı kargoya teslim edin.",
                "Adım 3 — Kontrol: ürün atölyemizde ayar, gram ve hasar kontrolünden geçer (genellikle aynı gün).",
                "Adım 4 — Geri ödeme: kontrol tamamlanınca 3 iş günü içinde ödemeniz kartınıza iade edilir.",
              ],
            ],
          },
          {
            id: "geri-odeme",
            title: "Geri Ödeme",
            blocks: [
              "Geri ödeme, sipariş sırasında kullandığınız ödeme yöntemine yapılır. Kredi kartı iadeleri, bankanızın işlem süresine bağlı olarak kart ekstrenize 3–7 iş günü içinde yansır. Havale/EFT ile alınan siparişlerde ödeme, beyan ettiğiniz hesaba yapılır. Kapıda ödeme siparişlerinde, iade tutarı banka hesabınıza havale yoluyla gönderilir.",
              "İade kargo bedeli, cayma hakkı kapsamındaki iadelerde Aurlixa'ya aittir; ürün hatasından kaynaklanmayan tercih iadelerinde de ücretsizdir.",
            ],
          },
          {
            id: "degisim",
            title: "Değişim",
            blocks: [
              "Aynı ürünün farklı bir modelini veya aynı fiyat aralığındaki başka bir parçayı talep edebilirsiniz. Değişim taleplerinde yeni ürün, iade ürünümüz denetimden geçtikten sonra ücretsiz kargoyla gönderilir. Farklı fiyattaki bir ürün seçerseniz fark tutarı ödeme bağlantısı üzerinden ya da iade olarak halledilir.",
              "Değişimde de iade koşulları geçerlidir: ürün kullanılmamış ve tüm içeriğiyle birlikte gelmiş olmalıdır.",
            ],
          },
          {
            id: "teslimat",
            title: "Kargo & Teslimat",
            blocks: [
              "Tüm siparişler ücretsiz ve tam sigortalı kargo ile gönderilir. Ödeme onayından sonra ürünleriniz atölyemizde sertifika ve hediye kutusuyla hazırlanır; 1–3 iş günü içinde kargoya teslim edilir. Yurt dışı gönderilerde teslim süresi 5–7 iş günüdür ve gümrük süreçleri alıcıya aittir.",
              "Siparişiniz kargoya verildiğinde takip numarası SMS ve e-posta ile iletilir. Kurye teslimde kimlik kontrolü yapabilir; yüksek tutarlı altın siparişlerinde teslimat yalnızca alıcının kendisine yapılır.",
            ],
          },
          {
            id: "sss",
            title: "Sıkça Sorulan Sorular",
            blocks: [
              [
                "Sertifika ile birlikte mi geliyor? Evet; her parça, ayar ve gram bilgilerini belirten resmi sertifika ile gönderilir.",
                "Hediye edeceğim ürünü iade edebilir miyim? Evet; fiyat bilgisi içermeyen hediye fişi ile 30 gün içinde değiştirilebilir.",
                "Ürün kutusu zarar gördüyse? Ürününüz hasarlı veya yanlış ulaştıysa 24 saat içinde bize bildirin; kargo ücreti de dâhil tüm masraflar bize aittir.",
                "Ayarlama hizmeti var mı? Zincir ve bilekliklerde ücretsiz boy ayarlama yapıyoruz; talebinizi sipariş notuna ekleyebilirsiniz.",
              ],
            ],
          },
        ]}
      />
      <SiteFooter />
    </>
  );
}
