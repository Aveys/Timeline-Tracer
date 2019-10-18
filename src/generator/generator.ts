import {ipcMain, IpcMainEvent, WebContents} from 'electron';
import log from 'electron-log';
import fs from 'fs'
import json from 'big-json';

export class Generator {
    filePath :string;
    webContents: WebContents;
    constructor(path:string, wc:WebContents){
        this.filePath = path;
        this.webContents = wc;
    }
    sendError(message){
        log.debug(`error channel not implemented : ${message}`);
        this.webContents.send('error-channel', message)
    }
    sendLog(message){
        this.webContents.send('log-message', message);
    }
    launch() {
        this.sendLog(`Opening file located at ${this.filePath}. This may take a while ...`)
        try {
            const stream = fs.createReadStream(this.filePath)
            const parserStream = json.createParseStream();
            parserStream.on('data', data => {
                log.info(`Array retrieved with ${data.locations.length} objects`);
            });
            stream.pipe(parserStream);
            
            
        } catch (err) {
            log.error("What is this file ?");
            log.error(JSON.stringify(err));
            this.sendError("Could not load JSON Structure. Are you sure this is the right file ?");
            return;
        }
        
    }
    filterLocations(data){
        if(!data.locations || data.locations.length === 0 ){
            log.error('Not a valid google location export');
        }
        log.info(`Array retrieved with ${data.locations.length} objects`);
    }
    
}