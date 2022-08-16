const path = require("path");
const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const url = require("url");

// Conditionally include the dev tools installer to load React Dev Tools
let installExtension, REACT_DEVELOPER_TOOLS;

if (isDev) {
  const devTools = require("electron-devtools-installer");
  installExtension = devTools.default;
  REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  if (!isDev) {
    require(path.join(__dirname, "server/server.js"));
  }

  // create browser window
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 430,
    minHeight: 550,
    center: true,
    icon: "banger-copy.png",
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
      // enableRemoteModule: true,
      // preload: path.join(__dirname, "preload.js") // add "preload"
    },
  });

  // load the index.html file
  window.loadURL(
    isDev
      ? "http://localhost:3000"
      : url.format({
          pathname: path.join(__dirname, "build/index.html"),
          protocol: "file:",
          slashes: true,
        })
    // : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // open devtools
  if (isDev) {
    window.loadURL("http://localhost:3000");
    window.webContents.once("dom-ready", () => {
      window.webContents.openDevTools({ mode: "detach" });
    });
  }
};

// when electron has finished initialization and ready to create browser window
app.whenReady().then(() => {
  createWindow();

  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((error) => console.log(`An error occurred: , ${error}`));
  }
});

// quit when all windows are closed (windows and linux)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// open a window if none are open (mac OS)
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
