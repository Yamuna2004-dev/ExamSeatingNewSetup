const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ExamSchedule = sequelize.define('ExamSchedule', {
    dep_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        references: {
            model: 'departments', // Foreign Key: References Department Table
            key: 'dep_id'
        }
    },
    sub_name: {
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
    sub_code: {
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
            unique: false,
            fields: ['dep_id'] // Index for faster queries on department ID
        },
        {
            unique: false,
            fields: ['semester'] // Index to optimize semester-based queries
        },
        {
            unique: false,
            fields: ['year'] // Index for filtering by academic year
        }
    ]
});

module.exports = ExamSchedule;
