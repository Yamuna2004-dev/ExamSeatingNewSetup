// models/Room.js
module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('Room', {
      roomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      floorNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      seats: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    return Room;
  };
  