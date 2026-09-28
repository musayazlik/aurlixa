import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Mesafeli Satış Sözleşmesi",
  description:
    "Aurlixa internet satışlarında uygulanan mesafeli satış sözleşmesi, cayma hakkı ve iade koşulları.",
};

export default function DistanceSalesPage() {
  return (
    <>
      <SiteHeader />
      <LegalPage
        title="Mesafeli Satış Sözleşmesi"
        updated="1 Eylül 2026"
        intro="İş bu sözleşme, 6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği (OG: 27.11.2014/29188) uyarınca, internet sitemiz üzerinden gerçekleştirdiğiniz satışlara ilişkin tarafların hak ve yükümlülüklerini düzenler."
        sections={[
          {
            id: "taraflar",
            title: "Taraflar",
            blocks: [
              {
                headers: ["SATICI", "Bilgi"],
                rows: [
                  ["Unvan", "Aurlixa Kuyumculuk San. ve Tic. A.Ş."],
                  ["Adres", "Kuyumcukent Caddesi No: 12, Küçükçekmece / İstanbul"],
                  ["Telefon", "+90 (212) 000 00 00"],
                  ["E-posta", "merhaba@aurlixa.com"],
                ],
              },
              {
                headers: ["ALICI", "Bilgi"],
                rows: [
                  ["Ad / Soyad", "Üyelik ve sipariş sırasında bildirilen bilgiler"],
                  ["Adres", "Sipariş formunda beyan edilen teslimat adresi"],
                  ["E-posta / Telefon", "Sipariş formunda beyan edilen iletişim bilgileri"],
                ],
              },
              "ALICI, sipariş sürecinde elektronik ortamda onay vermek suretiyle; sözleşme konusu ürünlerin temel nitelikleri, vergiler dahil fiyatı, ödeme ve teslimat koşulları ile cayma hakkına ilişkin ön bilgilendirmeyi okuduğunu ve kabul ettiğini beyan eder.",
            ],
          },
          {
            id: "konu",
            title: "Sözleşmenin Konusu",
            blocks: [
              "İş bu sözleşmenin konusu, ALICI'nin Aurlixa internet sitesinde elektronik ortamda sipariş verdiği, nitelikleri ve satış fiyatı sipariş özetinde belirtilen 14 ve 22 ayar altın takı ürünlerinin satışı ve teslimi ile tarafların hak ve yükümlülüklerine ilişkin hükümlerin belirlenmesidir.",
            ],
          },
          {
            id: "urun-teslimat",
            title: "Ürün ve Teslimat Bilgileri",
            blocks: [
              {
                headers: ["Kalem", "Bilgi"],
                rows: [
                  ["Ürünler", "Sipariş özetinde listelenen sertifikalı altın takılar"],
                  ["Fiyat", "Ürün sayfasında belirtilen KDV dahil tutar"],
                  ["Kargo Bedeli", "Tüm siparişlerde ücretsiz"],
                  ["Teslim Süresi", "Ödeme onayından itibaren 1–3 iş günü"],
                  ["Teslim Şekli", "Tam sigortalı kargo ile ALICI adresine"],
                  ["Ödeme Yöntemleri", "Kredi/Banka kartı (3D Secure), Havale/EFT, Kapıda Ödeme"],
                ],
              },
              "Ürünler, atölyemizden çıkmadan önce ayar ve gram denetiminden geçer ve sertifika ile birlikte özel hediye kutusunda gönderilir.",
            ],
          },
          {
            id: "odeme",
            title: "Fiyat, Ödeme ve Fatura",
            blocks: [
              "Ürün fiyatları tüm vergiler dâhildir. Kart ile yapılan ödemelerde 3D Secure doğrulaması zorunludur; doğrulama bankanız tarafından gerçekleştirilir ve Aurlixa kart bilgilerinizi kaydetmez. Havale/EFT ile ödemelerde sipariş, ödemenin hesabımıza ulaşmasını müteakip hazırlanır. Kapıda ödemede yönetmelik gereği 10.000 TL üzeri siparişlerde kart ile ödeme zorunludur.",
              "Ödeme onayından sonra ALICI'nin e-posta adresine elektronik fatura iletilir.",
            ],
          },
          {
            id: "cayma",
            title: "Cayma Hakkı",
            blocks: [
              "ALICI, ürünü teslim aldıktan sonra 14 gün içinde hiçbir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayma hakkına sahiptir. Aurlixa olarak bu hakkı, ambalajı açılmamış ve kullanılmamış ürünlerde 30 güne kadar genişletiyoruz.",
              "Cayma hakkının kullanılabilmesi için ürünün; hediye kutusu, sertifika ve tüm aksesuarlarıyla birlikte, hasarsız şekilde iade edilmesi gerekir. Kişiye özel ölçü veya isim işleme talebiyle üretilen ürünlerde cayma hakkı kullanılamaz; bu istisna sipariş öncesinde ALICI'ya açıkça bildirilir.",
              "Cayma bildirimi, merhaba@aurlixa.com adresine e-posta gönderilerek veya müşteri hizmetlerimiz aranarak yapılabilir.",
            ],
          },
          {
            id: "iade",
            title: "İade Usulü ve Geri Ödeme",
            blocks: [
              [
                "Cayma bildirimi sonrası ürün, tarafımıza hasarsız ulaşıncaya kadar özenle taşınmak zorundadır.",
                "İade kargo bedeli, cayma hakkı kapsamındaki iadelerde Aurlixa'ya aittir.",
                "Ürünün tarafımıza ulaşmasını müteakip, iade koşullarının sağlanması halinde geri ödeme; cayma bildiriminden itibaren 14 günü aşmamak üzere ve ürünün tesliminden sonraki 3 iş günü içinde ALICI'nın ödeme yöntemine yapılır.",
                "Kapıda ödeme ile alınan ürünlerde iade, ALICI'nın bildirdiği banka hesabına havale yoluyla yapılır.",
              ],
            ],
          },
          {
            id: "uyusmazlik",
            title: "Uyuşmazlık Çözümü",
            blocks: [
              "İş bu sözleşmeden doğan uyuşmazlıklarda; ALICI'nın şikâyet ve itirazları, tüketici mevzuatı çerçevesinde yerinde tüketici hakem heyetlerine veya tüketici mahkemelerine yapılabilir. Para sınırı itibarıyla hakem heyetlerine başvurulabilir merciler, her yıl T.C. Ticaret Bakanlığınca yayımlanır.",
              "Siparişinizi gerçekleştirmeden önce bu sözleşmeyi ve site üzerinde yayımlanan ön bilgilendirme formunu incelemenizi rica ederiz.",
            ],
          },
        ]}
      />
      <SiteFooter />
    </>
  );
}
