/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler.js';
import notFound from './app/middlewares/notFound.js';
import router from './app/routes/index.js';

const app = express();

//parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin:'http://localhost:5173', credentials: true }));

// application routes
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.send('Hi Next Level Developer !');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
