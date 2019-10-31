import express from 'express';
import { GetUserStock, BuyNewStock, Stocks } from '../controller/Stocks';

const router = express.Router();

router.get('/stocks', Stocks);
router.post('/user/:user_id/stocks/:stock_ref', BuyNewStock);
router.get('/user/:user_id/stocks/:stock_ref', GetUserStock);

export default router;
