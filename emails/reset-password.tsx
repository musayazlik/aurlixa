import {
  Button,
  Heading,
  Text,
} from "@react-email/components";
import { EmailLayout } from "./components/email-layout";

export function ResetPassword({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  return (
    <EmailLayout preview="Aurlixa şifre sıfırlama talebiniz">
      <Text className="m-0 text-[11px] font-medium tracking-[0.28em] text-gold-deep uppercase">
        Şifre Sıfırlama
      </Text>
      <Heading className="mx-0 mt-3 mb-4 font-heading text-[30px] leading-[1.15] font-medium text-espresso">
        Merhaba {name},
      </Heading>
      <Text className="m-0 text-[15px] leading-relaxed text-espresso/70">
        Hesabınız için bir şifre sıfırlama talebi aldık. Aşağıdaki düğmeye
        tıklayarak yeni şifrenizi belirleyebilirsiniz.
      </Text>
      <Button
        href={url}
        className="mt-7 block bg-espresso px-8 py-4 text-center text-[12px] font-medium tracking-[0.24em] text-ivory no-underline"
      >
        ŞİFREMİ SIFIRLA
      </Button>
      <Text className="mt-7 text-[13px] leading-relaxed text-espresso/50">
        Düğme çalışmıyorsa bağlantıyı kopyalayıp tarayıcınıza yapıştırın:
      </Text>
      <Text className="mt-1 text-[12px] break-all text-gold-deep">{url}</Text>
      <Text className="mt-6 text-[12px] leading-relaxed text-espresso/40">
        Bağlantı 1 saat geçerlidir. Bu isteği siz yapmadıysanız şifreniz
        değişmedi; e-postayı yok sayabilirsiniz.
      </Text>
    </EmailLayout>
  );
}

export default Object.assign(ResetPassword, {
  PreviewProps: {
    name: "Ayşe",
    url: "http://localhost:3000/sifre-sifirla?token=ornek-token",
  },
});
