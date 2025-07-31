declare module "event-source-polyfill" {
  export class EventSourcePolyfill {
    constructor(url: string, eventSourceInitDict?: any);
    addEventListener(type: string, listener: (event: any) => void): void;
    removeEventListener(type: string, listener: (event: any) => void): void;
    close(): void;
    readyState: number;
  }
}
