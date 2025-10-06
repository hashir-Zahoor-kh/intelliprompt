//preload/index.ts
import { contextBridge, ipcRenderer } from 'electron'

// Expose a safe, world-isolated API to the Renderer process
contextBridge.exposeInMainWorld('api', {
  // Function to send data from Renderer to Main
  sendToPty: (data: string) => {
    ipcRenderer.send('pty:data', data)
  },
  // Function to receive data from Main and send it to Renderer
  receiveFromPty: (channel: (data: string) => void) => {
    const subscription = (_event: any, data: string) => channel(data)
    ipcRenderer.on('pty:data', subscription)

    // Return an unsubscribe function to clean up the listener
    return () => {
      ipcRenderer.removeListener('pty:data', subscription)
    }
  },
})