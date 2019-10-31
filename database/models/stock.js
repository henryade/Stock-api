'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define(
    'Stock',
    {
      trading_code: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      company_name: DataTypes.STRING,
      unit_price: DataTypes.FLOAT,
      volume: DataTypes.INTEGER
    },
    {}
  );
  Stock.associate = function(models) {
    Stock.hasMany(models.UserStockTransactionHistory, {
      foreignKey: 'trading_code_ref',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Stock.hasMany(models.UserStock, {
      foreignKey: 'trading_code_ref',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Stock.hasMany(models.StockHistory, {
      foreignKey: 'trading_code_ref',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Stock;
};
