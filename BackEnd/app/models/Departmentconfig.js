const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Departmentconfig = sequelize.define('departmentconfig', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		depname: DataTypes.STRING,
		depid: {
			type: DataTypes.STRING,
			allowNull: false
		}
  	},
	{
		indexes: [
			// Create a unique index on dep
			{
				unique: true,
				fields: ['depid']
			}],
	});

module.exports = Departmentconfig;