import express, { Application } from 'express';
import { router } from './router';
const cors = require('cors');


//frontend development domain, for cors block error
const whitelistsDomains = [`http://localhost:3000`]

const corsOpts = {
    origin: function(origin: any, callback: any) {
        if (!origin || whitelistsDomains.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('not allowed by cors'))
        }
    },
    creditials: true,

}

require('dotenv').config()

const app: Application = express();
app.use(express.json())
app.use(cors(corsOpts));
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Application started and listening at port ${port}`));

export { app }