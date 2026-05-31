/// <reference types="vite/client" />

declare global {
  interface Window {
    fbq?: (
      action: 'init' | 'track' | 'trackCustom' | 'consent',
      eventOrId: string,
      params?: Record<string, unknown>
    ) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export {};
