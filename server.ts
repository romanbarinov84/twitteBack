import express, {
 
    NextFunction,
    Request,
    Response,
} from 'express';
import { twitRouter } from './source/twit/twit_controller.ts';
import dotenv from 'dotenv';
import { prisma } from './source/twit/twit_service.ts';


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
        console.error(err);

        res.status(500).send('Something went wrong');
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

main().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});