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
      amount: {
        type: Sequelize.DECIMAL(12, 8),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(35),
        allowNull: false,
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