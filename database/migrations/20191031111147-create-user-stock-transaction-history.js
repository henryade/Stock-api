'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserStockTransactionHistories', {
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
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      unit_price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      number_of_stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      transaction_type: {
        type: Sequelize.ENUM('BUY', 'SELL'),
        allowNull: false
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
    return queryInterface.dropTable('UserStockTransactionHistories');
  }
};
