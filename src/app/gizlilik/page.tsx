import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Aurlixa olarak kişisel verilerinizi nasıl topladığımız, işlediğimiz ve koruduğumuz hakkında bilgilendirme.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <LegalPage
        title="Gizlilik Politikası"
        updated="1 Eylül 2026"
        intro="Aurlixa olarak gizliliğinize önem veriyoruz. Bu politika; web sitemizi ziyaret ettiğinizde, üye olduğunuzda ve alışveriş yaptığınızda kişisel verilerinizi hangi amaçlarla topladığımızı, işlediğimizi ve koruduğumuzu açıklar."
        sections={[
          {
            id: "toplanan-veriler",
            title: "Topladığımız Veriler",
            blocks: [
              "Sipariş işleyebilmeniz ve size en iyi deneyimi sunabilmemiz için yalnızca gerekli olan verileri toplarız:",
              [
                "Kimlik ve iletişim verileriniz: ad, soyad, e-posta, telefon.",
                "Teslimat verileriniz: teslimat adresi, fatura bilgileri.",
                "Sipariş verileriniz: sepetinizdeki ürünler, sipariş geçmişi, tercih ettiğiniz ödeme yöntemi.",
                "Teknik veriler: IP adresi, tarayıcı türü, ziyaret ettiğiniz sayfalar — site güvenliği ve performans analizi amacıyla.",
              ],
            ],
          },
          {
            id: "isleme-amaclari",
            title: "Verilerin İşlenme Amaçları",
            blocks: [
              "Topladığımız kişisel verileri aşağıdaki amaçlarla işliyoruz:",
              [
                "Siparişlerinizin alınması, hazırlanması, kargoya verilmesi ve teslim edilmesi.",
                "Ödeme işlemlerinin gerçekleştirilmesi ve dolandırıcılığın önlenmesi.",
                "Sipariş, kargo ve iade süreçlerine ilişkin bildirimlerin gönderilmesi.",
                "Onay vermeniz halinde kampanya ve yeni koleksiyon duyurularının paylaşılması.",
                "Müşteri memnuniyeti süreçlerinin yürütülmesi ve taleplerin yanıtlanması.",
                "Yasal yükümlülüklerin (fatura, muhasebe, vergi) yerine getirilmesi.",
              ],
            ],
          },
          {
            id: "cerezler",
            title: "Çerezler ve Yerel Depolama",
            blocks: [
              "Sitemizde oturum yönetimi ve sepet işlevselliği için zorunlu çerezler ile cihazınızın yerel depolama alanı (localStorage) kullanılır. Sepetiniz ve oturum tercihiniz yalnızca cihazınızda saklanır; bu veriler sunucularımıza gönderilmez. Analitik ve pazarlama çerezleri yalnızca açık onayınızla kullanılır. Ayrıntılar için Çerez Politikamızı inceleyebilirsiniz.",
            ],
          },
          {
            id: "paylasim",
            title: "Üçüncü Taraflarla Paylaşım",
            blocks: [
              "Kişisel verileriniz, hizmetin sunulabilmesi için gerekli durumlarda ve yalnızca ihtiyaç duyulan ölçüde şu iş ortaklarımızla paylaşılır:",
              [
                "Kargo firmaları: teslimat adresiniz, siparişin teslim edilmesi amacıyla.",
                "Ödeme kuruluşları ve bankalar: ödeme işleminin gerçekleştirilmesi amacıyla; kart bilgileriniz sistemimizde saklanmaz.",
                "Muhasebe ve yasal danışmanlarımız: yasal yükümlülüklerin yerine getirilmesi amacıyla.",
                "Yetkili kamu kurumları: yalnızca yasal talep halinde.",
              ],
              "Verileriniz hiçbir koşulda üçüncü taraflar tarafından pazarlama amacıyla satın alınmaz ve izniniz olmaksızın paylaşılmaz.",
            ],
          },
          {
            id: "guvenlik",
            title: "Veri Güvenliği",
            blocks: [
              "Sitemize tüm veri aktarımı 256-bit SSL şifrelemesi ile korunur. Ödeme adımında kart bilgileriniz 3D Secure altyapısıyla doğrudan bankanız tarafından doğrulanır; Aurlixa sistemlerinde kart bilgisi tutulmaz.",
              "Kişisel verilere erişim, görevleri gereği erişmesi gereken çalışanlarımızla sınırlıdır ve tüm çalışanlarımız gizlilik yükümlülüğü altındadır.",
            ],
          },
          {
            id: "saklama",
            title: "Saklama Süreleri",
            blocks: [
              "Sipariş ve fatura verileri, vergi mevzuatının gerektirdiği 10 yıl boyunca saklanır. Üyelik verileri, üyeliğiniz son bulana ve yasal saklama süreleri doluncaya kadar saklanır. Pazarlama izinleriniz, izni kaldırana kadar saklanır.",
            ],
          },
          {
            id: "haklariniz",
            title: "Haklarınız ve İletişim",
            blocks: [
              "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında verilerinize erişme, düzeltilmesini veya silinmesini isteme, işlemeye itiraz etme ve rıza verdiğiniz işlemlerden dönme haklarına sahipsiniz. Taleplerinizi merhaba@aurlixa.com adresine e-posta ile iletebilirsiniz; en geç 30 gün içinde yanıtlanır.",
              "Ayrıntılar için KVKK Aydınlatma Metnimizi inceleyebilirsiniz.",
            ],
          },
        ]}
      />
      <SiteFooter />
    </>
  );
}
