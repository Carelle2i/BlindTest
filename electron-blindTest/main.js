const { BrowserWindow, Menu, app, ipcMain } = require('electron');
const path = require('node:path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile('index.html')
    // mainWindow.webContents.openDevTools()
}





const template = [
    {
        label: 'Editer',
        submenu: [
            { role: 'undo' },
            { role: 'redo' }
        ]
    },
    

]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)




app.whenReady().then(() => {
    createWindow();
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        app.quit()
})

