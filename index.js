import express from 'express';
import { json, urlencoded } from 'body-parser';
import { config } from 'dotenv';
import routes from './routes';

config();

const { PORT } = process.env || 6000;

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/', routes);

app.get('/', (req, res) => {
  res.status(200).json('Welcome To InvestCo');
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
