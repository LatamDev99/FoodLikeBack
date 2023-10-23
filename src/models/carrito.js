const { DataTypes, ARRAY } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Carrito', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
  
    },
    platillos: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    timestamps: false
  });
};