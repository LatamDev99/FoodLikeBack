const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

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
    contrasena: {
        type: DataTypes.STRING,
        allowNull: true
    },
    representante: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: true
    },
    alcance: {
        type: DataTypes.STRING,
        allowNull: true
    },
    latitud: {
      type: DataTypes.STRING,
      allowNull: true
    },
    longitud: {
      type: DataTypes.STRING,
      allowNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true
    }
  }, {
    timestamps: false
  });
};
