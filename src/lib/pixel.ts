export function track(event: string, params?: Record<string, number | string>): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  try {
    if (params) window.fbq('track', event, params);
    else window.fbq('track', event);
  } catch (err) {
    console.error('pixel: track failed', event, err);
  }
}
