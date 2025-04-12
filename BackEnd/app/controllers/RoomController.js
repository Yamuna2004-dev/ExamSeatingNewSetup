const Room = require('../models').Room;

exports.getAllRooms = async (req, res) => {
  const rooms = await Room.findAll();
  res.json(rooms);
};

exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: 'Could not create room' });
  }
};

exports.deleteRoom = async (req, res) => {
  const { roomNumber } = req.params;
  try {
    await Room.destroy({ where: { roomNumber } });
    res.json({ message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete' });
  }
};
