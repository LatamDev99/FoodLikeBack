const { DataTypes, ARRAY } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('CategoriaRestaurante', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true
    },
    label: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    timestamps: false
  });
};