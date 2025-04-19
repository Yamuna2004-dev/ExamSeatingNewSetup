const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const report = sequelize.define('report',{
    bench_capacity: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    Interval: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    order_wise: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    random_wise: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    no_bench: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    no_halls: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    depname: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
   
   exam_name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    publish: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, );
