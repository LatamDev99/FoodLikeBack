const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('TokenContrasena', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vence: {
        type: DataTypes.DATE,
        allowNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true
    },
  }, {
    timestamps: false
  });
};
