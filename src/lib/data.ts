export type CategoryId =
  | "kolye"
  | "bileklik"
  | "kupe"
  | "yuzuk"
  | "set";

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  karat: 14 | 22;
  gram: number;
  price: number;
  images: [string, string];
  description: string;
  specs: [string, string][];
  isNew?: boolean;
  bestseller?: boolean;
  featured?: boolean;
  inStock?: boolean;
};

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  kolye: "Kolye",
  bileklik: "Bileklik",
  kupe: "Küpe",
  yuzuk: "Yüzük",
  set: "Set",
};

const IMG = "/images";

export const products: Product[] = [
  {
    slug: "zarif-damla-kolye",
    name: "Zarif Damla Kolye",
    category: "kolye",
    karat: 14,
    gram: 4.25,
    price: 24950,
    images: [`${IMG}/neck-pendant-diamond.webp`, `${IMG}/neck-layered-model.webp`],
    description:
      "Gündüz ve gece kombinlerini tamamlayan Zarif Damla Kolye, brilyant kesim taşının ışıltısını sade bir zincirle buluşturur. El işçiliğiyle hazırlanan pabuç detayı sayesinde taş her açıdan aynı parlaklığı korur. Her gün kullanıma uygun, hafif ve zamansız bir tasarımdır.",
    specs: [
      ["Ayar", "14 Ayar (‰585)"],
      ["Ağırlık", "4,25 gr"],
      ["Zincir Uzunluğu", "45 cm (ayarlanabilir)"],
      ["Taş", "Brilyant kesim zirkon"],
      ["Üretim", "El işçiliği"],
    ],
    bestseller: true,
    featured: true,
    inStock: true,
  },
  {
    slug: "hilal-madalyon-kolye",
    name: "Hilal Madalyon Kolye",
    category: "kolye",
    karat: 14,
    gram: 3.6,
    price: 21750,
    images: [`${IMG}/neck-moon.webp`, `${IMG}/neck-chain-stone.webp`],
    description:
      "Yeni sezonun en dikkat çeken parçası Hilal Madalyon Kolye; katmanlı zincirleriyle modern bir duruş sergiler. Hilal formundaki madalyon, minik kabartma işçiliğiyle atölyede tek tek elle işlenir. İnce zincirleri sayesinde tek başına da, katmanlı da kullanılabilir.",
    specs: [
      ["Ayar", "14 Ayar (‰585)"],
      ["Ağırlık", "3,60 gr"],
      ["Zincir Uzunluğu", "40 + 45 cm (çift zincir)"],
      ["Madalyon Çapı", "18 mm"],
      ["Üretim", "El işçiliği"],
    ],
    isNew: true,
    featured: true,
    inStock: true,
  },
  {
    slug: "baget-tasli-yuzuk",
    name: "Baget Taşlı Yüzük",
    category: "yuzuk",
    karat: 14,
    gram: 3.1,
    price: 19750,
    images: [`${IMG}/ring-diamond-black.webp`, `${IMG}/ring-pave-silver.webp`],
    description:
      "Halo tekniğiyle çevrilen merkez taş, baget kesim yan taşlarıyla birlikte parmakta geniş bir ışıltı halkası oluşturur. İnce bandı sayesinde diğer yüzüklerle kombinenabilir. Nişan ve özel günler için ideal, zamansız bir seçim.",
    specs: [
      ["Ayar", "14 Ayar (‰585)"],
      ["Ağırlık", "3,10 gr"],
      ["Merkez Taş", "1,00 ct brilyant kesim"],
      ["Yan Taş", "Baget kesim zirkon"],
      ["Üretim", "El işçiliği"],
    ],
    featured: true,
    inStock: true,
  },
  {
    slug: "orgu-desen-bileklik",
    name: "Örgü Desen Bileklik",
    category: "bileklik",
    karat: 22,
    gram: 12.4,
    price: 58900,
    images: [`${IMG}/bracelet-chain-pink.webp`, `${IMG}/bracelet-magazine.webp`],
    description:
      "Anadolu örgü geleneğinden ilham alan bu bileklik, 22 ayar altının sıcak rengini örgü dokunun derinliğiyle birleştirir. Her halkası ayrı ayrı elde örüldüğü için bilekte yumuşak bir hareket kabiliyeti sunar. Günlük kullanımda formunu koruyan sağlam bir yapıdadır.",
    specs: [
      ["Ayar", "22 Ayar (‰916)"],
      ["Ağırlık", "12,40 gr"],
      ["Uzunluk", "19 cm"],
      ["Kilit", "Emniyetli kilit"],
      ["Üretim", "El işçiliği"],
    ],
    bestseller: true,
    featured: true,
    inStock: true,
  },
  {
    slug: "simetrik-halhal-kupe",
    name: "Simetrik Halhal Küpe",
    category: "kupe",
    karat: 14,
    gram: 3.8,
    price: 21400,
    images: [`${IMG}/earring-drop-dark.webp`, `${IMG}/neck-chain-stone.webp`],
    description:
      "Uzun sallantılı halhal formu, her hareketinde ışıltıyı kulağa taşır. Simetrik dizilimiyle hem abiye hem günlük kombinlerde dengeli bir zarafet sağlar. Hafif yapısı sayesinde tüm gün konforlu kullanım sunar.",
    specs: [
      ["Ayar", "14 Ayar (‰585)"],
      ["Ağırlık", "3,80 gr (çift)"],
      ["Boy", "62 mm"],
      ["Kapama", "Pimli kilit"],
      ["Üretim", "El işçiliği"],
    ],
    bestseller: true,
    featured: true,
    inStock: true,
  },
  {
    slug: "safir-tasli-kupe",
    name: "Safir Taşlı Küpe",
    category: "kupe",
    karat: 14,
    gram: 5.2,
    price: 26800,
    images: [`${IMG}/earring-gem-leaf.webp`, `${IMG}/set-gold-black.webp`],
    description:
      "Gece mavisi safir cam taşlar, altın çerçeve içinde vintage bir derinlik kazanır. İddialı karakterdeki bu küpe, sade kombinlerin en dikkat çeken detayı olur. El işçiliğiyle oturtulan taşlar ışığı çok yönlü yansıtır.",
    specs: [
      ["Ayar", "14 Ayar (‰585)"],
      ["Ağırlık", "5,20 gr (çift)"],
      ["Taş", "Safir cam taş"],
      ["Kapama", "Pimli kilit"],
      ["Üretim", "El işçiliği"],
    ],
    isNew: true,
    inStock: true,
  },
  {
    slug: "tektas-pirlanta-yuzuk",
    name: "Tektaş Pırlanta Yüzük",
    category: "yuzuk",
    karat: 22,
    gram: 6.4,
    price: 32900,
    images: [`${IMG}/ring-trio-white.webp`, `${IMG}/ring-gold-warm.webp`],
    description:
      "Klasik tektaş formunu 22 ayar altının doygun rengiyle yorumlar. Merkezdeki taş, dört tırmıklı kaşe üzerinde maksimum ışık alacak şekilde konumlandırılmıştır. Ömür boyu kullanıma uygun, kusursuz bir cila kalitesine sahiptir.",
    specs: [
      ["Ayar", "22 Ayar (‰916)"],
      ["Ağırlık", "6,40 gr"],
      ["Merkez Taş", "0,75 ct brilyant kesim"],
      ["Kaşe", "Dört tırmıklı"],
      ["Üretim", "El işçiliği"],
    ],
    featured: true,
    inStock: true,
  },
  {
    slug: "antika-desen-yuzuk",
    name: "Antika Desen Yüzük",
    category: "yuzuk",
    karat: 22,
    gram: 7.8,
    price: 38500,
    images: [`${IMG}/ring-gold-warm.webp`, `${IMG}/ring-gold-bw.webp`],
    description:
      "Osmanlı kuyumculuğunun filigran tekniğinden ilham alan Antika Desen Yüzük, sıcak sarı rengiyle öne çıkar. Yüzeyindeki kabartma desenler usta ellerde tek tek kazınır ve her parçaya benzersiz bir karakter katar. Geniş bandı parmakta dengeli ve konforlu bir duruş sergiler.",
    specs: [
      ["Ayar", "22 Ayar (‰916)"],
      ["Ağırlık", "7,80 gr"],
      ["Genişlik", "9 mm"],
      ["Teknik", "Filigran / kabartma"],
      ["Üretim", "El işçiliği"],
    ],
    bestseller: true,
    inStock: true,
  },
  {
    slug: "inci-damla-set",
    name: "İnci Damla Set",
    category: "set",
    karat: 14,
    gram: 9.75,
    price: 46500,
    images: [`${IMG}/set-pearl-box.webp`, `${IMG}/neck-chain-stone.webp`],
    description:
      "Deniz incisinin yumuşak ışıltısını altın damla formlarıyla buluşturan üçlü set; kolye, küpe ve yüzükten oluşur. Nişan, söz ve düğün gibi özel günlerde tek kutuda tam bir hediye alternatifi sunar. Parçalar tek tek de kullanılabilecek kadar sadedir.",
    specs: [
      ["Ayar", "14 Ayar (‰585)"],
      ["Ağırlık", "9,75 gr (toplam)"],
      ["Set İçeriği", "Kolye, küpe, yüzük"],
      ["Taş", "Deniz incisi"],
      ["Üretim", "El işçiliği"],
    ],
    featured: true,
    inStock: true,
  },
  {
    slug: "hilal-kolye-kupe-seti",
    name: "Hilal Kolye & Küpe Seti",
    category: "set",
    karat: 22,
    gram: 18.3,
    price: 84900,
    images: [`${IMG}/set-gold-black.webp`, `${IMG}/set-pearl-box.webp`],
    description:
      "Geleneksel işçiliğin en yoğun yorumu; kolye ve küpeden oluşan bu set, düğün ve kına gibi özel günlerin vazgeçilmezi. Zengin kabartma dokusu ışığı her yönden toplar. Özel kutusunda, sertifika ile birlikte gönderilir.",
    specs: [
      ["Ayar", "22 Ayar (‰916)"],
      ["Ağırlık", "18,30 gr (toplam)"],
      ["Set İçeriği", "Kolye, küpe"],
      ["Kolye Boyu", "42 cm"],
      ["Üretim", "El işçiliği"],
    ],
    bestseller: true,
    inStock: true,
  },
  {
    slug: "kalin-zincir-bileklik",
    name: "Kalın Zincir Bileklik",
    category: "bileklik",
    karat: 22,
    gram: 15.8,
    price: 72400,
    images: [`${IMG}/bracelet-magazine.webp`, `${IMG}/bracelet-chain-pink.webp`],
    description:
      "Küba zincir tekniğiyle örülen bu güçlü parça, bilekte tek başına bir ifade olur. Yoğun metal hacmi ışığı blok blok yansıtarak modern bir atmosfer yaratır. Sağlam kilit mekanizmasıyla yıllarca formunu korur.",
    specs: [
      ["Ayar", "22 Ayar (‰916)"],
      ["Ağırlık", "15,80 gr"],
      ["Uzunluk", "20 cm"],
      ["Genişlik", "7 mm"],
      ["Üretim", "El işçiliği"],
    ],
    isNew: true,
    bestseller: true,
    inStock: true,
  },
  {
    slug: "katmanli-zincir-kolye",
    name: "Katmanlı Zincir Kolye",
    category: "kolye",
    karat: 14,
    gram: 6.9,
    price: 28900,
    images: [`${IMG}/neck-layered-model.webp`, `${IMG}/neck-moon.webp`],
    description:
      "Üç farklı incelikte zincir, tek bir kapamada birleşerek hazır katmanlı görünüm sunar. Altın toplar ve ince hilal detayı arasında kurulan ritim, dekolden yumuşak bir akışla iner. Sabah koşuşturmasında bile tamamlanmış bir stil sağlar.",
    specs: [
      ["Ayar", "14 Ayar (‰585)"],
      ["Ağırlık", "6,90 gr"],
      ["Katman", "3 zincir (40 / 45 / 50 cm)"],
      ["Detay", "Altın top + hilal"],
      ["Üretim", "El işçiliği"],
    ],
    isNew: true,
    featured: true,
    inStock: true,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelated(product: Product, count = 4) {
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  );
  const others = products.filter(
    (p) => p.category !== product.category && p.slug !== product.slug
  );
  return [...sameCategory, ...others].slice(0, count);
}

export const featuredProducts = products.filter((p) => p.featured);
export const bestsellerProducts = products.filter((p) => p.bestseller);

export type CategoryCard = {
  id: CategoryId | "yeni";
  label: string;
  image: string;
  note: string;
};

export const categoryCards: CategoryCard[] = [
  {
    id: "kolye",
    label: "Kolye",
    image: `${IMG}/neck-moon.webp`,
    note: "Madalyon & damla",
  },
  {
    id: "bileklik",
    label: "Bileklik",
    image: `${IMG}/bracelet-hands.webp`,
    note: "Zincir & örgü",
  },
  {
    id: "yuzuk",
    label: "Yüzük",
    image: `${IMG}/ring-trio-white.webp`,
    note: "Tektaş & desen",
  },
  {
    id: "kupe",
    label: "Küpe",
    image: `${IMG}/earring-gem-leaf.webp`,
    note: "Halhal & taşlı",
  },
  {
    id: "set",
    label: "Set",
    image: `${IMG}/set-gold-black.webp`,
    note: "Tamamlanmış zarafet",
  },
];

export const instagramImages = [
  `${IMG}/neck-layered-model.webp`,
  `${IMG}/flatlay-silver.webp`,
  `${IMG}/ring-pink-stone.webp`,
  `${IMG}/earring-drop-dark.webp`,
  `${IMG}/neck-chain-stone.webp`,
  `${IMG}/bracelet-magazine.webp`,
];

export const navLinks = [
  { label: "Kolye", href: "/#kategoriler" },
  { label: "Bileklik", href: "/#kategoriler" },
  { label: "Küpe", href: "/#kategoriler" },
  { label: "Yüzük", href: "/#kategoriler" },
  { label: "Set", href: "/#kategoriler" },
  { label: "Yeni Gelenler", href: "/#one-cikanlar" },
];
