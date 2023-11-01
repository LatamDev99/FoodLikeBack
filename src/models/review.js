const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Review', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    comentario: {
        type: DataTypes.STRING,
        allowNull: true
    },
    calificacion: {
        type: DataTypes.STRING,
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
