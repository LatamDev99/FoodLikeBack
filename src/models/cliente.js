const {
    Sequelize,
    DataTypes
} = require('sequelize');
const {
    v4: uuidv4
} = require('uuid');

module.exports = (sequelize) => {
    sequelize.define('Cliente', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cuenta: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: true
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        emailToken: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false
    });
}