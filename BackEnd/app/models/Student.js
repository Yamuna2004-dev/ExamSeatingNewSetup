const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Student = sequelize.define('student', {
    std_reg: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    std_name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    dep_name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    dep_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        references: {
            model: 'departments', // Reference to the Department table
            key: 'dep_id'
        }
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['std_reg'] // Ensures student registration number is unique
        }
    ]
});

module.exports = Student;
