import { Router, Request, Response } from 'express';
const { Pool, Client } = require('pg')
import * as c from '../../../../config/config';
import * as jwt from 'jsonwebtoken';
import { NextFunction } from 'connect';
import * as EmailValidator from 'email-validator';

const pool = new Pool({
    user: process.env.POSTGRESS_USERNAME,
    host: process.env.POSTGRESS_HOST,
    database: process.env.POSTGRESS_DB,
    password: process.env.POSTGRESS_PASSWORD,
    port: 5432,
})


const router: Router = Router();

function generateJWT(email: string): string {
    console.log("generateJWT")
    return jwt.sign(email, c.config.jwt.secret)
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.headers || !req.headers.authorization){
        return res.status(401).send({ message: 'No authorization headers.' });
    }

    const token_bearer = req.headers.authorization.split(' ');
    if(token_bearer.length != 2){
        return res.status(401).send({ message: 'Malformed token.' });
    }

    const token = token_bearer[1];
    return jwt.verify(token, c.config.jwt.secret , (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
        }
        return next();
    });
}

router.get('/verification',
    requireAuth,
    async (req: Request, res: Response) => {
        return res.status(200).send({ auth: true, message: 'Authenticated.' });
    });

router.post('/login', async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    // check email is valid
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
    }

    // check email password valid
    if (!password) {
        return res.status(400).send({ auth: false, message: 'Password is required' });
    }

    const request = {
        text: 'SELECT  authenticate_email($1, $2);',
        values: [email,password]
    }
    await pool.query(request).then((body: any)  => {
        const authEmail = body.rows[0].authenticate_email
        if(authEmail == null){
            return res.status(401).send({ auth: false, message: 'Unauthorized' });
        }
        // Generate JWT
        const jwt = generateJWT(email);

        res.status(200).send({ auth: true, token: jwt, user: email});
    }).catch((err: any) => {
        return res.status(401).send({ auth: false, message: err.detail });
    })
});

//register a new user
router.post('/', async (req: Request, res: Response) => {
    const email = req.body.email;
    const plainTextPassword = req.body.password;
    // check email is valid
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
    }

    // check email password valid
    if (!plainTextPassword) {
        return res.status(400).send({ auth: false, message: 'Password is required' });
    }

    const request = {
        text: 'CALL store_master_password($1, $2);',
        values: [email,plainTextPassword]
    }

    await pool.query(request).then((body: any)  => {
        const jwt = generateJWT(email);
        return res.status(200).send({ auth: true, token: jwt, user: email});
    }).catch((err: any) => {
        return res.status(401).send({ auth: false, message: err.detail });
    })
});

router.get('/', async (req: Request, res: Response) => {
    res.send('auth')
});

export const AuthRouter: Router = router;