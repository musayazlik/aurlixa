import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Aurlixa'nın veri sorumlusu kimliği, işleme amaçları ve haklarınız.",
};

export default function KvkkPage() {
  return (
    <>
      <SiteHeader />
      <LegalPage
        title="KVKK Aydınlatma Metni"
        updated="1 Eylül 2026"
        intro="İş bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, veri sorumlusu olarak hareket eden Aurlixa tarafından işlenen kişisel verilerinize ilişkin bilgilendirme amacıyla hazırlanmıştır."
        sections={[
          {
            id: "veri-sorumlusu",
            title: "Veri Sorumlusu",
            blocks: [
              {
                headers: ["Unvan", "Bilgi"],
                rows: [
                  ["Ticari Unvan", "Aurlixa Kuyumculuk San. ve Tic. A.Ş."],
                  ["Adres", "Kuyumcukent Caddesi No: 12, Küçükçekmece / İstanbul"],
                  ["E-posta", "merhaba@aurlixa.com"],
                  ["Telefon", "+90 (212) 000 00 00"],
                ],
              },
            ],
          },
          {
            id: "islenen-veriler",
            title: "İşlenen Kişisel Veriler",
            blocks: [
              "Web sitemizi kullandığınızda ve alışveriş yaptığınızda aşağıdaki kişisel veri kategorileri işlenir:",
              [
                "Kimlik bilgileri: ad, soyad.",
                "İletişim bilgileri: e-posta adresi, telefon numarası, teslimat adresi.",
                "Müşteri işlem bilgileri: sipariş geçmişi, sepet içeriği, iade ve değişim talepleri.",
                "İşlem güvenliği bilgileri: IP adresi, cihaz ve tarayıcı bilgileri, site içi gezinme kayıtları.",
                "Rıza ve pazarlama bilgileri: bülten aboneliği tercihleriniz.",
              ],
            ],
          },
          {
            id: "isleme-kosullari",
            title: "İşleme Amaçları ve Hukuki Sebepler",
            blocks: [
              {
                headers: ["İşleme Amacı", "Hukuki Sebep (KVKK m.5)"],
                rows: [
                  [
                    "Sipariş alınması, hazırlanması ve teslim edilmesi",
                    "Sözleşmenin kurulması ve ifası",
                  ],
                  [
                    "Ödemenin gerçekleştirilmesi, fatura düzenlenmesi",
                    "Sözleşmenin ifası ve hukuki yükümlülük",
                  ],
                  [
                    "Kargo bildirimleri ve müşteri desteği",
                    "Sözleşmenin ifası ve meşru menfaat",
                  ],
                  [
                    "Bülten ve kampanya iletişimi",
                    "Açık rıza",
                  ],
                  [
                    "Site güvenliğinin sağlanması, dolandırıcılığın önlenmesi",
                    "Meşru menfaat ve hukuki yükümlülük",
                  ],
                  [
                    "Vergi ve muhasebe kayıtlarının tutulması",
                    "Hukuki yükümlülük",
                  ],
                ],
              },
            ],
          },
          {
            id: "aktarim",
            title: "Kişisel Verilerin Aktarımı",
            blocks: [
              "Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesiyle sınırlı olmak üzere ve KVKK m.8–9'da öngörülen güvenlik tedbirleri alınarak; kargo firmalarına (teslimat), ödeme kuruluşlarına ve bankalara (tahsilat), muhasebe hizmeti sağlayıcılarına ve yalnızca yasal zorunluluk halinde yetkili kamu kurum ve kuruluşlarına aktarılabilir. Yurt dışına aktarım, onayınız ve gerekli mevzuat koşulları sağlanmaksızın yapılmaz.",
            ],
          },
          {
            id: "saklama-sureleri",
            title: "Saklama ve İmha Süreleri",
            blocks: [
              "Kişisel verileriniz, işleme amacının gerektirdiği süre ve mevzuatta öngörülen zorunlu saklama süreleri boyunca saklanır. Bu sürelerin sonunda veriler, silme, yok etme veya anonimleştirme yöntemleriyle KVKK m.7'ye uygun şekilde imha edilir.",
            ],
          },
          {
            id: "haklar",
            title: "KVKK m.11 Kapsamındaki Haklarınız",
            blocks: [
              "Veri sorumlusuna başvurarak;",
              [
                "Kişisel verilerinizin işlenip işlenmediğini öğrenme.",
                "İşlenmişse buna ilişkin bilgi talep etme.",
                "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme.",
                "Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme.",
                "Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme.",
                "KVKK m.7'de öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme.",
                "Bu işlemlerin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme.",
                "Münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme.",
                "Kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme.",
              ],
            ],
          },
          {
            id: "basvuru",
            title: "Başvuru Yolu",
            blocks: [
              "Haklarınıza ilişkin taleplerinizi, kimliğinizi tespit edici bilgilerle birlikte merhaba@aurlixa.com adresine e-posta ile iletebilirsiniz. Başvurularınız en geç 30 gün içinde ücretsiz olarak yanıtlanır; işlemin ayrıca bir maliyet gerektirmesi halinde Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücretler uygulanabilir.",
            ],
          },
        ]}
      />
      <SiteFooter />
    </>
  );
}
