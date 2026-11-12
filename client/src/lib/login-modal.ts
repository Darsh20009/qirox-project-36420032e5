export const LOGIN_MODAL_EVENT = "mueen:open-login";

export function openLoginModal(returnTo?: string) {
  if (typeof window === "undefined") return;
  const currentPath = `${window.location.pathname}${window.location.search}`;
  const requestedPath = returnTo || currentPath || "/";
  const safePath = requestedPath.startsWith("/") && !requestedPath.startsWith("//")
    ? requestedPath
    : "/";

  window.setTimeout(() => {
    window.dispatchEvent(
      new CustomEvent(LOGIN_MODAL_EVENT, { detail: { returnTo: safePath } }),
    );
  }, 0);
}
