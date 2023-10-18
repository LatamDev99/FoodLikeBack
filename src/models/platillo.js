const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Platillo", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          nombre: {
              type: DataTypes.STRING,
              allowNull: false
            },
          descripcion: {
             type: DataTypes.STRING,
              allowNull: false
          },
          precio: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          foto: {
              type: DataTypes.STRING,
              allowNull: true
          },
          promo: {
              type: DataTypes.INTEGER,
              allowNull: true
          },
          stock: {
              type: DataTypes.INTEGER,
             allowNull: true
          },
          activo: {
              type: DataTypes.BOOLEAN,
              allowNull: false
          }
        
    },{
        timestamps: false
    })
};