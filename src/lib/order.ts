import { useSyncExternalStore } from "react";

export type PaymentMethodId = "card" | "transfer" | "cod";
export type OrderItem = {
  slug: string;
  name: string;
  qty: number;
  price: number;
  image: string;
};

export type Order = {
  no: string;
  /** ISO tarih */
  date: string;
  name: string;
  email: string;
  phone: string;
  address: { city: string; district: string; line: string; postal?: string };
  payment: { method: PaymentMethodId; label: string };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  fee: number;
  total: number;
};

export const PAYMENT_LABELS: Record<PaymentMethodId, string> = {
  card: "Kredi / Banka Kartı",
  transfer: "Havale / EFT",
  cod: "Kapıda Ödeme",
};

/** Kapıda ödeme hizmet bedeli */
export const COD_FEE = 49;

const ORDER_KEY = "aurlixa-last-order";

export function saveOrder(order: Order) {
  window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
}

export function loadOrder(): Order | null {
  try {
    const raw = window.localStorage.getItem(ORDER_KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}

export function generateOrderNo() {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `AUR-${rand}`;
}

/** Siparişten ~3 iş günü sonrasını "28 Eylül Pazartesi" biçiminde döndürür. */
export function formatDeliveryEstimate(from = new Date()) {
  const eta = new Date(from);
  eta.setDate(eta.getDate() + 3);
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    weekday: "long",
  }).format(eta);
}

/* Son siparişi harici depolama (localStorage) olarak okuyan abonelik.
   undefined yalnızca hidrasyon sırasında döner; null = sipariş yok. */

const orderListeners = new Set<() => void>();
let orderCache: Order | null | undefined;

function getOrderSnapshot(): Order | null | undefined {
  if (orderCache === undefined) orderCache = loadOrder();
  return orderCache;
}

function getOrderServerSnapshot(): Order | null | undefined {
  return undefined;
}

function subscribeOrder(cb: () => void) {
  const onStorage = () => {
    orderCache = undefined;
    cb();
  };
  orderListeners.add(cb);
  window.addEventListener("storage", onStorage);
  return () => {
    orderListeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

/** Son siparişi cihaz depolamasından okur; undefined = hidrasyon sürüyor. */
export function useLastOrder(): Order | null | undefined {
  return useSyncExternalStore(
    subscribeOrder,
    getOrderSnapshot,
    getOrderServerSnapshot
  );
}
