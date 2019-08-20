import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as controllers from "./src/controllers";

import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

class SimpleServer extends Server {
    
    private readonly SERVER_START_MSG = 'Demo server started on port: ';
    private readonly DEV_MSG = 'Express Server is running in development mode. ' +'\n' +
        'No front-end content is being served.';

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        super.addControllers(new controllers.SimpleController());
        // Point to front-end code
        this.setupControllers();
        // Point to front-end code
        if (process.env.NODE_ENV !== 'production') {
            this.app.get('*', (req, res) => res.send(this.DEV_MSG));
        } else {
            this.serveFrontEndProd();
        }
        /*
        if (process.env.NODE_ENV !== 'production') {
            console.log('Starting server in development mode');
            const msg = this.DEV_MSG + process.env.EXPRESS_PORT;
            this.app.get('*', (req, res) => res.send(msg));
        }
        */
    }

    private serveFrontEndProd(): void {
        const dir = path.join(__dirname, 'public/react/demo-react/');
        // Set the static and views directory
        this.app.set('views',  dir);
        this.app.use(express.static(dir));
        // Serve front-end content
        this.app.get('*', (req, res) => {
            res.sendFile('index.html', {root: dir});
        });
    }

    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                let Controller = (controllers as any)[name];
                ctlrInstances.push(new Controller());
            }
        }
        super.addControllers(ctlrInstances);
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_START_MSG + port);
        });
    }
}

export default SimpleServer;