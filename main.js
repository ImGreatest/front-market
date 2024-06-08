const { app, BrowserWindow } = require("electron");

let browserWindow;

function createBrowserWindow() {
  browserWindow = new BrowserWindow({ width: 1920, height: 1080 });

  browserWindow.loadURL('http://localhost:4200/');

  browserWindow.on("closed", () => {
    browserWindow = null;
  });
}

app.on("ready", createBrowserWindow);

app.on("activate", () => {
  if (browserWindow === null) {
    createBrowserWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
