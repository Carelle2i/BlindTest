const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('questionAPI', {
    fetchData: (question) => {
        ipcRenderer.send('fetch-data', question)
    },
})