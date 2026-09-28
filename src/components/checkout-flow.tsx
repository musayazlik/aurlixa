"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type InputHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@/components/icon";
import { useCart } from "@/components/cart-provider";
import { useAuth } from "@/components/auth-provider";
import { formatPrice } from "@/lib/format";
import {
  COD_FEE,
  PAYMENT_LABELS,
  generateOrderNo,
  saveOrder,
  type PaymentMethodId,
} from "@/lib/order";

const PROVINCES = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara",
  "Antalya", "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman",
  "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa",
  "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne",
  "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun",
  "Gümüşhane", "Hakkâri", "Hatay", "Iğdır", "Isparta", "İstanbul", "İzmir",
  "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri",
  "Kırıkkale", "Kırklareli", "Kırşehir", "Kilis", "Kocaeli", "Konya", "Kütahya",
  "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde",
  "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas",
  "Şanlıurfa", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak",
  "Van", "Yalova", "Yozgat", "Zonguldak",
];

const PAYMENT_METHODS: {
  id: PaymentMethodId;
  icon: string;
  title: string;
  desc: string;
}[] = [
  {
    id: "card",
    icon: "credit-card-light",
    title: "Kredi / Banka Kartı",
    desc: "3D Secure ile anında onay",
  },
  {
    id: "transfer",
    icon: "bank-light",
    title: "Havale / EFT",
    desc: "Ödemeniz onaylandıktan sonra kargoya verilir",
  },
  {
    id: "cod",
    icon: "package-light",
    title: "Kapıda Ödeme",
    desc: `Kredi kartı veya nakit • ${formatPrice(COD_FEE)} hizmet bedeli`,
  },
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  postal: string;
  note: string;
  cardName: string;
  cardNo: string;
  cardExp: string;
  cardCvv: string;
};

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  district: "",
  address: "",
  postal: "",
  note: "",
  cardName: "",
  cardNo: "",
  cardExp: "",
  cardCvv: "",
};

const digits = (v: string) => v.replace(/\D/g, "");

function formatCardNo(v: string) {
  return digits(v)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(v: string) {
  const d = digits(v).slice(0, 4);
  return d.length <= 2 ? d : `${d.slice(0, 2)}/${d.slice(2)}`;
}

function formatPhone(v: string) {
  const d = digits(v).slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 4) return d;
  if (d.length <= 7) return `${d.slice(0, 4)} ${d.slice(4)}`;
  if (d.length <= 9) return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
  return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9)}`;
}

function validate(form: FormState, method: PaymentMethodId, consent: boolean) {
  const errors: Partial<Record<keyof FormState | "consent", string>> = {};
  if (form.firstName.trim().length < 2) errors.firstName = "Adınızı girin.";
  if (form.lastName.trim().length < 2) errors.lastName = "Soyadınızı girin.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = "Geçerli bir e-posta adresi girin.";
  if (digits(form.phone).length < 10)
    errors.phone = "Geçerli bir telefon numarası girin.";
  if (!form.city) errors.city = "İl seçin.";
  if (form.district.trim().length < 2) errors.district = "İlçe girin.";
  if (form.address.trim().length < 10)
    errors.address = "Açık adresinizi girin (mahalle, sokak, no).";
  if (method === "card") {
    if (form.cardName.trim().length < 3)
      errors.cardName = "Kart üzerindeki ismi girin.";
    if (digits(form.cardNo).length !== 16)
      errors.cardNo = "16 haneli kart numarasını girin.";
    const [mm] = form.cardExp.split("/");
    if (
      digits(form.cardExp).length !== 4 ||
      Number(mm) < 1 ||
      Number(mm) > 12
    )
      errors.cardExp = "Geçerli bir son kullanma tarihi girin (AA/YY).";
    if (digits(form.cardCvv).length < 3) errors.cardCvv = "CVV kodunu girin.";
  }
  if (!consent)
    errors.consent =
      "Devam etmek için ön bilgilendirme formunu ve mesafeli satış sözleşmesini onaylamanız gerekir.";
  return errors;
}

function FieldText({
  label,
  error,
  required,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
        {label}
        {required && (
          <span aria-hidden className="text-gold-deep">
            {" "}
            *
          </span>
        )}
      </FieldLabel>
      <Input
        aria-invalid={error ? true : undefined}
        className="h-11 bg-background px-3.5"
        {...props}
      />
      {error && <FieldError className="text-xs">{error}</FieldError>}
    </Field>
  );
}

export function CheckoutFlow() {
  const router = useRouter();
  const { products, count, subtotal, hydrated, clear } = useCart();
  const { user } = useAuth();

  const [form, setForm] = useState<FormState>(() => {
    // Oturum ilk render'da hazırsa form doğrudan kullanıcı bilgisiyle başlar
    if (!user) return emptyForm;
    const [first = "", ...rest] = user.name.split(" ");
    return {
      ...emptyForm,
      firstName: first,
      lastName: rest.join(" "),
      email: user.email,
    };
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState | "consent", string>>
  >({});
  const [method, setMethod] = useState<PaymentMethodId>("card");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Giriş yapan kullanıcının adını ve e-postasını boş alanlara taşı (render-time uyarlama)
  const [prefilledUser, setPrefilledUser] = useState(user);
  if (user !== prefilledUser) {
    setPrefilledUser(user);
    if (user) {
      const [first = "", ...rest] = user.name.split(" ");
      setForm((f) => ({
        ...f,
        firstName: f.firstName || first,
        lastName: f.lastName || rest.join(" "),
        email: f.email || user.email,
      }));
    }
  }

  const set = (key: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  const fee = method === "cod" ? COD_FEE : 0;
  const total = subtotal + fee;
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (submitting) return;
    const nextErrors = validate(form, method, consent);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector('[aria-invalid="true"]')
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return;
    }

    setSubmitting(true);
    // Ödeme sağlayıcısı simülasyonu — 3D Secure yönlendirmesi taklit edilir
    window.setTimeout(() => {
      saveOrder({
        no: generateOrderNo(),
        date: new Date().toISOString(),
        name: `${form.firstName.trim()} ${form.lastName.trim()}`,
        email: form.email.trim(),
        phone: form.phone,
        address: {
          city: form.city,
          district: form.district.trim(),
          line: form.address.trim(),
          postal: form.postal.trim() || undefined,
        },
        payment: { method, label: PAYMENT_LABELS[method] },
        items: products.map((p) => ({
          slug: p.slug,
          name: p.name,
          qty: p.qty,
          price: p.price,
          image: p.images[0],
        })),
        subtotal,
        shipping: 0,
        fee,
        total,
      });
      clear();
      router.push("/odeme/basarili");
    }, 1600);
  }

  if (!hydrated) {
    return <div className="min-h-[50vh]" aria-hidden />;
  }

  if (products.length === 0) {
    return (
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-5 px-5 py-28 text-center md:px-8 lg:px-12">
        <Icon name="handbag-light" size={48} className="text-gold-deep" />
        <p className="font-heading text-3xl">Ödenecek ürün bulunamadı</p>
        <p className="max-w-[44ch] text-[15px] leading-relaxed text-muted-foreground">
          Ödeme adımına geçebilmek için sepetinizde en az bir ürün bulunmalı.
        </p>
        <Button
          render={<Link href="/#kategoriler" />}
          nativeButton={false}
          className="mt-2 h-12 px-10 text-[11px] tracking-[0.24em] uppercase"
        >
          Koleksiyonu Keşfet
        </Button>
      </div>
    );
  }

  const cardDigits = digits(form.cardNo).padEnd(16, "•");
  const cardGroups = [0, 4, 8, 12].map((i) => cardDigits.slice(i, i + 4));

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto grid max-w-[1440px] gap-14 px-5 py-12 md:px-8 lg:grid-cols-[1fr_420px] lg:gap-20 lg:px-12"
    >
      <div className="min-w-0">
        {/* ——— 01 Teslimat ——— */}
        <section aria-labelledby="teslimat-baslik">
          <p className="eyebrow flex items-center gap-3">
            <span>01</span>
            <span aria-hidden className="h-px w-8 bg-gold/60" />
            <span>Teslimat Bilgileri</span>
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <FieldText
              label="Ad"
              required
              autoComplete="given-name"
              placeholder="Ayşe"
              value={form.firstName}
              error={errors.firstName}
              onChange={(e) => set("firstName")(e.target.value)}
            />
            <FieldText
              label="Soyad"
              required
              autoComplete="family-name"
              placeholder="Yılmaz"
              value={form.lastName}
              error={errors.lastName}
              onChange={(e) => set("lastName")(e.target.value)}
            />
            <FieldText
              label="E-posta"
              required
              type="email"
              autoComplete="email"
              placeholder="ayse@ornek.com"
              value={form.email}
              error={errors.email}
              onChange={(e) => set("email")(e.target.value)}
            />
            <FieldText
              label="Telefon"
              required
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="0555 123 45 66"
              value={form.phone}
              error={errors.phone}
              onChange={(e) => set("phone")(formatPhone(e.target.value))}
            />
            <Field data-invalid={errors.city ? true : undefined}>
              <FieldLabel className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                İl
                <span aria-hidden className="text-gold-deep">
                  {" "}
                  *
                </span>
              </FieldLabel>
              <div className="relative">
                <select
                  aria-invalid={errors.city ? true : undefined}
                  value={form.city}
                  onChange={(e) => set("city")(e.target.value)}
                  className={`h-11 w-full appearance-none border border-input bg-background px-3.5 pr-10 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive ${
                    form.city ? "" : "text-muted-foreground"
                  }`}
                >
                  <option value="" disabled>
                    İl seçin
                  </option>
                  {PROVINCES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <Icon
                  name="caret-down-light"
                  size={16}
                  className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-muted-foreground"
                />
              </div>
              {errors.city && (
                <FieldError className="text-xs">{errors.city}</FieldError>
              )}
            </Field>
            <FieldText
              label="İlçe"
              required
              autoComplete="address-level2"
              placeholder="Nişantaşı"
              value={form.district}
              error={errors.district}
              onChange={(e) => set("district")(e.target.value)}
            />
            <Field
              data-invalid={errors.address ? true : undefined}
              className="sm:col-span-2"
            >
              <FieldLabel className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                Açık Adres
                <span aria-hidden className="text-gold-deep">
                  {" "}
                  *
                </span>
              </FieldLabel>
              <Textarea
                aria-invalid={errors.address ? true : undefined}
                rows={3}
                autoComplete="street-address"
                placeholder="Mahalle, sokak, bina ve daire numarası"
                value={form.address}
                onChange={(e) => set("address")(e.target.value)}
                className="bg-background px-3.5 py-3 min-h-24"
              />
              {errors.address && (
                <FieldError className="text-xs">{errors.address}</FieldError>
              )}
            </Field>
            <FieldText
              label="Posta Kodu"
              autoComplete="postal-code"
              inputMode="numeric"
              placeholder="34365"
              value={form.postal}
              onChange={(e) => set("postal")(digits(e.target.value).slice(0, 5))}
            />
            <FieldText
              label="Sipariş Notu (opsiyonel)"
              placeholder="Kapı notu, hediye paketi isteği…"
              value={form.note}
              onChange={(e) => set("note")(e.target.value)}
            />
          </div>
        </section>

        <Separator className="my-10" />

        {/* ——— 02 Ödeme ——— */}
        <section aria-labelledby="odeme-baslik">
          <p className="eyebrow flex items-center gap-3">
            <span>02</span>
            <span aria-hidden className="h-px w-8 bg-gold/60" />
            <span>Ödeme Yöntemi</span>
          </p>

          <div role="radiogroup" aria-label="Ödeme yöntemi" className="mt-6 grid gap-3">
            {PAYMENT_METHODS.map((m) => (
              <label
                key={m.id}
                className={`flex cursor-pointer items-center gap-4 border px-5 py-4 transition-colors ${
                  method === m.id
                    ? "border-gold-deep bg-muted/50"
                    : "border-input hover:border-gold-deep/50"
                }`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  className="sr-only"
                  value={m.id}
                  checked={method === m.id}
                  onChange={() => setMethod(m.id)}
                />
                <span
                  aria-hidden
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                    method === m.id ? "border-gold-deep" : "border-input"
                  }`}
                >
                  {method === m.id && (
                    <span className="size-2.5 rounded-full bg-gold-deep" />
                  )}
                </span>
                <Icon
                  name={m.icon}
                  size={22}
                  className="hidden text-gold-deep sm:block"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{m.title}</span>
                  <span className="block text-xs text-muted-foreground">
                    {m.desc}
                  </span>
                </span>
              </label>
            ))}
          </div>

          {method === "card" && (
            <div className="mt-8 grid gap-8 sm:grid-cols-[minmax(0,280px)_1fr] sm:items-start">
              {/* Canlı kart önizlemesi */}
              <div
                aria-hidden
                className="relative aspect-[8/5] w-full max-w-[280px] overflow-hidden bg-espresso p-5 text-ivory shadow-xl"
              >
                <div className="absolute -top-10 -right-10 size-36 rounded-full bg-gold/15 blur-2xl" />
                <div className="flex items-start justify-between">
                  <span
                    className="font-heading text-lg leading-none font-medium tracking-[0.28em]"
                    style={{ marginRight: "-0.28em" }}
                  >
                    AURLIXA
                  </span>
                  <div className="h-6 w-8 rounded-[3px] bg-gradient-to-br from-gold-soft to-gold-deep" />
                </div>
                <p className="mt-6 font-sans text-[15px] tracking-[0.12em] tabular-nums">
                  {cardGroups.join("  ")}
                </p>
                <div className="mt-5 flex items-end justify-between gap-4 text-[10px] tracking-[0.18em] uppercase">
                  <span className="truncate text-ivory/80">
                    {form.cardName || "Ad Soyad"}
                  </span>
                  <span className="tabular-nums text-ivory/80">
                    {form.cardExp || "AA/YY"}
                  </span>
                </div>
              </div>

              <div className="grid gap-5">
                <FieldText
                  label="Kart Üzerindeki İsim"
                  required
                  autoComplete="cc-name"
                  placeholder="AYŞE YILMAZ"
                  value={form.cardName}
                  error={errors.cardName}
                  onChange={(e) =>
                    set("cardName")(e.target.value.toLocaleUpperCase("tr-TR"))
                  }
                />
                <FieldText
                  label="Kart Numarası"
                  required
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="0000 0000 0000 0000"
                  value={form.cardNo}
                  error={errors.cardNo}
                  onChange={(e) => set("cardNo")(formatCardNo(e.target.value))}
                />
                <div className="grid grid-cols-2 gap-5">
                  <FieldText
                    label="Son Kul. Tarihi"
                    required
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="AA/YY"
                    value={form.cardExp}
                    error={errors.cardExp}
                    onChange={(e) =>
                      set("cardExp")(formatExpiry(e.target.value))
                    }
                  />
                  <FieldText
                    label="CVV"
                    required
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder="123"
                    value={form.cardCvv}
                    error={errors.cardCvv}
                    onChange={(e) =>
                      set("cardCvv")(digits(e.target.value).slice(0, 4))
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {method === "transfer" && (
            <div className="mt-8 border border-border bg-card p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Ödemenizi aşağıdaki hesaba gönderdikten sonra siparişiniz
                onaylanır ve kargoya verilir. Açıklama kısmına sipariş numaranızı
                yazmanız yeterlidir.
              </p>
              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <div className="border border-border p-4">
                  <dt className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                    Ziraat Bankası
                  </dt>
                  <dd className="mt-1.5 font-medium tabular-nums">
                    TR12 0001 0012 3456 7890 1234 56
                  </dd>
                  <dd className="mt-0.5 text-xs text-muted-foreground">
                    Aurlixa Kuyumculuk A.Ş. — IBAN
                  </dd>
                </div>
                <div className="border border-border p-4">
                  <dt className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                    Garanti BBVA
                  </dt>
                  <dd className="mt-1.5 font-medium tabular-nums">
                    TR98 0006 2000 1234 0006 6543 21
                  </dd>
                  <dd className="mt-0.5 text-xs text-muted-foreground">
                    Aurlixa Kuyumculuk A.Ş. — IBAN
                  </dd>
                </div>
              </dl>
            </div>
          )}

          {method === "cod" && (
            <div className="mt-8 flex gap-4 border border-border bg-card p-6">
              <Icon
                name="info-light"
                size={20}
                className="mt-0.5 shrink-0 text-gold-deep"
              />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Siparişiniz kuryeye teslim edildiğinde{" "}
                <span className="font-medium text-foreground">
                  {formatPrice(COD_FEE)} hizmet bedeli
                </span>{" "}
                eklenir. Ödemeyi kredi kartı veya nakit olarak
                gerçekleştirebilirsiniz. 10.000 TL üzeri kapıda ödemelerde yalnızca
                kart kabul edilir.
              </p>
            </div>
          )}
        </section>

        <Separator className="my-10" />

        {/* ——— 03 Onay ——— */}
        <section aria-labelledby="onay-baslik">
          <p className="eyebrow flex items-center gap-3">
            <span>03</span>
            <span aria-hidden className="h-px w-8 bg-gold/60" />
            <span>Onay</span>
          </p>

          <div className="mt-6 grid gap-4">
            <div className={`flex gap-3 ${errors.consent ? "text-destructive" : ""}`}>
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                aria-invalid={errors.consent ? true : undefined}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  setErrors((er) => {
                    if (!er.consent) return er;
                    const next = { ...er };
                    delete next.consent;
                    return next;
                  });
                }}
                className="mt-0.5 size-4 shrink-0 accent-espresso"
              />
              <label htmlFor="consent" className="text-sm leading-relaxed">
                <Link
                  href="/mesafeli-satis"
                  className="underline decoration-gold/60 underline-offset-4 hover:text-gold-deep"
                >
                  Ön bilgilendirme formunu
                </Link>{" "}
                ve{" "}
                <Link
                  href="/mesafeli-satis"
                  className="underline decoration-gold/60 underline-offset-4 hover:text-gold-deep"
                >
                  mesafeli satış sözleşmesini
                </Link>{" "}
                okudum;{" "}
                <Link
                  href="/kvkk"
                  className="underline decoration-gold/60 underline-offset-4 hover:text-gold-deep"
                >
                  KVKK aydınlatma metninde
                </Link>{" "}
                belirtilen şekilde kişisel verilerimin işlenmesini kabul
                ediyorum. <span aria-hidden className="text-gold-deep">*</span>
              </label>
            </div>
            {errors.consent && (
              <p role="alert" className="text-xs text-destructive">
                {errors.consent}
              </p>
            )}

            <div className="flex gap-3">
              <input
                type="checkbox"
                id="newsletter"
                defaultChecked
                className="mt-0.5 size-4 shrink-0 accent-espresso"
              />
              <label htmlFor="newsletter" className="text-sm leading-relaxed">
                Yeni koleksiyon ve özel indirimlerden e-posta ile haberdar olmak
                istiyorum.
              </label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="mt-8 h-14 w-full bg-espresso text-[12px] font-medium tracking-[0.28em] uppercase text-ivory hover:bg-gold-deep sm:w-auto sm:px-16"
          >
            {submitting
              ? "Ödemeniz işleniyor…"
              : `${formatPrice(total)} — Siparişi Onayla`}
          </Button>

          <p className="mt-4 flex items-center gap-2 text-[12px] text-muted-foreground">
            <Icon
              name="lock-simple-light"
              size={14}
              className="text-gold-deep"
            />
            Kart bilgileri 3D Secure sayfasında bankanız tarafından doğrulanır;
            sistemimizde saklanmaz.
          </p>
        </section>
      </div>

      {/* ——— Sipariş özeti ——— */}
      <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Sipariş özeti">
        <div className="border border-border bg-card p-8">
          <p className="eyebrow">Sipariş Özeti</p>
          <p className="mt-1 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            {count} parça ürün
          </p>

          <ul className="mt-6 divide-y divide-border">
            {products.map((p) => (
              <li key={p.slug} className="flex items-center gap-4 py-4">
                <Link
                  href={`/urun/${p.slug}`}
                  className="relative aspect-[3/4] w-14 shrink-0 overflow-hidden bg-secondary"
                  aria-label={p.name}
                >
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                  <span className="absolute right-0 bottom-0 bg-espresso px-1.5 py-0.5 text-[10px] font-medium text-ivory">
                    ×{p.qty}
                  </span>
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-heading text-lg leading-snug font-medium">
                    {p.name}
                  </p>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                    {p.karat} Ayar
                  </p>
                </div>
                <span className="text-sm font-medium tabular-nums">
                  {formatPrice(p.price * p.qty)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-3 border-t border-border pt-5 text-sm">
            <div className="flex items-baseline justify-between">
              <dt className="text-muted-foreground">Ara Toplam</dt>
              <dd className="font-medium">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="text-muted-foreground">Kargo</dt>
              <dd className="font-medium tracking-wide text-gold-deep">
                Ücretsiz
              </dd>
            </div>
            {fee > 0 && (
              <div className="flex items-baseline justify-between">
                <dt className="text-muted-foreground">Kapıda Ödeme Bedeli</dt>
                <dd className="font-medium">{formatPrice(fee)}</dd>
              </div>
            )}
          </dl>

          <div className="mt-5 flex items-baseline justify-between border-t border-border pt-5">
            <span className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
              Toplam
            </span>
            <span className="font-heading text-3xl font-medium">
              {formatPrice(total)}
            </span>
          </div>
          <p className="mt-1 text-right text-xs text-muted-foreground">
            KDV dahildir.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {["Visa", "Mastercard", "Troy", "3D Secure"].map((m) => (
            <span
              key={m}
              className="border border-border px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase text-muted-foreground"
            >
              {m}
            </span>
          ))}
        </div>
      </aside>
    </form>
  );
}
