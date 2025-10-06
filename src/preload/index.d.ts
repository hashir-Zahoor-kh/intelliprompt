// renderer/src/preload.d.ts
export interface IElectronAPI {
  sendToPty: (data: string) => void
  receiveFromPty: (channel: (data: string) => void) => () => void
}

declare global {
  interface Window {
    api: IElectronAPI
  }
}