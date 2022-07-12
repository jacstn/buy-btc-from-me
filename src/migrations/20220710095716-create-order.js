'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      btcAmount: {
        type: Sequelize.DECIMAL(12,8),
        allowNull: false,
      },
      usdAmount: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      blockchainTransactionId: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(10),
        default: 'INIT',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order');
  }
};