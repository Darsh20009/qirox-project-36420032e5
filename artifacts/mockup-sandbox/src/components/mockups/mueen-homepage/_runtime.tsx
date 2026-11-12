import type { AnchorHTMLAttributes, ReactNode } from "react";

const DATA: Record<string, unknown> = {
  "/api/slider": undefined,
  "/api/announcements/active": undefined,
  "/api/news": [],
  "/api/jobs": [],
  "/api/campaigns": [],
  "/api/donations/umrah-stats": { currentProgressPercent: 68, currentProgress: 2040, confirmedAmount: 2040, pendingAmount: 0, completedPilgrims: 8, totalPilgrims: 11, umrahCost: 3000 },
  "/api/donations/top-donors": { donors: [] },
  "/api/content/about": { content: "جمعية معين للحج والعمرة جمعية أهلية مقرها مكة المكرمة، وتعمل على تطوير خدمات التوعية والإرشاد والمساندة لضيوف الرحمن." },
  "/api/content/founders": { content: "" },
  "/api/settings": { enableBankTransfer: true, enableRajhiPayment: false },
};

export function useQuery<T = any>({ queryKey }: { queryKey: unknown[]; [key: string]: unknown }): { data: T | undefined } {
  const key = String(queryKey[0] ?? "");
  return { data: DATA[key] as T | undefined };
}

export function useQueryClient() {
  return { setQueryData: (..._args: unknown[]) => undefined, invalidateQueries: (..._args: unknown[]) => undefined };
}

export function useAuth(): { user: any; isLoading: boolean; logout: () => Promise<void>; login: () => Promise<void>; register: () => Promise<void>; togglePrivacy: () => Promise<void>; isPending: boolean } {
  return { user: null, isLoading: false, logout: async () => undefined, login: async () => undefined, register: async () => undefined, togglePrivacy: async () => undefined, isPending: false };
}

export function useNotifications() { return { unread: 0 }; }
export function useLeaderboard() { return { data: [] as { name: string; totalDonations: number }[] }; }
export function useSEO(_options?: unknown) { return undefined; }
export function useDonations() { return { donate: async () => undefined, isDonating: false }; }
export function useIsAppleDevice() { return false; }
export const OFFICIAL_DONATION_URL = "https://www.mueenalhajjandmutamers.org.sa/";

export function useSearch() { return ""; }
export function useLocation(): [string, (path: string) => void] { return ["/", () => undefined]; }

export async function previewFetch(input: RequestInfo | URL, _init?: RequestInit): Promise<Response> {
  const path = String(input);
  const key = path.split("?")[0];
  const data = Object.prototype.hasOwnProperty.call(DATA, key)
    ? DATA[key]
    : key.includes("/bank-transfers/")
      ? { id: "preview-transfer", message: "تم استلام الطلب" }
      : { id: "preview", mobile: "" };
  return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });
}

export function Link({ href = "#", onClick, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string; children?: ReactNode }) {
  return <a href={href} {...props} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) event.preventDefault(); }}>{children}</a>;
}
