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
        primaryKey: true,
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
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: 'departmentconfigs', // Table name in DB (Sequelize pluralizes by default)
        //     key: 'id'                  // Must match Departmentconfig primary key
        // }
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    indexes: [
        {
            unique: false,
            fields: ['depid']
        },
        {
            unique: false,
            fields: ['roomno']
        },
        {
            unique: false,
            fields: ['year']
        }
    ]
});
