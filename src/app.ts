import express from 'express'
import cors from './config/cors';
import { config as envConfig } from 'dotenv';
import routes from './routes/index';

export default function() {
    const app = express();

    envConfig();

    app.use(express.json());
    
    app.use(express.urlencoded({ extended: true }))
    
    app.use(cors());

    routes(app);

    return app;
}



