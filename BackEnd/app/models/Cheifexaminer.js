const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Cheifexaminer = sequelize.define('Cheifexaminer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
  },
{
    indexes: [
        // Create a unique index on email
        {
            unique: true,
            fields: ['id']
        }],
});
    

module.exports = Cheifexaminer;