import express, { Application } from 'express';
import { router } from './router';

require('dotenv').config()

const app: Application = express();
app.use(express.json())
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Application started and listening at port ${port}`));

export { app }