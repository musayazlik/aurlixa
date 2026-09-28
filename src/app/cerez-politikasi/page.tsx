import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description:
    "Aurlixa internet sitesinde kullanılan çerezler ve yerel depolama anahtarları hakkında bilgilendirme.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <SiteHeader />
      <LegalPage
        title="Çerez Politikası"
        updated="1 Eylül 2026"
        intro="Aurlixa olarak, internet sitemizi güvenli biçimde kullanabilmeniz için zorunlu çerezlere yer veriyor, diğer çerezleri ise yalnızca sizin izninizle kullanıyoruz. İş bu politika, kullandığımız çerezleri ve yerel depolama (localStorage) anahtarlarını açıklar."
        sections={[
          {
            id: "cerez-nedir",
            title: "Çerez Nedir?",
            blocks: [
              "Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınıza kaydedilen küçük metin dosyalarıdır. Yerel depolama ise benzer amaçlarla kullanılan ve tarayıcı kapatıldığında da silinmeyen bir cihaz depolama alanıdır. Her ikisi de sitenin çalışmasını kolaylaştırır ve deneyiminizi geliştirmek için tercihlerinizi hatırlar.",
            ],
          },
          {
            id: "kullandigimiz-cerezler",
            title: "Kullandığımız Çerezler ve Yerel Depolama",
            blocks: [
              {
                headers: ["Anahtar", "Tür", "Amaç", "Süre"],
                rows: [
                  [
                    "aurlixa-cart",
                    "Zorunlu (localStorage)",
                    "Sepetinizdeki ürünleri cihazınızda saklar; sunucuya gönderilmez.",
                    "Silinene kadar",
                  ],
                  [
                    "aurlixa-user",
                    "Zorunlu (localStorage)",
                    "Oturumunuzu açık tutar; ad ve e-posta bilginizi cihazınızda tutar.",
                    "Silinene kadar",
                  ],
                  [
                    "aurlixa-users",
                    "Zorunlu (localStorage)",
                    "Demo üyelik kayıtlarını yalnızca cihazınızda tutar.",
                    "Silinene kadar",
                  ],
                  [
                    "aurlixa-last-order",
                    "Zorunlu (localStorage)",
                    "Son siparişinizin özetini sipariş tamamlama ekranı için saklar.",
                    "Silinene kadar",
                  ],
                  [
                    "Analitik çerezleri",
                    "Analitik",
                    "Site içi gezinmeyi anonim olarak ölçerek deneyimi geliştirir.",
                    "Ona göre",
                  ],
                ],
              },
              "Sitemizde veri toplama amacıyla üçüncü taraf reklam veya takip çerezi kullanılmaz.",
            ],
          },
          {
            id: "cerez-yonetimi",
            title: "Çerezleri Nasıl Yönetebilirsiniz?",
            blocks: [
              "Tarayıcı ayarlarınızdan dilediğiniz zaman çerezleri silebilir, engelleyebilir veya belirli siteler için izin verebilirsiniz. Zorunlu çerezleri engellediğinizde sepetiniz ve oturumunuz düzgün çalışmayabilir.",
              "Sepetinizi temizlemek için sepet sayfasındaki ürün kaldırma düğmesini kullanabilir; üyelik verinizi tamamen silmek için tarayıcınızın site verilerini temizleme özelliğine başvurabilir veya hesabınızdan çıkış yapabilirsiniz.",
            ],
          },
          {
            id: "guncellemeler",
            title: "Politika Güncellemeleri",
            blocks: [
              "İş bu politika, kullanılan teknolojiler veya mevzuat değişiklikleri halinde güncellenebilir. Güncel sürüm her zaman bu sayfada yayımlanır; önemli değişikliklerde sitemiz üzerinden sizi bilgilendiririz. Sorularınız için merhaba@aurlixa.com adresine yazabilirsiniz.",
            ],
          },
        ]}
      />
      <SiteFooter />
    </>
  );
}

