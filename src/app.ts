import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import * as Http from 'http';
import * as BodyParser from 'body-parser';
import Cors from 'cors';
import morgan from 'morgan';
import path from "path";
import * as http from "http";
import { routes } from './routes';
import { BotModule } from "./bot";

class ServerModule {

    public host;
    public port;
    public http: http.Server | undefined;
    public app: any;

    constructor() {
        this.host = process.env.HOST;
        this.port = process.env.PORT;
        this.start();
    }

    private start() {
        this.app = express();
        this.app.use(BodyParser.json({limit: '50mb'}));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(Cors());
        this.app.use(morgan('combined'));
        this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
        this.app.use('/files', express.static('uploads'));
        this.app.use((req: any, res: any, next: any) => {
            res.setHeader('Access-Control-Expose-Headers', 'original-name, Content-Disposition');
            next();
        });
        this.app.get('/api', (req: any, res: any) => {
            res.status(200).json({
                message: 'Server is running!'
            });
        });
        BotModule.start();
        routes(this.app);
        this.http = Http.createServer(this.app);

        this.http.listen(
            this.port,
            () => console.log(`Server running on http://${this.host}:${this.port}`)
        )
    }
}

new ServerModule();