import { Router, Request, Response } from 'express';
import { NextFunction } from 'connect';
import * as jwt from 'jsonwebtoken';
import * as c from '../../../../config/config';
const { Pool, Client } = require('pg')

const pool = new Pool({
    user: process.env.POSTGRESS_USERNAME,
    host: process.env.POSTGRESS_HOST,
    database: process.env.POSTGRESS_DB,
    password: process.env.POSTGRESS_PASSWORD,
    port: 5432,
})

const router: Router = Router();

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

// Get all passwords
router.get('/getAll',
    requireAuth,
    async (req: Request, res: Response) => {
    const token = req.headers.authorization.split(' ')[1];
    const email = await jwt.verify(token, c.config.jwt.secret , (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Missing an email' });
        }
        return decoded
    });
    const request = {
        text: 'SELECT get_regular_password($1, $2);',
        values: [email,c.config.password.key]
    }
    await pool.query(request).then((body: any)  => {
        let passwords: any[] = [];
        body.rows.forEach((row: any) => {
            passwords.push(row.get_regular_password);
        })

        return res.status(200).send({ passwords });
    }).catch((err: any) => {
        //res.send(err.detail);
        return res.status(401).send({ auth: false, message: err.detail });

    })

});

router.post('/store',
    requireAuth,
    async (req: Request, res: Response) => {
    const website = req.body.website;
    const token = req.headers.authorization.split(' ')[1];
    const email = await jwt.verify(token, c.config.jwt.secret , (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Missing an email' });
        }
        return decoded
    });
    const password = req.body.password;

    // check email password valid
    if (!password) {
        return res.status(400).send({stored: false, message: 'Password is required'});
    }
    // check email password valid
    if (!website) {
        return res.status(400).send({stored: false, message: 'Website is required'});
    }
    const request = {
        text: 'CALL store_regular_password($1, $2, $3, $4);',
        values: [email,website,password,c.config.password.key]
    }
    await pool.query(request).then((body: any)  => {
        return res.status(200).send({ message: 'Password added.' });
    }).catch((err: any) => {
        return res.status(401).send({ auth: false, message: err.detail });

    })
});

export const PasswordRouter: Router = router;