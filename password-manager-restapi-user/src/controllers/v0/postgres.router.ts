import { Router, Request, Response } from 'express';
import { UserRouter } from './users/routes/user.router';
const { Pool, Client } = require('pg')

const pool = new Pool({
    user: process.env.POSTGRESS_USERNAME,
    host: process.env.POSTGRESS_HOST,
    database: process.env.POSTGRESS_DB,
    password: process.env.POSTGRESS_PASSWORD,
    port: 5432,
})

const router: Router = Router();

router.use('/users', UserRouter);

router.get('/', async (req: Request, res: Response) => {
    const request = {
        text: 'CALL store_master_password($1, $2);',
        values: ['Jeb@Microsoft.com','JebBush']
    }
    await pool.query(request).then((body: any)  => {
        res.send(`Successfully added master password`);
    }).catch((err: any) => {
        res.send(err.detail);
        console.log(`the error is ${err.detail}`);
    })
    console.log("Sup dude?")

});

export const PostgresRouter: Router = router;