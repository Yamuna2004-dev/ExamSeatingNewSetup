const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Report = sequelize.define('Report', {
    stdname: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    stdreg: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true, // Primary Key  
        unique: true
    },
    subject: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    subcode: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    roomno: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seatno: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    depname: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    depid: {
        type: DataTypes.STRING(10),
        allowNull: false,
        // references: {
        //     model: 'departments', // Foreign Key
        //     key: 'dep_id'
        // }
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
}, 
{
//     tableName: 'seating_report',
//     timestamps: false, // No createdAt and updatedAt fields
    indexes: [
        {
            unique: false,
            fields: ['depid'] // Index for department ID
        },
        {
            unique: false,
            fields: ['roomno'] // Index for room number for faster lookup
        },
        {
            unique: false,
            fields: ['year'] // Index for filtering by academic year
        }
    ]
});

module.exports = Report;
