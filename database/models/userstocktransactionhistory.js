'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserStockTransactionHistory = sequelize.define('UserStockTransactionHistory', {
    trading_code: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    unit_price: DataTypes.FLOAT,
    number_of_stock: DataTypes.INTEGER,
    transaction_type: DataTypes.ENUM("BUY", "SELL")
  }, {});
  UserStockTransactionHistory.associate = function(models) {
    UserStockTransactionHistory.belongsTo(models.Stock, {
      foreignKey: 'trading_code_ref',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    UserStockTransactionHistory.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return UserStockTransactionHistory;
};