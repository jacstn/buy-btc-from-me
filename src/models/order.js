module.exports = function(sequelize, DataTypes) {
    const model = sequelize.define('Order', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      btcAmount: {
        type: DataTypes.DECIMAL(12,8),
        allowNull: false,
      },
      usdAmount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING(10),
        default: 'INIT',
      },
    }, {
      tableName: 'order',
    });
    return model;
  };
  