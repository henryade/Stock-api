'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserStock = sequelize.define(
    'UserStock',
    {
      trading_code_ref: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      number_of_units: DataTypes.FLOAT
    },
    {}
  );
  UserStock.associate = function(models) {
    UserStock.belongsTo(models.Stock, {
      foreignKey: 'trading_code_ref',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    UserStock.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return UserStock;
};
