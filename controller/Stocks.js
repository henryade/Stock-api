import models from '../database/models';
import { Op } from 'sequelize';

const { Stock, UserStock, Sequelize } = models;

const Stocks = async (req, res, next) => {
  try {
    const allStock = await Stock.findAndCountAll({ where: { volume: { [Op.gt]: 0 } } });
    return res.status(200).json({ data: allStock });
  } catch (error) {
    return res.status(400).json({ error: 'Error Occured' });
  }
};

const UserStocks = async (req, res, next) => {
  try {
    const { user_id, stock_ref } = req.params;
    const allUserStock = await UserStock.findOne({
      where: { user_id, trading_code_ref: stock_ref },
      include: [Stock]
    });
    return res.status(200).json({ data: allUserStock });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Error Occured' });
  }
};

export { UserStocks, Stocks };
