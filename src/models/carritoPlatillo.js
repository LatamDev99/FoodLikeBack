const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('PlatilloCarrito', {
    id_platillo: {
        type: DataTypes.UUID
    },id_carrito: {
        type: DataTypes.UUID
    }, cantidad: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
  }, {
    timestamps: false
  });
};