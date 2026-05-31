export function gaEvent(event: string, params?: Record<string, number | string>): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    if (params) window.gtag('event', event, params);
    else window.gtag('event', event);
  } catch (err) {
    console.error('ga: event failed', event, err);
  }
}
