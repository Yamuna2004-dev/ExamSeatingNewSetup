const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Departmentconfig = sequelize.define('departmentconfig', {
		dep_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		
		dep_name: {
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