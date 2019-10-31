import express from 'express';
import Stocks from '../controller/Stocks';

const router = express.Router();

router.get('/stocks', Stocks);

export default router;