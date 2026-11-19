import { Router } from 'express';
import { TwistService } from './twit_service.js';
import { auth } from '../../auth.js';
import { createDTO } from './twit_dto.js';

const router = Router();
const twistService = new TwistService();

router.post('/', auth, (req, res) => {
    const validation = createDTO.safeParse(req.body);
      console.log(validation);

    if (!validation.success) {
        return res.status(400).json({
            message: validation.error.issues[0].message,
        });
    }
    const twit = twistService.createTwit(req.body);
    res.status(201).json(twit);
});

export const twitRouter = router;
