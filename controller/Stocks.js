import models from '../database/models';
import { Op } from 'sequelize';

const { Stock, Sequelize } = models;

const Stocks = async (req, res, next) => {
  try {
    const allStock = await Stock.findAndCountAll({ where: { volume: { [Op.gt]: 0 } } });
    return res.status(200).json({ data: allStock });
  } catch (error) {
    return res.status(400).json({ error: 'Error Occured' });
  }
};

export default Stocks;
