const { contextBridge, ipcRenderer } = require("electron");

// Expose the `get-screen` IPC to the renderer process
contextBridge.exposeInMainWorld("electron", {
  getScreen: () => ipcRenderer.invoke("get-screen"),
});
