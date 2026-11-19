import express, { NextFunction, Request, Response } from 'express';
import { twitRouter } from './source/twit/twit_controller.ts';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

async function main() {
    app.use(express.json());

    app.use('/api/twit', twitRouter);

    // Test error
    app.get('/error', (req, res) => {
        throw new Error('This is a test error');
    });

    // 404 handler
    app.use((req, res) => {
        res.status(404).json({
            message: 'Not found'
        });
    });

    // Error handler
    app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
        console.error(err);

        res.status(500).send('Something went wrong');
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

main();