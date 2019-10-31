import models from '../database/models';
import { Op } from 'sequelize';

const { Stock, UserStock, User, UserStockTransactionHistory } = models;

const Stocks = async (req, res, next) => {
  try {
    const allStock = await Stock.findAndCountAll({ where: { volume: { [Op.gt]: 0 } } });
    return res.status(200).json({ data: allStock });
  } catch (error) {
    return res.status(400).json({ error: 'Error Occured' });
  }
};

const GetUserStock = async (req, res, next) => {
  try {
    const { user_id, stock_ref } = req.params;
    const allUserStock = await UserStock.findOne({
      where: { user_id, trading_code_ref: stock_ref },
      include: [Stock]
    });
    return res.status(200).json({ data: allUserStock });
  } catch (error) {
    return res.status(400).json({ error: 'Error Occured' });
  }
};

const BuyNewStock = async (req, res, next) => {
  try {
    const { user_id, stock_ref } = req.params;
    const { volume } = req.body;

    if (!volume) return res.status(400).json({ error: 'Please enter a valid volume' });
    const current_user = await User.findOne({ where: { id: user_id } });
    if (!current_user) return res.status(400).json({ error: 'User not found' });
    if (!current_user.payment_status) {
      return res.status(402).json({ error: 'Insuffient balance. Choose new payment method.' });
    }
    const stock = await Stock.findOne({ where: { trading_code: stock_ref } });
    if (!stock) return res.status(400).json({ error: 'Stock not found' });
    if (stock.volume <= 0) {
      return res.status(400).json({ error: 'No more stocks' });
    }
    if (volume > stock.volume)
      return res.status(400).json({ error: 'volume exceeds total stock volume' });
    const new_volume = Number(stock.volume) - Number(volume);
    await Stock.update({ volume: new_volume }, { where: { trading_code: stock_ref } });

    await UserStockTransactionHistory.create({
      user_id,
      trading_code_ref: stock_ref,
      number_of_stock: volume,
      date: new Date(),
      transaction_type: 'BUY',
      unit_price: stock.unit_price
    });
    const ExistingUserStock = await UserStock.findOne({
      where: { user_id, trading_code_ref: stock_ref }
    });
    if (ExistingUserStock) {
      const new_units = Number(ExistingUserStock.number_of_units) + Number(volume);
      await UserStock.update(
        { number_of_units: new_units },
        {
          where: { user_id, trading_code_ref: stock_ref }
        }
      );
    } else {
      await UserStock.create({
        user_id,
        trading_code_ref: stock_ref,
        number_of_units: volume
      });
    }
    const NewUserStock = await UserStock.findOne({
      where: { user_id, trading_code_ref: stock_ref },
      include: [Stock]
    });
    return res.status(200).json({ data: NewUserStock });
  } catch (error) {
    return res.status(400).json({ error: 'Error Occured' });
  }
};

export { GetUserStock, BuyNewStock, Stocks };
