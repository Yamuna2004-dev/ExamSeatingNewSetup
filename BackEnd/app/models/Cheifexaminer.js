const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ChiefExaminer = sequelize.define('chiefexaminers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
});

module.exports = ChiefExaminer;
