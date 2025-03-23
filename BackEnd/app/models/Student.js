const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Student = sequelize.define('student', {
    stdreg: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    stdname: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    depname: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    depid: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        // references: {
        //     model: 'departments', // Reference to the Department table
        //     key: 'dep_id'
        // }
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['stdreg'] // Ensures student registration number is unique
        }
    ]
});

module.exports = Student;
