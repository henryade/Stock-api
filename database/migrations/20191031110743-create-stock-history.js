'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StockHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trading_code_ref: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Stocks',
          key: 'trading_code'
        }
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      unit_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('StockHistories');
  }
};