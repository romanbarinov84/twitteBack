import express from 'express';
import { twitRouter } from './source/twit/twit_controller.js';
import dotenv from 'dotenv';


dotenv.config();
const app = express();


async function main(){
    app.use(express.json())
   
    app.use('/api/twit', twitRouter)

   app.use((req, res) => {
    res.status(404).json({
        message: 'not found'
    });
});

    app.listen(process.env.PORT || 3000 , () => {
        console.log("Server is running on the port 3000");
        
    })
}

main();



