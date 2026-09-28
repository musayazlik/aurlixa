import {
  Button,
  Heading,
  Text,
} from "@react-email/components";
import { EmailLayout } from "./components/email-layout";

export function VerifyEmail({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  return (
    <EmailLayout preview="Aurlixa hesabınızı doğrulayın">
      <Text className="m-0 text-[11px] font-medium tracking-[0.28em] text-gold-deep uppercase">
        E-posta Doğrulama
      </Text>
      <Heading className="mx-0 mt-3 mb-4 font-heading text-[30px] leading-[1.15] font-medium text-espresso">
        Merhaba {name}, hoş geldiniz.
      </Heading>
      <Text className="m-0 text-[15px] leading-relaxed text-espresso/70">
        Aurlixa hesabınız oluşturuldu. Siparişlerinizi takip edebilmeniz ve
        ödemeyi hızlandırabilmeniz için e-posta adresinizi doğrulamanız
        gerekiyor.
      </Text>
      <Button
        href={url}
        className="mt-7 block bg-espresso px-8 py-4 text-center text-[12px] font-medium tracking-[0.24em] text-ivory no-underline"
      >
        E-POSTAMI DOĞRULA
      </Button>
      <Text className="mt-7 text-[13px] leading-relaxed text-espresso/50">
        Düğme çalışmıyorsa bağlantıyı kopyalayıp tarayıcınıza yapıştırın:
      </Text>
      <Text className="mt-1 text-[12px] break-all text-gold-deep">{url}</Text>
      <Text className="mt-6 text-[12px] leading-relaxed text-espresso/40">
        Bağlantı 1 saat geçerlidir. Bu isteği siz yapmadıysanız bu e-postayı
        yok sayabilirsiniz.
      </Text>
    </EmailLayout>
  );
}

export default Object.assign(VerifyEmail, {
  PreviewProps: {
    name: "Ayşe",
    url: "http://localhost:3000/api/auth/verify-email?token=ornek-token&callbackURL=%2Fdogrulandi",
  },
});
