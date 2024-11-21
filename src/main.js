const { app, BrowserWindow, ipcMain, desktopCapturer } = require("electron");
const path = require("path");

// Create the browser window
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Allow renderer process to use Node.js
    },
  });

  win.loadFile(path.join(__dirname, "src", "index.html")); // Modify the path if needed

  // Start screen capture when the renderer asks for it
  ipcMain.handle("start-screen-capture", async () => {
    const sources = await desktopCapturer.getSources({ types: ["screen"] });

    for (const source of sources) {
      if (source.name === "Entire Screen") {
        win.webContents.send("screen-data", source.thumbnail.toPNG());
      }
    }
  });
}

// Create and open the window when Electron app is ready
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit the app when all windows are closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
