const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Examschedule = sequelize.define('examschedule', {
    
    depid: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    subname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true, // Primary Key
        unique: true
    },
    semester: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    session: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    subcode: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true 
    }
}, {
    // tableName: 'exam_schedule', 
    // // Custom table name
    // timestamps: false, 
    // // Disable createdAt and updatedAt
    indexes: [
        {
            unique: true,
            fields: ['depid','semester','year'] // Index for faster queries on dep_ID
        }
    ]
});

module.exports = Examschedule;
