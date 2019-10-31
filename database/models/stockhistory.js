'use strict';
module.exports = (sequelize, DataTypes) => {
  const StockHistory = sequelize.define('StockHistory', {
    trading_code_ref: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    unit_price: DataTypes.FLOAT
  }, {});
  StockHistory.associate = function(models) {
    StockHistory.belongsTo(models.Stock, {
      foreignKey: 'trading_code_ref',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return StockHistory;
};