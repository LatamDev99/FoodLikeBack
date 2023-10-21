const {
    Sequelize,
    DataTypes
} = require('sequelize');
const {
    v4: uuidv4
} = require('uuid');

module.exports = (sequelize) => {
    sequelize.define('Marca', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
        nombre: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: true
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dueño: {
            type: DataTypes.STRING,
            allowNull: true
        },
        logo: {
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
}