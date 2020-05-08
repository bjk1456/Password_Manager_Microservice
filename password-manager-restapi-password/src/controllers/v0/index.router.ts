import { Router, Request, Response } from 'express';
import {PasswordRouter} from "./passwords/routes/password.router";

const router: Router = Router();

router.use('/password', PasswordRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send(`V0`);
});

export const IndexRouter: Router = router;