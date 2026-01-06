import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
const app = express();

import connectDB from './src/config/mongo.config.js';
import urlRoute from './src/routes/short_url.route.js'
import { redirectFromShortUrl } from './src/controller/short_url.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';
import cors from 'cors';

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/create', urlRoute);
app.get('/:id', redirectFromShortUrl);

app.use(errorHandler);

app.listen(3000, () => {
    connectDB();
    console.log('⚙️  Server is running on port: 3000');
});