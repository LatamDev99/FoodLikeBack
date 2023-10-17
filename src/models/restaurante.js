const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Restaurante', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: true
      },
    correo: {
       type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    representante: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING,
       allowNull: true
    },
    horario: {
        type: DataTypes.STRING,
        allowNull: true
    },
    logo: {
         type: DataTypes.STRING,
        allowNull: true
    },
    fachada: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cuentaBancaria: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    alcance: {
        type: DataTypes.STRING,
        allowNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
  }, {
    timestamps: false
  });
};
