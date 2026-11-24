import express, {
 
    NextFunction,
    Request,
    Response,
} from 'express';
import { twitRouter } from './source/twit/twit_controller.ts';
import dotenv from 'dotenv';
import { prisma } from './source/twit/twit_service.ts';
import logger from './utils/log.ts';


dotenv.config();



const app = express();
const PORT = process.env.PORT || 3000;

async function main() {
    await prisma.$connect();

    app.use(express.json());

    app.use('/api/twit', twitRouter);

    app.get('/error', (req, res) => {
        throw new Error('This is a test error');
    });

    app.use((req, res) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

   app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error('Unhandled application error', {
        message: err.message,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
    });

    res.status(500).json({
        message: 'Something went wrong',
    });
});

    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
        
    });
}

main().catch((err) => {
    logger.error('Failed to start server', {
        error: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined,
    });

    process.exit(1);
});