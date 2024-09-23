import dotenv from 'dotenv/config';
import cors from 'cors';
import express from 'express';

import routes from './routes/index.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads/attendances', express.static('public/images/uploads/attendances'))

app.use((err, req, res, next) => {
    console.log(err)

    return res.json({
        message: 'Something went wrong',
        errorMessage: err.message
    });
})

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`)
});