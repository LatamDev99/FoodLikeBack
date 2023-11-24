const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Like', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true
    },
    idCliente: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    idRestaurante: {
        type: DataTypes.STRING,
        allowNull: true,
    }
  }, {
    timestamps: false
  });
};
