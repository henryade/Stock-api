import express from 'express';
import { UserStocks, Stocks } from '../controller/Stocks';

const router = express.Router();

router.get('/stocks', Stocks);
router.get('/user/:user_id/stocks/:stock_ref', UserStocks);

export default router;
